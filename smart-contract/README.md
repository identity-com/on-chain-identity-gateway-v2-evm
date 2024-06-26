## Identity.com Gateway Tokens on Ethereum blockchain

This repository contains set of Ethereum smart contracts for Identity.com On-chain Identity Gateway token system.

Gateway tokens allows Ethereum DeFi projects to validate that their users successfully completed KYC, with regulations
and guidances from FATF, US OFAC, US OCC BSA and others.

## Quick Start

1. Use established node version by running `nvm use`
2. Install repository dependencies by running `yarn install`
3. Run `yarn build` to compile smart contracts
4. Execute `yarn test` to run the tests via hardhat.

### Static analysis

Additionally, you can perform static analysis for well-known code issues and vulnerabilities using
[Slither](https://github.com/crytic/slither#slither-the-solidity-source-analyzer).

```
pip3 install slither-analyzer
yarn analyze
```

## Environment variables

Please refer to `.env.example` and create `.env` to provide secret info such as private keys, Infura ID. Private keys
are used in order to deploy smart contracts on one of the Ethereum networks.

## Compile

To compile smart contracts, type `hardhat compile`. Use `--force` option to recompile everything if needed.

The compiled output is a json file called Artifacts and saved in `./build/contracts` directory per contract basis. ABI
and bytecode associated with the smart contract will be saved in the json file.

## Deployment

In order to deploy the protocol please execute `yarn deploy <NETWORK>` command and replace with the network you want to
deploy the protocol.

For example `yarn deploy hardhat` will deploy the protocol on the local hardhat version of the ethereum blockchain.

After the successful deployment you'll be able to find the deployment result in the `deployments` folder.

## Integration

To integrate Gateway in your smart contract:

First, import the contract dependencies:

```
npm install @identity.com/gateway-protocol-eth
```

Then, in your smart contract, inherit the `Gated` contract, and add the `gated` modifier to any function.

The function can only be called by a `msg.sender` that has a valid gateway token.

```solidity
import '@identity.com/gateway-protocol-eth/contracts/Gated.sol';

// Your contract
contract MyContract is Gated {
  constructor(address gatewayTokenContract, uint256 gatekeeperNetwork) Gated(gatewayTokenContract, gatekeeperNetwork) {}

  function myFunction() external gated {}
}
```

If you want more control over the verification process on-chain, you can use the following code instead of the Gated
contract:

```solidity
import "@identity.com/gateway-protocol-eth/contracts/interfaces/IGatewayTokenVerifier.sol";

...
IGatewayTokenVerifier verifier = IGatewayTokenVerifier(gatewayTokenContract);
if (!verifier.verifyToken(addressToVerify, gatekeeperNetwork)) {
// some logic
}
```

## BNB Testnet Deployments
| Contract Name    | Proxy Address | Implementation Address|
| -------- | ------- | ------- |
| GatewayToken  | [0xc25e8e4fd1a892e6c6883ea8e6f3c3eb3b115f44](https://testnet.bscscan.com/address/0xc25e8e4fd1a892e6c6883ea8e6f3c3eb3b115f44) | [0x44e23414d49e6e5dbe548e3e75754a4907a3755a](https://testnet.bscscan.com/address/0x44e23414d49e6e5dbe548e3e75754a4907a3755a) |
| Gateway Network |[0xcbb5c0536bc80c6983cfaab2574685b5f3b679cb](https://testnet.bscscan.com/address/0xcbb5c0536bc80c6983cfaab2574685b5f3b679cb)     |[0x1fcacbfe05fe81df130fbf91c4f7389401940ecf](https://testnet.bscscan.com/address/0x1fcacbfe05fe81df130fbf91c4f7389401940ecf)|
| Gatekeeper    |[0x47340b5b62a1c9038aa70dc1e7344be5a59da8af](https://testnet.bscscan.com/address/0x47340b5b62a1c9038aa70dc1e7344be5a59da8af)|[0xee16c34eb2642087598d474a29b1041f4fe40399](https://testnet.bscscan.com/address/0xee16c34eb2642087598d474a29b1041f4fe40399)|
| Gateway Staking    |[0xf1311706736cf9e75992252e2ab2824f530f847b](https://testnet.bscscan.com/address/0xf1311706736cf9e75992252e2ab2824f530f847b)   |[0x1e3d0ef055bc39397121265392154d358fd72972](https://testnet.bscscan.com/address/0x1e3d0ef055bc39397121265392154d358fd72972)|
| Trusted Forwarder    |N/A   |[0x96b905ff1edfadaec03879450f3dc35a8124dc05](https://testnet.bscscan.com/address/0x96b905ff1edfadaec03879450f3dc35a8124dc05)|
| Flags Storage    |[0x06c9d91b3acc1d2434342242c987064e555ffe8a](https://testnet.bscscan.com/address/0x06c9d91b3acc1d2434342242c987064e555ffe8a)   |[0xfc70a8096d7c9f6c36030199c32cb40806b73edc](https://testnet.bscscan.com/address/0xfc70a8096d7c9f6c36030199c32cb40806b73edc)  |
| Charge Handler    |[0xdc3f03b401826feaa80bdca3c3cb2d5816a5bc77](https://testnet.bscscan.com/address/0xdc3f03b401826feaa80bdca3c3cb2d5816a5bc77)  |[0xe0923d2afb98da565bd253ec776e3ac7477c90ff](https://testnet.bscscan.com/address/0xe0923d2afb98da565bd253ec776e3ac7477c90ff)|
| Dummy ERC-20 Token   |N/A |[0xf380c37eff6c5ab0593927dff4bc7af6428d541f](https://testnet.bscscan.com/address/0xf380c37eff6c5ab0593927dff4bc7af6428d541f)|