import { Provider } from "@ethersproject/providers";
import { GatewayNetwork } from "@identity.com/gateway-evm-ts-client";
import { Wallet } from "ethers";

interface GatewayProtocolContractAddresses {
    flagsStorage: string,
    gatekeeper: string,
    gatewayNetwork: string,
    chargeHandler: string,
    gatewayStaking: string,
    erc20: string,
    gatewayToken: string,
    forwarder: string
}

export const BNB_TESTNET_CONTRACT_ADDRESSES: GatewayProtocolContractAddresses = {
  flagsStorage: "0x06c9d91b3Acc1D2434342242C987064E555FFe8a",
  gatekeeper: "0x47340b5b62a1c9038aa70dc1e7344be5a59da8af",
  gatewayNetwork: "0xcbB5C0536BC80c6983CFaab2574685b5F3b679cb",
  chargeHandler: "0xDc3f03B401826FEAA80bdCA3c3CB2d5816a5Bc77",
  gatewayStaking: "0xf1311706736cf9e75992252e2ab2824f530f847b",
  erc20: "0xf380c37eFf6c5ab0593927dFf4Bc7AF6428D541F",
  gatewayToken: "0xc25e8e4fd1a892e6c6883ea8e6f3c3eb3b115f44",
  forwarder: "0x96b905fF1eDfAdAEc03879450f3DC35a8124dc05"
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const FOUNDRY_DEFAULT_WALLET_ONE = new Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d") // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export const FOUNDRY_DEFAULT_WALLET_TWO = new Wallet("0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"); // 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
/////// Gateway Protocol Helps

///// Smart contract clients

export const GatewayNetworkClient = (providerOrWallet: Provider | Wallet, gatewatNetworkContractAddress: string) => new GatewayNetwork(providerOrWallet, gatewatNetworkContractAddress)


///// Utils

export function createRandomString(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
