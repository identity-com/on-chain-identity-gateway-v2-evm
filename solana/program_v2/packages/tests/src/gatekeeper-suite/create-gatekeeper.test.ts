import {
  AdminService,
  CreateNetworkData,
  FeeStructure,
  GatekeeperKeyFlags,
  NetworkKeyFlags,
  NetworkService,
} from '@identity.com/gateway-solana-client';
import { SolanaAnchorGateway } from '@identity.com/gateway-solana-idl';
import * as anchor from '@coral-xyz/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { expect } from 'chai';
import { describe } from 'mocha';
import { generateFundedKey } from '../util/lib';
import { BN } from '@coral-xyz/anchor';

describe('Gateway v2 Client', () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace
    .SolanaAnchorGateway as anchor.Program<SolanaAnchorGateway>;
  const programProvider = program.provider as anchor.AnchorProvider;
  const fees: FeeStructure = {
    token: PublicKey.unique(),
    issue: 100,
    expire: 100,
    verify: 100,
    refresh: 100,
  };
  let adminService: AdminService;
  let networkService: NetworkService;
  let gatekeeperDataAccount: PublicKey;
  let stakingDataAccount: PublicKey;

  let adminAuthority: Keypair;
  let networkAuthority: Keypair;
  let gatekeeperAuthority: Keypair;

  beforeEach(async () => {
    adminAuthority = await generateFundedKey();
    networkAuthority = await generateFundedKey();
    gatekeeperAuthority = await generateFundedKey();

    [gatekeeperDataAccount] = await NetworkService.createGatekeeperAddress(
      gatekeeperAuthority.publicKey,
      networkAuthority.publicKey
    );
    [stakingDataAccount] = await NetworkService.createStakingAddress(
      networkAuthority.publicKey
    );

    adminService = await AdminService.buildFromAnchor(
      program,
      networkAuthority.publicKey,
      {
        clusterType: 'localnet',
        wallet: new anchor.Wallet(adminAuthority),
      },
      programProvider
    );

    networkService = await NetworkService.buildFromAnchor(
      program,
      gatekeeperAuthority.publicKey,
      gatekeeperDataAccount,
      {
        clusterType: 'localnet',
        wallet: new anchor.Wallet(gatekeeperAuthority),
      },
      programProvider
    );
    const networkData: CreateNetworkData = {
      authThreshold: 1,
      passExpireTime: 16,
      fees: [fees],
      authKeys: [
        { flags: NetworkKeyFlags.AUTH, key: networkAuthority.publicKey },
      ],
      supportedTokens: [],
      networkFeatures: 0,
    };
    await adminService
      .createNetwork(networkData)
      .withPartialSigners(networkAuthority)
      .rpc();
  });

  describe('Create Gatekeeper', () => {
    it('Creates a gatekeeper w/ default data on an established network', async function () {
      // creates a gatekeeper with the admin's authority
      await networkService
        .createGatekeeper(
          networkAuthority.publicKey,
          stakingDataAccount,
          adminAuthority.publicKey
        )
        .withPartialSigners(adminAuthority)
        .rpc();

      // retrieves the gatekeeper
      const gatekeeperAccount = await networkService.getGatekeeperAccount();
      // tests to see if the requested gatekeeper's associated network equals the adminAuthority (or network) public key
      expect(gatekeeperAccount?.gatekeeperNetwork.toBase58()).to.equal(
        networkAuthority.publicKey.toBase58()
      );

      const network = await adminService.getNetworkAccount();
      expect(network?.gatekeepers.length).to.equal(1);
    }).timeout(10000);

    it('Cannot create a gatekeeper with no auth keys', async function () {
      return expect(
        networkService
          .createGatekeeper(
            networkAuthority.publicKey,
            stakingDataAccount,
            adminAuthority.publicKey,
            {
              tokenFees: [fees],
              authThreshold: 1,
              authKeys: [],
              supportedTokens: [],
            }
          )
          .withPartialSigners(adminAuthority)
          .rpc()
      ).to.eventually.be.rejectedWith(/InsufficientAuthKeys/);
    }).timeout(10000);

    it('Create a gatekeeper with applied token fees', async function () {
      const tokenKey = Keypair.generate();

      // Step 1: Create a gatekeeper
      await networkService
        .createGatekeeper(
          networkAuthority.publicKey,
          stakingDataAccount,
          adminAuthority.publicKey,
          {
            tokenFees: [
              {
                token: tokenKey.publicKey,
                // TODO: Fix the representation in: https://github.com/identity-com/on-chain-identity-gateway/blob/develop/solana/program_v2/packages/client/core/src/lib/types.ts#L18-L18
                // TODO: These parameters are u64 in Rust and cannot be represented as numbers: https://github.com/identity-com/on-chain-identity-gateway/blob/develop/solana/program_v2/programs/gateway_v2/src/state/gatekeeper.rs#L235-L235
                issue: new BN(0) as unknown as number,
                refresh: new BN(0) as unknown as number,
                expire: new BN(0) as unknown as number,
                verify: new BN(0) as unknown as number,
              },
            ],
            authThreshold: 1,
            authKeys: [
              {
                flags: GatekeeperKeyFlags.AUTH,
                key: gatekeeperAuthority.publicKey,
              },
            ],
            supportedTokens: [],
          }
        )
        .withPartialSigners(adminAuthority)
        .rpc();

      const gatekeeperAccount = await networkService.getGatekeeperAccount();

      // Validate that the applied token key matches that specified during the creation of the gatekeeper
      expect(
        gatekeeperAccount?.tokenFees.map((x) => x.token.toBase58())
      ).deep.equal([tokenKey.publicKey.toBase58()]);
    }).timeout(10000);
  });

  it('Cannot create a gatekeeper with insufficient auth keys', async function () {
    return expect(
      networkService
        .createGatekeeper(
          networkAuthority.publicKey,
          stakingDataAccount,
          adminAuthority.publicKey,
          {
            tokenFees: [
              {
                token: PublicKey.unique(),
                issue: 100,
                expire: 100,
                verify: 100,
                refresh: 100,
              },
            ],
            authThreshold: 2,
            authKeys: [
              {
                flags: GatekeeperKeyFlags.AUTH,
                key: gatekeeperAuthority.publicKey,
              },
            ],
            supportedTokens: [],
          }
        )
        .withPartialSigners(adminAuthority)
        .rpc()
    ).to.eventually.be.rejectedWith(/InsufficientAuthKeys/);
  }).timeout(10000);
});