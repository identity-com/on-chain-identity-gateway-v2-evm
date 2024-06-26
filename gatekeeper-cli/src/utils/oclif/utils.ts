import {Provider} from '@ethersproject/providers'
import {getSigner} from './signer'
import { GatewayTs, TokenData, GatewayNetwork } from "@identity.com/gateway-evm-ts-client";
import {BigNumber} from '@ethersproject/bignumber'
import {estimateGasPrice, GasPriceKey} from './gas'
import { getAddress } from '@ethersproject/address';

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
