import {Provider} from '@ethersproject/providers'
import {getSigner} from './signer'
import { GatewayTs, TokenData, GatewayNetwork, GatewayGatekeeper } from "@identity.com/gateway-evm-ts-client";
import {BigNumber} from '@ethersproject/bignumber'
import {estimateGasPrice, GasPriceKey} from './gas'
import { getAddress } from '@ethersproject/address';
import { DidRegistry } from "@identity.com/did-bnb-client";

export const makeGatewayTs = async ({
  provider,
  privateKey,
  gatewayTokenAddress,
  fees,
  gasLimit,
  readOnly = false,
}: { provider: Provider, privateKey?: string, gatewayTokenAddress: string, fees?: GasPriceKey, gasLimit?: BigNumber, readOnly: boolean }):Promise<GatewayTs> => {
  const signer = privateKey ? getSigner(privateKey, provider) : undefined
  const feeAmount = readOnly ? {} : await estimateGasPrice(provider, fees)
  const providerOrWallet = readOnly ? provider : signer || provider
  return new GatewayTs(providerOrWallet, gatewayTokenAddress, { ...feeAmount })
}

export const makeGatewayNetworkTs = async ({
  provider,
  privateKey,
  gatewayNetworkAddress,
  fees,
  gasLimit,
  readOnly = false,
}: { provider: Provider, privateKey?: string, gatewayNetworkAddress: string, fees?: GasPriceKey, gasLimit?: BigNumber, readOnly: boolean }):Promise<GatewayNetwork> => {
  const signer = privateKey ? getSigner(privateKey, provider) : undefined
  const feeAmount = readOnly ? {} : await estimateGasPrice(provider, fees)
  const providerOrWallet = readOnly ? provider : signer || provider
  return new GatewayNetwork(providerOrWallet, getAddress(gatewayNetworkAddress))
}

export const makeGatekeeperTs = async (provider: Provider, privateKey: string, gatekeeperContractAddress: string):Promise<GatewayGatekeeper> => {
  const signer = privateKey ? getSigner(privateKey, provider) : undefined
  const providerOrWallet = signer || provider
  return new GatewayGatekeeper(providerOrWallet, getAddress(gatekeeperContractAddress))
}

export const makeDidRegistryClient = async(didRegistryContractAddress: string, privateKey: string, provider: Provider): Promise<DidRegistry> => {
  const signer = privateKey ? getSigner(privateKey, provider) : undefined
  const providerOrWallet = signer || provider

  // Need to parse chainEnv to figure out mainnet vs testnet
  return new DidRegistry(providerOrWallet, didRegistryContractAddress, { chainEnvironment: "testnet", gasLimit: 500000});
}



export const checkedGetToken = async (
  gateway: GatewayTs,
  ownerAddress: string,
  gatekeeperNetwork: number,
  onlyActive: boolean = true
): Promise<TokenData> => {
  const token = await gateway.getFirstTokenOnNetwork(ownerAddress, BigInt(gatekeeperNetwork), onlyActive)
  if (!token) throw new Error('Token not found')
  return token
}
