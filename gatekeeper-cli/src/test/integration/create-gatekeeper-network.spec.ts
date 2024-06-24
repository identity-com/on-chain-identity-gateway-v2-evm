import { BaseProvider } from "@ethersproject/providers";
import * as dotenv from "dotenv";
import { ethers, Wallet } from "ethers";
import {runCommand} from '@oclif/test'
import { BNB_TESTNET_CONTRACT_ADDRESSES, createRandomString, FOUNDRY_DEFAULT_WALLET_ONE, GatewayNetworkClient } from "../../utils";
import assert = require('assert');
import { GatewayNetworkClass } from "@identity.com/gateway-evm-ts-client/dist/service/GatewayNetwork";

dotenv.config();

describe("Gateway Gatekeeper TS class", function () {
    let provider: BaseProvider;
    let testWallet: Wallet;
    let networkClient: GatewayNetworkClass;

    before("Initialize gateway gatekeeper ts class", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Test run against local node forked

        testWallet = FOUNDRY_DEFAULT_WALLET_ONE.connect(provider);
        networkClient = GatewayNetworkClient(testWallet, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork)
    });

    it("should create new gateway network", async function () {
        const networkName = createRandomString(8)
        const result = await runCommand([
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

        console.log(`output: ${result.stdout}`)

        const wasTxConfirmed = result.stdout.includes("Created Gatekeeper Network. TxHash:")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")

        const answer = await networkClient.getNetworkId(networkName);

        assert.notEqual(answer, 0, "networkId should be non zero")
    })
})