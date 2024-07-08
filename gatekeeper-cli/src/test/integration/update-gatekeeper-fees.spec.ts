import { BaseProvider } from "@ethersproject/providers";
import * as dotenv from "dotenv";
import { ethers, utils, Wallet } from "ethers";
import {runCommand} from '@oclif/test'
import { BNB_TESTNET_CONTRACT_ADDRESSES, createRandomString, FOUNDRY_DEFAULT_WALLET_ONE, FOUNDRY_DEFAULT_WALLET_TWO, GATEKEEPER_ON_TESTNET, GatewayNetworkClient, RANDOM_NETWORK_NAME, RANDOM_WALLET, testNetworkName } from "../../utils";
import assert = require('assert');
import { GatewayNetworkClass } from "@identity.com/gateway-evm-ts-client/dist/service/GatewayNetwork";
import { GatewayGatekeeper } from "@identity.com/gateway-evm-ts-client/dist/service/GatewayGatekeeper";
import "./add-gatekeeper.spec";

dotenv.config();

describe("Command: Update gatekeeper fee configuration", function () {
    let provider: BaseProvider;
    let gatekeeper: Wallet;
    let networkClient: GatewayNetworkClass;
    let gatekeeperClient: GatewayGatekeeper;
    let networkName: string;

    before("Initialize wallet", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Test run against local node forked

        gatekeeper = FOUNDRY_DEFAULT_WALLET_ONE.connect(provider);
        networkName = testNetworkName;
        networkClient = GatewayNetworkClient(gatekeeper, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork)
        gatekeeperClient = new GatewayGatekeeper(gatekeeper, BNB_TESTNET_CONTRACT_ADDRESSES.gatekeeper);
    });

    it("update gatekeeper fees for each operation on network", async function () {;

        let data = await gatekeeperClient.getGatekeeperNetworkData(utils.formatBytes32String(networkName), gatekeeper.address);

        console.log(`Gatekeeper on network ${networkName} : ${JSON.stringify(data)}`);

        const result = await runCommand([
            "update-gatekeeper-fees", 
            networkName,
            `2500`,
            "2500",
            '2500',
            `2500`,
            `--privateKey=${gatekeeper.privateKey}`,
            `--gatewayKeeperContractAddress=${BNB_TESTNET_CONTRACT_ADDRESSES.gatekeeper}`,
            `--chain=localhost`
        ])


        console.log(`output: ${result.stdout}`)

        const wasTxConfirmed = result.stdout.includes("Added gatekeeper to Gateway Token contract. TxHash:")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")

        data = await gatekeeperClient.getGatekeeperNetworkData(utils.formatBytes32String(networkName), gatekeeper.address);

        console.log(JSON.stringify(data));

        const answer = await networkClient.isGatekeeper(utils.formatBytes32String(networkName), gatekeeper.address);

        assert.equal(answer, true, "gatekeeper should be on network")
    })
})