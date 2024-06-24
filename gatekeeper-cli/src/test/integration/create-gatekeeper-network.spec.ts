import { BaseProvider } from "@ethersproject/providers";
import * as dotenv from "dotenv";
import { ethers, Wallet } from "ethers";

dotenv.config();

describe("Gateway Gatekeeper TS class", function () {
    let provider: BaseProvider;
    let randomWallet: Wallet;

    before("Initialize gateway gatekeeper ts class", async function () {
        this.timeout(20000);
        provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Test run against local node forked
        randomWallet = Wallet.createRandom();
    });

    it("should create new gateway network", async function () {

    })
})