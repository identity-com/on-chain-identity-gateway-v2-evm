import * as dotenv from "dotenv";
import * as assert from "assert";
import { GatewayNetworkClass } from "../../src/service/GatewayNetwork";
import { Wallet, ethers, utils } from "ethers";
import { BaseProvider } from "@ethersproject/providers";
import { BNB_TESTNET_CONTRACT_ADDRESSES, ZERO_ADDRESS, gatekeeperOneTestnetWallet, initTestNetwork, testNetworkName } from "../utils";
import { GatewayNetwork, GatewayNetwork__factory } from "../../src/contracts/typechain-types";


dotenv.config();

describe.only("Gateway Network TS class", function () {
    let gatewayNetworkClient: GatewayNetworkClass;
    let gatewayNetworkContract: GatewayNetwork;
    

    let provider: BaseProvider;
    let gatekeeper: Wallet;
    let randomWallet: Wallet;

    before("Initialize gateway gatekeeper ts class", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

        gatekeeper = gatekeeperOneTestnetWallet.connect(provider);
        randomWallet = Wallet.createRandom();
        
        gatewayNetworkClient = new GatewayNetworkClass(gatekeeper, BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork);
        gatewayNetworkContract = GatewayNetwork__factory.connect(BNB_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork, gatekeeper);

        await initTestNetwork(gatewayNetworkContract, gatekeeper);
    });

    describe("Public functions", async function () {
        it("isGatekeeper should return true for a valid gatekeeper", async function() {
            assert.equal(await gatewayNetworkClient.isGatekeeper(testNetworkName, gatekeeper.address), true);
        });

        it("getGatekeepersOnNetwork should return correct list of gatekeepers on default network", async function() {
            const result = await gatewayNetworkClient.getGatekeepersOnNetwork(testNetworkName);

            assert.equal(result.length, 1);
            assert.equal(result[0], gatekeeper.address);
        });

        it("getNetworkId should return correct id for valid network", async function() {
            assert.notEqual(await gatewayNetworkClient.getNetworkId(testNetworkName), 0);
        });

        it("doesNetworkExist should return true for valid network", async function() {
            const networkId = await gatewayNetworkClient.getNetworkId(testNetworkName);
            assert.equal(await gatewayNetworkClient.doesNetworkExist(networkId.toString()), true);
        });

        it("getSupportedFeeTokenAddress should zero_address as token of the default test network", async function() {
            assert.equal(await gatewayNetworkClient.getSupportedFeeTokenAddress(testNetworkName), ZERO_ADDRESS);
        });
    });

    describe("Network Primary Authority", async function () {
        it("should add gatekeeper to the default test network of the detault test network", async function () {

        });

        it("should remove gatekeeper from the default test network of the detault test network", async function () {

        });

        it("should successfully update the primary authority of the detault test network", async function () {

        });

        it("should successfully update the networks default pass expiration time of the detault test network", async function () {

        });

        it("should successfully update the networks fee % of the detault test network", async function () {

        });

        it("should successfully update the features of the detault test network", async function () {

        });
    });


    describe("Fees", async function () {

    });
});