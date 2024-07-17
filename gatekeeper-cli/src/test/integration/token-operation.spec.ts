import { BaseProvider } from "@ethersproject/providers";
import * as dotenv from "dotenv";
import { ethers, utils, Wallet } from "ethers";
import {runCommand} from '@oclif/test'
import { BNB_TESTNET_CONTRACT_ADDRESSES, createRandomString, gatekeeperIdentityNetwork, FOUNDRY_DEFAULT_WALLET_TWO, GatewayNetworkClient, RANDOM_NETWORK_NAME, RANDOM_WALLET } from "../../utils";
import assert = require('assert');
import { GatewayNetworkClass } from "@identity.com/gateway-evm-ts-client/dist/service/GatewayNetwork";
import { GatewayTs } from "@identity.com/gateway-evm-ts-client";

dotenv.config();

describe("Command: Token operations", function () {
    let provider: BaseProvider;
    let issuerWallet: Wallet;
    let tokenReceiver: Wallet;
    let networkClient: GatewayNetworkClass;
    let gatewayTokenClient: GatewayTs;
    let networkName: string;

    before("Initialize wallet", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Test run against local node forked

        issuerWallet = gatekeeperIdentityNetwork.connect(provider);
        tokenReceiver = FOUNDRY_DEFAULT_WALLET_TWO.connect(provider);
        networkClient = GatewayNetworkClient(issuerWallet, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork)
        gatewayTokenClient = new GatewayTs(issuerWallet, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken)
        networkName = createRandomString(4);

        await networkClient.createNetwork({
            primaryAuthority: issuerWallet.address,
            name: utils.formatBytes32String(networkName),
            passExpireDurationInSeconds: 100000,
            networkFeatureMask: 0,
            networkFee: {
                issueFee: 0,
                refreshFee: 0,
                expireFee: 0,
                freezeFee: 0
            },
            supportedToken: '0x0000000000000000000000000000000000000000',
            gatekeepers: [],
            lastFeeUpdateTimestamp: 0,
            description: utils.formatBytes32String("created with cli")
        });

        await networkClient.addGatekeeper(utils.formatBytes32String(networkName), issuerWallet.address);
    });

    it("issue token to user", async function () {

        const networkId = await networkClient.getNetworkId(networkName);
        await networkClient.getNetwork(networkId.toString());

        const result = await runCommand([
            "issue-token", 
            tokenReceiver.address,
            networkName,
            "0",
            tokenReceiver.address,
            "NONE",
            "0",
            `--privateKey=${issuerWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--gatewayTokenAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken}`,
            `--chain=localhost`
        ])


        const wasTxConfirmed = result.stdout.includes("Issued gateway token to use. TxHash:")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")

        const answer = await gatewayTokenClient.verify(tokenReceiver.address, networkId.valueOf() as bigint)
        assert.equal(answer, true, "tokenReceiver should have valid token")
    });

    it("fetch token id", async function () {
        const networkId = await networkClient.getNetworkId(networkName);
        await networkClient.getNetwork(networkId.toString());

        const result = await runCommand([
            "fetch-token-id", 
            tokenReceiver.address,
            networkName,
            "true",
            `--privateKey=${issuerWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--gatewayTokenAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken}`,
            `--chain=localhost`
        ])


        const wasTxConfirmed = result.stdout.includes("Fetched token")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")
    });

    it("verify token", async function () {
        const networkId = await networkClient.getNetworkId(networkName);
        await networkClient.getNetwork(networkId.toString());

        const result = await runCommand([
            "verify-address", 
            tokenReceiver.address,
            networkName,
            `--privateKey=${issuerWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--gatewayTokenAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken}`,
            `--chain=localhost`
        ])


        const wasTxConfirmed = result.stdout.includes("has a valid token")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")
    });

    it("freeze token", async function () {
        const networkId = await networkClient.getNetworkId(networkName);
        await networkClient.getNetwork(networkId.toString());

        const result = await runCommand([
            "freeze-token", 
            tokenReceiver.address,
            networkName,
            `--privateKey=${issuerWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--gatewayTokenAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken}`,
            `--chain=localhost`
        ])


        const wasTxConfirmed = result.stdout.includes("Froze gateway token. TxHash:")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")
    });

    it("unfreeze token", async function () {
        const networkId = await networkClient.getNetworkId(networkName);
        await networkClient.getNetwork(networkId.toString());

        const result = await runCommand([
            "unfreeze-token", 
            tokenReceiver.address,
            networkName,
            tokenReceiver.address,
            `--privateKey=${issuerWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--gatewayTokenAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken}`,
            `--chain=localhost`
        ])


        const wasTxConfirmed = result.stdout.includes("Unfroze gateway token. TxHash:")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")

        const answer = await gatewayTokenClient.verify(tokenReceiver.address, networkId.valueOf() as bigint)
        assert.equal(answer, true, "tokenReceiver should have valid token again")
    });

    it("refresh token", async function () {
        const networkId = await networkClient.getNetworkId(networkName);
        await networkClient.getNetwork(networkId.toString());

        const result = await runCommand([
            "refresh-token", 
            tokenReceiver.address,
            networkName,
            "100000000",
            tokenReceiver.address,
            "NONE",
            "0",
            `--privateKey=${issuerWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--gatewayTokenAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken}`,
            `--chain=localhost`
        ])

        const wasTxConfirmed = result.stdout.includes("Refreshed gateway token. TxHash:")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")
    });

    it("revoke token", async function () {
        const networkId = await networkClient.getNetworkId(networkName);
        await networkClient.getNetwork(networkId.toString());

        const result = await runCommand([
            "revoke-token", 
            tokenReceiver.address,
            networkName,
            `--privateKey=${issuerWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--gatewayTokenAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayToken}`,
            `--chain=localhost`
        ])


        const wasTxConfirmed = result.stdout.includes("Revoked gateway token. TxHash:")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")
    });
})