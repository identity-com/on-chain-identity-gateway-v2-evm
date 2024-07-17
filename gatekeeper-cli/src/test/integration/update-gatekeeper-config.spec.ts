import { BaseProvider } from "@ethersproject/providers";
import * as dotenv from "dotenv";
import { ethers, utils, Wallet } from "ethers";
import {runCommand} from '@oclif/test'
import { BNB_TESTNET_CONTRACT_ADDRESSES, createRandomString, FOUNDRY_DEFAULT_WALLET_ONE, FOUNDRY_DEFAULT_WALLET_TWO, GATEKEEPER_ON_TESTNET, GatewayNetworkClient, RANDOM_NETWORK_NAME, RANDOM_WALLET, testNetworkName } from "../../utils";
import assert = require('assert');
import { GatewayNetworkClass } from "@identity.com/gateway-evm-ts-client/dist/service/GatewayNetwork";
import { GatewayGatekeeper } from "@identity.com/gateway-evm-ts-client/dist/service/GatewayGatekeeper";
import "./add-gatekeeper.spec";
import { DidRegistry } from "@identity.com/did-bnb-client";

dotenv.config();

describe("Command: Upload gatekeeper service url config", function () {
    let provider: BaseProvider;
    let gatekeeper: Wallet;
    let networkClient: GatewayNetworkClass;
    let gatekeeperClient: GatewayGatekeeper;
    let networkName: string;
    let didRegistry: DidRegistry;

    before("Initialize wallet", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Test run against local node forked

        gatekeeper = FOUNDRY_DEFAULT_WALLET_ONE.connect(provider);
        networkName = testNetworkName;
        networkClient = GatewayNetworkClient(gatekeeper, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork)
        gatekeeperClient = new GatewayGatekeeper(gatekeeper, BNB_TESTNET_CONTRACT_ADDRESSES.gatekeeper);
        didRegistry = new DidRegistry(gatekeeper, BNB_TESTNET_CONTRACT_ADDRESSES.didRegistry, { chainEnvironment: "testnet", gasLimit: 500000});
    });

    it("upload gatekeeper service url config", async function () {;

        let data = await gatekeeperClient.getGatekeeperNetworkData(utils.formatBytes32String(networkName), gatekeeper.address);

        console.log(`Gatekeeper on network ${networkName} : ${JSON.stringify(data)}`);

        const testUrl = `http://${createRandomString(8)}.com`;

        const result = await runCommand([
            "upload-gatekeeper-config", 
            BNB_TESTNET_CONTRACT_ADDRESSES.didRegistry,
            testUrl,
            `--privateKey=${gatekeeper.privateKey}`,
            `--chain=localhost`
        ])


        console.log(`output: ${JSON.stringify(result.stdout)}`)

        const wasTxConfirmed = result.stdout.includes("Added gateway-issuer service endpoint for gatekeeper. TxHash:")
        assert.equal(wasTxConfirmed, true, "Transaction should be confirmed on node")
        assert.equal(result.error, undefined, "No errors should occur when creating network")

        let did = await didRegistry.resolve();


        assert.equal(did.service?.length! > 0,  true, "gatekeeper should have more than 1 service")
    })
})