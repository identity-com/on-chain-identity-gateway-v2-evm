Gateway ETH CLI
=================

CLI for the Gateway Protocol on EVM chains.

For more detail, see the [Gateway Protocol](https://github.com/identity-com/on-chain-identity-gateway)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Quick Start](#quick-start)
* [Local development](#local-development)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Quick Start

```shell
yarn global add @identity.com/gateway-eth-cli
```

TIP: run `gateway-eth <command> -h` to see all options at any time.

## Verify an address on a network

```shell
gateway-eth verify-address <your address> <networkId>
```

## Add a gatekeeper

This command will add yourself as a gatekeeper to the test gatekeeper network on Goerli, using the
built-in test network authority key.

```shell
gateway-eth add-gatekeeper -c goerli <your address>
```

To use a gatekeeper other than the test gatekeeper network, set the network using the -n flag.
To default to a given network, set the `DEFAULT_GATEKEEPER_NETWORK` environment variable.

## Issue a pass

Once you are a gatekeeper, you can issue passes.

```shell
gateway-eth issue -c goerli <pass recipient address>
```

## Listen to pass changes

TIP: Set the DEFAULT_CHAIN environment variable to avoid having to specify the chain with every command.

```shell
export DEFAULT_CHAIN=goerli

gateway-eth listen <owner>
```

## Create a Gatekeeper Network

To create a gatekeeper network, find an unused ID, and register it with a name.

NOTE: Consult with identity.com about listing the gatekeeper network, in order to avoid collisions.

```shell
gateway-eth create-gatekeeper-network -c goerli <id> <name>
```

# Quick Start

This repository uses a local foundry node for testing against our contracts on bnb testnet

# Usage
<!-- usage -->
```sh-session
$ npm install -g @identity.com/gateway-evm-cli
$ gateway-eth COMMAND
running command...
$ gateway-eth (-v|--version|version)
@identity.com/gateway-evm-cli/0.0.1-alpha.1 darwin-arm64 node-v18.0.0
$ gateway-eth --help [COMMAND]
USAGE
  $ gateway-eth COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gateway-eth add-gatekeeper ADDRESS NETWORKNAME`](#gateway-eth-add-gatekeeper-address-networkname)
* [`gateway-eth claim-network-authority NETWORKNAME`](#gateway-eth-claim-network-authority-networkname)
* [`gateway-eth create-gatekeeper-network NAME PRIMARYAUTHORITY DESCRIPTION [PASSEXPIREDURATIONINSECONDS] [DEFAULTFEE] [SUPPORTEDTOKEN]`](#gateway-eth-create-gatekeeper-network-name-primaryauthority-description-passexpiredurationinseconds-defaultfee-supportedtoken)
* [`gateway-eth help [COMMAND]`](#gateway-eth-help-command)
* [`gateway-eth remove-gatekeeper ADDRESS NETWORKNAME`](#gateway-eth-remove-gatekeeper-address-networkname)
* [`gateway-eth transfer-network-authority ADDRESS NETWORKNAME`](#gateway-eth-transfer-network-authority-address-networkname)

## `gateway-eth add-gatekeeper ADDRESS NETWORKNAME`

Add a gatekeeper to a gatekeeper network

```
USAGE
  $ gateway-eth add-gatekeeper ADDRESS NETWORKNAME

ARGUMENTS
  ADDRESS      Gatekeeper address to add to the gatekeeper network
  NETWORKNAME  Name of the network

OPTIONS
  -a, --gatewayNetworkAddress=gatewayNetworkAddress
      GatewayNetwork address to target (or set GATEWAY_NETWORK_ADDRESS environment variable)

  -c, --chain=localhost|ethereum|sepolia|goerli|polygonMumbai|polygon|auroraTestnet|aurora|optimismGoerli|optimism|palmT
  estnet|palm|arbitrumGoerli|arbitrumSepolia|arbitrum|celo|celoAlfajores|avalancheCChain|avalancheCChainFuji|starknet|st
  arknetGoerli|xdc|xdcApothem|bsc|cronos|fantom|fantomTestnet|gnosis|moonbeam|moonriver|polygonZkEVMTestnet|polygonZkEVM
  |baseSepolia|base|binanceSmartChain|binanceSmartChainTestnet
      Specify target chain to work with (or set DEFAULT_CHAIN environment variable)

  -f, --fees=fees
      Gas Price level to execute transaction with. For example: instant, fast, standard, slow

  -g, --gasLimit=gasLimit
      Gas limit to set for the transaction. Required only for chains/providers that do not support eth_estimateGas

  -h, --help
      Show CLI help.

  -n, --gatekeeperNetwork=gatekeeperNetwork
      [default: 1] Gatekeeper network. Defaults to the test Gatekeeper Network

  -p, --privateKey=privateKey
      [default: 0xf1ddf80d2b5d038bc2ab7ae9a26e017d2252218dc687ab72d45f84bfbee2957d] The ethereum address private key for
      signing messages (or set PRIVATE_KEY environment variable)

  -t, --gatewayTokenAddress=gatewayTokenAddress
      [default: 0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E] GatewayToken address to target (or set GATEWAY_TOKEN_ADDRESS
      environment variable)

  -w, --confirmations=confirmations
      [default: [object Object]] The amount of blocks to wait for mined transaction

EXAMPLE
  $ gateway-eth add-gatekeeper 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
```

_See code: [dist/commands/add-gatekeeper.ts](https://github.com/identity-com/on-chain-identity-gateway/blob/v0.0.1-alpha.1/dist/commands/add-gatekeeper.ts)_

## `gateway-eth claim-network-authority NETWORKNAME`

Transfer network primary authority

```
USAGE
  $ gateway-eth claim-network-authority NETWORKNAME

ARGUMENTS
  NETWORKNAME  Name of the network

OPTIONS
  -a, --gatewayNetworkAddress=gatewayNetworkAddress
      GatewayNetwork address to target (or set GATEWAY_NETWORK_ADDRESS environment variable)

  -c, --chain=localhost|ethereum|sepolia|goerli|polygonMumbai|polygon|auroraTestnet|aurora|optimismGoerli|optimism|palmT
  estnet|palm|arbitrumGoerli|arbitrumSepolia|arbitrum|celo|celoAlfajores|avalancheCChain|avalancheCChainFuji|starknet|st
  arknetGoerli|xdc|xdcApothem|bsc|cronos|fantom|fantomTestnet|gnosis|moonbeam|moonriver|polygonZkEVMTestnet|polygonZkEVM
  |baseSepolia|base|binanceSmartChain|binanceSmartChainTestnet
      Specify target chain to work with (or set DEFAULT_CHAIN environment variable)

  -f, --fees=fees
      Gas Price level to execute transaction with. For example: instant, fast, standard, slow

  -g, --gasLimit=gasLimit
      Gas limit to set for the transaction. Required only for chains/providers that do not support eth_estimateGas

  -h, --help
      Show CLI help.

  -n, --gatekeeperNetwork=gatekeeperNetwork
      [default: 1] Gatekeeper network. Defaults to the test Gatekeeper Network

  -p, --privateKey=privateKey
      [default: 0xf1ddf80d2b5d038bc2ab7ae9a26e017d2252218dc687ab72d45f84bfbee2957d] The ethereum address private key for
      signing messages (or set PRIVATE_KEY environment variable)

  -t, --gatewayTokenAddress=gatewayTokenAddress
      [default: 0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E] GatewayToken address to target (or set GATEWAY_TOKEN_ADDRESS
      environment variable)

  -w, --confirmations=confirmations
      [default: [object Object]] The amount of blocks to wait for mined transaction

EXAMPLE
  $ gateway-eth add-network-authority 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
```

_See code: [dist/commands/claim-network-authority.ts](https://github.com/identity-com/on-chain-identity-gateway/blob/v0.0.1-alpha.1/dist/commands/claim-network-authority.ts)_

## `gateway-eth create-gatekeeper-network NAME PRIMARYAUTHORITY DESCRIPTION [PASSEXPIREDURATIONINSECONDS] [DEFAULTFEE] [SUPPORTEDTOKEN]`

Create a new gatekeeper network

```
USAGE
  $ gateway-eth create-gatekeeper-network NAME PRIMARYAUTHORITY DESCRIPTION [PASSEXPIREDURATIONINSECONDS] [DEFAULTFEE] 
  [SUPPORTEDTOKEN]

ARGUMENTS
  NAME                         Name of the new network
  PRIMARYAUTHORITY             EOA that will be the admin on the network
  DESCRIPTION                  Description of the network.
  PASSEXPIREDURATIONINSECONDS  Default expiration of passes on this network. This value can be overriden by gatekeepers
  DEFAULTFEE                   Default fee amount on pass issuance, refresh, expiration and freezing

  SUPPORTEDTOKEN               ERC20 token address that will be used for fees. The zero address represents native ether.
                               Default token is native ether.

OPTIONS
  -a, --gatewayNetworkAddress=gatewayNetworkAddress
      GatewayNetwork address to target (or set GATEWAY_NETWORK_ADDRESS environment variable)

  -c, --chain=localhost|ethereum|sepolia|goerli|polygonMumbai|polygon|auroraTestnet|aurora|optimismGoerli|optimism|palmT
  estnet|palm|arbitrumGoerli|arbitrumSepolia|arbitrum|celo|celoAlfajores|avalancheCChain|avalancheCChainFuji|starknet|st
  arknetGoerli|xdc|xdcApothem|bsc|cronos|fantom|fantomTestnet|gnosis|moonbeam|moonriver|polygonZkEVMTestnet|polygonZkEVM
  |baseSepolia|base|binanceSmartChain|binanceSmartChainTestnet
      Specify target chain to work with (or set DEFAULT_CHAIN environment variable)

  -f, --fees=fees
      Gas Price level to execute transaction with. For example: instant, fast, standard, slow

  -g, --gasLimit=gasLimit
      Gas limit to set for the transaction. Required only for chains/providers that do not support eth_estimateGas

  -h, --help
      Show CLI help.

  -p, --privateKey=privateKey
      [default: 0xf1ddf80d2b5d038bc2ab7ae9a26e017d2252218dc687ab72d45f84bfbee2957d] The ethereum address private key for
      signing messages (or set PRIVATE_KEY environment variable)

  -t, --gatewayTokenAddress=gatewayTokenAddress
      [default: 0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E] GatewayToken address to target (or set GATEWAY_TOKEN_ADDRESS
      environment variable)

  -w, --confirmations=confirmations
      [default: [object Object]] The amount of blocks to wait for mined transaction

EXAMPLE
  $ gateway-eth create-gatekeeper-network <number> <name>
```

_See code: [dist/commands/create-gatekeeper-network.ts](https://github.com/identity-com/on-chain-identity-gateway/blob/v0.0.1-alpha.1/dist/commands/create-gatekeeper-network.ts)_

## `gateway-eth help [COMMAND]`

Display help for gateway-eth.

```
USAGE
  $ gateway-eth help [COMMAND]

ARGUMENTS
  COMMAND  Command to show help for.

OPTIONS
  -n, --nested-commands  Include all nested commands in the output.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.20/src/commands/help.ts)_

## `gateway-eth remove-gatekeeper ADDRESS NETWORKNAME`

Remove a gatekeeper from a gatekeeper network

```
USAGE
  $ gateway-eth remove-gatekeeper ADDRESS NETWORKNAME

ARGUMENTS
  ADDRESS      Gatekeeper address to remove from the gatekeeper network
  NETWORKNAME  Name of the network

OPTIONS
  -a, --gatewayNetworkAddress=gatewayNetworkAddress
      GatewayNetwork address to target (or set GATEWAY_NETWORK_ADDRESS environment variable)

  -c, --chain=localhost|ethereum|sepolia|goerli|polygonMumbai|polygon|auroraTestnet|aurora|optimismGoerli|optimism|palmT
  estnet|palm|arbitrumGoerli|arbitrumSepolia|arbitrum|celo|celoAlfajores|avalancheCChain|avalancheCChainFuji|starknet|st
  arknetGoerli|xdc|xdcApothem|bsc|cronos|fantom|fantomTestnet|gnosis|moonbeam|moonriver|polygonZkEVMTestnet|polygonZkEVM
  |baseSepolia|base|binanceSmartChain|binanceSmartChainTestnet
      Specify target chain to work with (or set DEFAULT_CHAIN environment variable)

  -f, --fees=fees
      Gas Price level to execute transaction with. For example: instant, fast, standard, slow

  -g, --gasLimit=gasLimit
      Gas limit to set for the transaction. Required only for chains/providers that do not support eth_estimateGas

  -h, --help
      Show CLI help.

  -n, --gatekeeperNetwork=gatekeeperNetwork
      [default: 1] Gatekeeper network. Defaults to the test Gatekeeper Network

  -p, --privateKey=privateKey
      [default: 0xf1ddf80d2b5d038bc2ab7ae9a26e017d2252218dc687ab72d45f84bfbee2957d] The ethereum address private key for
      signing messages (or set PRIVATE_KEY environment variable)

  -t, --gatewayTokenAddress=gatewayTokenAddress
      [default: 0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E] GatewayToken address to target (or set GATEWAY_TOKEN_ADDRESS
      environment variable)

  -w, --confirmations=confirmations
      [default: [object Object]] The amount of blocks to wait for mined transaction

EXAMPLE
  $ gateway-eth remove-gatekeeper 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
```

_See code: [dist/commands/remove-gatekeeper.ts](https://github.com/identity-com/on-chain-identity-gateway/blob/v0.0.1-alpha.1/dist/commands/remove-gatekeeper.ts)_

## `gateway-eth transfer-network-authority ADDRESS NETWORKNAME`

Transfer network primary authority

```
USAGE
  $ gateway-eth transfer-network-authority ADDRESS NETWORKNAME

ARGUMENTS
  ADDRESS      Primary authority address to transfer network ownership
  NETWORKNAME  Name of the network

OPTIONS
  -a, --gatewayNetworkAddress=gatewayNetworkAddress
      GatewayNetwork address to target (or set GATEWAY_NETWORK_ADDRESS environment variable)

  -c, --chain=localhost|ethereum|sepolia|goerli|polygonMumbai|polygon|auroraTestnet|aurora|optimismGoerli|optimism|palmT
  estnet|palm|arbitrumGoerli|arbitrumSepolia|arbitrum|celo|celoAlfajores|avalancheCChain|avalancheCChainFuji|starknet|st
  arknetGoerli|xdc|xdcApothem|bsc|cronos|fantom|fantomTestnet|gnosis|moonbeam|moonriver|polygonZkEVMTestnet|polygonZkEVM
  |baseSepolia|base|binanceSmartChain|binanceSmartChainTestnet
      Specify target chain to work with (or set DEFAULT_CHAIN environment variable)

  -f, --fees=fees
      Gas Price level to execute transaction with. For example: instant, fast, standard, slow

  -g, --gasLimit=gasLimit
      Gas limit to set for the transaction. Required only for chains/providers that do not support eth_estimateGas

  -h, --help
      Show CLI help.

  -n, --gatekeeperNetwork=gatekeeperNetwork
      [default: 1] Gatekeeper network. Defaults to the test Gatekeeper Network

  -p, --privateKey=privateKey
      [default: 0xf1ddf80d2b5d038bc2ab7ae9a26e017d2252218dc687ab72d45f84bfbee2957d] The ethereum address private key for
      signing messages (or set PRIVATE_KEY environment variable)

  -t, --gatewayTokenAddress=gatewayTokenAddress
      [default: 0xF65b6396dF6B7e2D8a6270E3AB6c7BB08BAEF22E] GatewayToken address to target (or set GATEWAY_TOKEN_ADDRESS
      environment variable)

  -w, --confirmations=confirmations
      [default: [object Object]] The amount of blocks to wait for mined transaction

EXAMPLE
  $ gateway-eth add-network-authority 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
```

_See code: [dist/commands/transfer-network-authority.ts](https://github.com/identity-com/on-chain-identity-gateway/blob/v0.0.1-alpha.1/dist/commands/transfer-network-authority.ts)_
<!-- commandsstop -->
