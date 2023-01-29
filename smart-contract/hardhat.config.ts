import 'dotenv/config';
import * as dotenv from 'dotenv'
dotenv.config();

import {task} from "hardhat/config";
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat'
import 'hardhat-deploy';


import { checkGT } from "./tasks/checkGT";
import { addGatekeeper } from "./tasks/addGatekeeper";
import { issueGT} from "./tasks/issueGT";
import { fund } from "./tasks/fund";
import { printPrivateKey } from "./tasks/printPrivateKey";
import { createWallet } from "./tasks/createWallet";

const derivedAccounts = {
  mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
  path: process.env.MNEMONIC_PATH || "m/44'/60'/0'/0/",
  initialIndex: 0,
  count: 20,
}
const liveAccounts = (process.env.DEPLOYER_PRIVATE_KEY || process.env.PRIVATE_KEY) ?
    [`0x${process.env.DEPLOYER_PRIVATE_KEY || process.env.PRIVATE_KEY}`, `0x${process.env.AUTHORITY_PRIVATE_KEY || process.env.PRIVATE_KEY}`, `0x${process.env.GATEKEEPER_PRIVATE_KEY || process.env.PRIVATE_KEY}`]
    : derivedAccounts;

task('check-gt', 'check if a wallet has a gateway token for a particular gatekeeper network')
    .addParam('address', 'The wallet to check')
    .addParam('gatekeepernetwork', 'The gatekeeper network')
    .setAction(checkGT)
task('add-gatekeeper', 'add a gatekeeper to a network')
    .addParam('gatekeeper', 'The gatekeeper to add')
    .addParam('gatekeepernetwork', 'The gatekeeper network to add the gatekeeper to')
    .setAction(addGatekeeper)
task('issue-gt', 'issue a gateway token')
    .addParam('gatekeepernetwork', 'The gatekeeper network to issue the token against')
    .addParam('address', 'The wallet to issue the gateway token for')
    .addFlag('forwarded', 'Forwards the transaction using an ERC2771 forwarder')
    .setAction(issueGT)
task('fund', 'fund a wallet')
    .addParam('address', 'The wallet to fund')
    .addParam('amount', 'The amount in eth to send')
    .setAction(fund)
task('print-private-key', 'Print the private key of a wallet used by hardhat (WARNING - DO NOT USE THIS FOR PRODUCTION KEYS)')
    .addParam('index', 'the index of the wallet to get the private key for')
    .setAction(printPrivateKey)
task('create-wallet', 'Create a test wallet')
    .setAction(createWallet)

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      accounts: derivedAccounts,
    },
    localhost: {
      saveDeployments: true,
      accounts: derivedAccounts,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 1,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 11155111,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 5,
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 80001,
    },
    polygonMainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 137,
    },
    auroraTestnet: {
      url: `https://aurora-testnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 1313161555,
    },
    auroraMainnet: {
      url: `https://aurora-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 1313161554,
    },
    optimismGoerli: {
      url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 420,
    },
    optimismMainnet: {
      url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 10,
    },
    palmTestnet: {
      url: `https://palm-testnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 11297108099,
    },
    palmMainnet: {
      url: `https://palm-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 11297108109,
    },
    arbitrumGoerli: {
      url: `https://arbitrum-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 421613,
    },
    arbitrumMainnet: {
      url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 42161,
    },
    celoMainnet: {
      url: `https://celo-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 42220,
    },
    celoAlfajores: {
      url: `https://celo-alfajores.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 44787,
    },
    avalancheCChain: {
      url: `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 43114,
    },
    avalancheCChainFuji: {
      url: `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 43113,
    },
    starknetMainnet: {
      url: `https://starknet-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 0, // not documented anywhere
    },
    starknetGoerli: {
      url: `https://starknet-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      saveDeployments: true,
      accounts: liveAccounts,
      chainId: 0, // not documented anywhere
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./build",
    deploy: "./deploy",
    deployments: "./deployments"
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 15
  },
  mocha: {
    timeout: 100000,
    // reporter: 'eth-gas-reporter',
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    authority: {
      default: 1,
    },
    gatekeeper: {
      default: 2,
    },
  },
  typechain: {
    // outDir: 'src/types',
    // target: 'ethers-v5',
    // alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    // externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    // dontOverrideCompile: false // defaults to false
    tsNocheck: true,
  },
}