import { HardhatRuntimeEnvironment } from 'hardhat/types';
import ERC1967Proxy from '@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json';
import { getInitializerData } from '@openzeppelin/hardhat-upgrades/dist/utils';

// A bug in hardhat leads to undefined entries in the accounts if any are duplicates.
// This function normalises this by creating defaults for each one
export const getAccounts = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts } = hre;
  const { deployer, authority, gatekeeper } = await getNamedAccounts();
  return {
    deployer,
    authority: authority || deployer,
    gatekeeper: gatekeeper || authority || deployer,
  };
};
export const deployProxyCreate2 = async (hre: HardhatRuntimeEnvironment, contractName: string, args: any[]) => {
  const { getNamedAccounts, deployments, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const proxyContractName = contractName + 'Proxy';

  const impl = await deploy(contractName, {
    from: deployer,
    args: [], // the implementation takes no arguments, as the constructor must be empty for upgradeable contracts
    log: true,
    deterministicDeployment: true,
  });

  const Contract = await ethers.getContractFactory(contractName);
  const data = getInitializerData(Contract.interface, args);
  const proxy = await deploy(proxyContractName, {
    from: deployer,
    args: [impl.address, data],
    log: true,
    deterministicDeployment: true,
    contract: ERC1967Proxy,
  });

  return ethers.getContractAt(contractName, proxy.address);
};