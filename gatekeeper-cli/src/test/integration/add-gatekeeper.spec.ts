import { BaseProvider } from "@ethersproject/providers";
import * as dotenv from "dotenv";
import { ethers, utils, Wallet } from "ethers";
import {runCommand} from '@oclif/test'
import { BNB_TESTNET_CONTRACT_ADDRESSES, createRandomString, FOUNDRY_DEFAULT_WALLET_ONE, GatewayNetworkClient } from "../../utils";
import assert = require('assert');
import { GatewayNetworkClass } from "@identity.com/gateway-evm-ts-client/dist/service/GatewayNetwork";

dotenv.config();

describe("Command: Create network", function () {
    let provider: BaseProvider;
    let testWallet: Wallet;
    let gatekeeper: Wallet;
    let networkClient: GatewayNetworkClass;

    before("Initialize wallet", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Test run against local node forked

        testWallet = FOUNDRY_DEFAULT_WALLET_ONE.connect(provider);
        gatekeeper = Wallet.createRandom();
        networkClient = GatewayNetworkClient(testWallet, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork)
    });

    it("add a new gatekeeper to a network", async function () {
        const networkName = createRandomString(8)
        await runCommand([
            "create-gatekeeper-network", 
            networkName,
            `${testWallet.address}`,
            "a-test-network",
            '0',
            `0`,
            `0x0000000000000000000000000000000000000000`,
            `--privateKey=${testWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--chain=localhost`
        ])

        const result = await runCommand([
            "add-gatekeeper",
            gatekeeper.address,
            networkName,
            `--privateKey=${testWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--chain=localhost`
        ])

        console.log(`output: ${result.stdout}`)

        const wasTxConfirmed = result.stdout.includes("Added gatekeeper to Gateway Token contract. TxHash:")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")

        const answer = await networkClient.isGatekeeper(utils.formatBytes32String(networkName), gatekeeper.address);

        assert.equal(answer, true, "networkId should be non zero")
    })
})