import { Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { AdminService, airdrop } from '@identity.com/gateway-solana-client';
import { SolanaAnchorGateway } from '@identity.com/gateway-solana-idl';
import * as anchor from '@project-serum/anchor';
import { expect } from 'chai';
import * as chai from 'chai';
import { describe } from 'mocha';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('Gateway v2 Client', () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace
    .SolanaAnchorGateway as anchor.Program<SolanaAnchorGateway>;
  const programProvider = program.provider as anchor.AnchorProvider;

  let service: AdminService;
  let authorityKeypair: Keypair;
  let networkAuthority: Keypair;

  let authority;

  before(async () => {
    authorityKeypair = Keypair.generate();
    networkAuthority = Keypair.generate();
    authority = new anchor.Wallet(authorityKeypair);

    await airdrop(
      programProvider.connection,
      authority.publicKey,
      LAMPORTS_PER_SOL * 2
    );

    service = await AdminService.buildFromAnchor(
      program,
      networkAuthority.publicKey,
      {
        clusterType: 'localnet',
        wallet: authority,
      },
      programProvider
    );

    await service.createNetwork().withPartialSigners(networkAuthority).rpc();
  });

  describe('Close Network', () => {
    it('Should close network properly', async function () {
      await service.closeNetwork().rpc();
      const networkAccount = await service.getNetworkAccount();
      expect(networkAccount).to.be.null;
    }).timeout(10000);

    it("Shouldn't allow a random authority to close the network", async function () {
      expect(
        service.closeNetwork(undefined, Keypair.generate().publicKey).rpc()
      ).to.be.eventually.rejectedWith(/Signature verification failed/);
    });
  });
});