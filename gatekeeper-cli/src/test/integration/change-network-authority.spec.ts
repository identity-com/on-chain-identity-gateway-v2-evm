import { BaseProvider } from "@ethersproject/providers";
import * as dotenv from "dotenv";
import { ethers, utils, Wallet } from "ethers";
import {runCommand} from '@oclif/test'
import { BNB_TESTNET_CONTRACT_ADDRESSES, createRandomString, FOUNDRY_DEFAULT_WALLET_ONE, FOUNDRY_DEFAULT_WALLET_TWO, GatewayNetworkClient } from "../../utils";
import assert = require('assert');
import { GatewayNetworkClass } from "@identity.com/gateway-evm-ts-client/dist/service/GatewayNetwork";

dotenv.config();

describe("Command: Transfer network authority", function () {
    let provider: BaseProvider;
    let testWallet: Wallet;
    let newPrimaryAuthority: Wallet;
    let networkClient: GatewayNetworkClass;

    before("Initialize wallet", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Test run against local node forked

        testWallet = FOUNDRY_DEFAULT_WALLET_ONE.connect(provider);
        newPrimaryAuthority = FOUNDRY_DEFAULT_WALLET_TWO.connect(provider);
        networkClient = GatewayNetworkClient(testWallet, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork)
    });

    it("transfer network authority", async function () {
        const networkName = createRandomString(4)
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
            "transfer-network-authority",
            newPrimaryAuthority.address,
            networkName,
            `--privateKey=${testWallet.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--chain=localhost`
        ])

        console.log(`output: ${result.stdout}`)

        assert.equal(result.error, undefined, "No errors should occur when creating network")

        const resultTwo = await runCommand([
            "claim-network-authority",
            networkName,
            `--privateKey=${newPrimaryAuthority.privateKey}`,
            `--gatewayNetworkAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork}`,
            `--chain=localhost`
        ])

        console.log(`output: ${result.stdout}`)

        assert.equal(resultTwo.error, undefined, "No errors should occur when creating network")

        const networkId = await networkClient.getNetworkId(networkName);
        const answer = await networkClient.getNetwork(networkId.toString());

        assert.equal(answer.primaryAuthority, newPrimaryAuthority.address, "networkId should be non zero")
    })
})