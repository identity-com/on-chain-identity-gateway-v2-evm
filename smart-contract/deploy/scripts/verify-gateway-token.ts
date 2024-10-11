import { sleep, getDeploymentSigner } from "../defender-utils";
import { ethers } from "hardhat";
import { Signer } from '@ethersproject/abstract-signer/src.ts'
import { COMPLERE_TESTNET_CONTRACT_ADDRESSES, testNetworkName} from "../utils";
import { GatewayNetwork, GatewayToken  } from "../../typechain-types";

async function main() {    
    let signer: Signer;
    signer = await getDeploymentSigner();

    const issueTo = await signer.getAddress();

    const gatewayNetworkContractAddress = COMPLERE_TESTNET_CONTRACT_ADDRESSES.gatewayNetwork;
    const gatewayTokenContractAddress = COMPLERE_TESTNET_CONTRACT_ADDRESSES.gatewayToken;


    const NetworkContractFactory = await ethers.getContractFactory("GatewayNetwork", signer!);
    const networkContract = NetworkContractFactory.attach(gatewayNetworkContractAddress) as GatewayNetwork;

    const networkId = await networkContract.getNetworkId(testNetworkName);

    console.log(`Network id: ${networkId}`);
    console.log(`Network name in bytes: ${testNetworkName}`);
    console.log(`Network name plain "Identity-KYC-Verification"`);

    
    const GatewayTokenContractFactory = await ethers.getContractFactory("GatewayToken", signer!);
    const gatewayTokenContract = GatewayTokenContractFactory.attach(gatewayTokenContractAddress) as GatewayToken;

    const result = await gatewayTokenContract.connect(signer!)["verifyToken(address,uint256)"](await signer.getAddress(), networkId)
  
    console.log(result)
    await sleep(2000);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

