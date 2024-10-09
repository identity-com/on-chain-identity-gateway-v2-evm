import { sleep, getDeploymentSigner } from "../defender-utils";
import hre , { ethers, upgrades } from "hardhat";
import { Signer } from '@ethersproject/abstract-signer/src.ts'
import { COMPLERE_TESTNET_CONTRACT_ADDRESSES, ZERO_ADDRESS, gatekeeperOneTestnetWallet, gatekeeperTwoTestnetWallet, testNetworkName, testNetworkNameWithErc20Fees, testNetworkNameWithNativeFees, trustSwiftlyTestnetGatekeeperWallet } from "../utils";
import { GatewayNetwork, GatewayToken, IGatewayNetwork } from "../../typechain-types";

async function main() {    
    let signer: Signer;
    signer = await getDeploymentSigner();

    const gatewayNetworkContractAddress = COMPLERE_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork;

    const NetworkContractFactory = await ethers.getContractFactory("GatewayNetwork", signer!);
    const networkContract = NetworkContractFactory.attach(gatewayNetworkContractAddress) as GatewayNetwork;

    
    await networkContract.connect(signer!).addGatekeeper(await signer.getAddress(), testNetworkName);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

