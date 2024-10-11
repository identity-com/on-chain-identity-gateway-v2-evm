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

    
    const GatewayTokenContractFactory = await ethers.getContractFactory("GatewayToken", signer!);
    const gatewayTokenContract = GatewayTokenContractFactory.attach(gatewayTokenContractAddress) as GatewayToken;

    await gatewayTokenContract.connect(signer!).mint(
        issueTo,
        networkId,
        0,
        0,
        {
            tokenSender: issueTo,
            recipient: await signer.getAddress()
        },
    )

  
       await sleep(2000);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

