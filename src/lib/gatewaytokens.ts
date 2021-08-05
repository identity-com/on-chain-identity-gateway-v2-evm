import { Contract } from "ethers";
import { GatewayToken } from "../contracts";

export interface GatewayTokenItem {
  name: string;
  symbol: string;
  address: string;
  tokenInstance?: GatewayToken;
}

const MAINNET_GATEWAY_TOKENS: GatewayTokenItem[] = [
    {
      name: 'Test Gateway Token',
      symbol: 'tKYC',
      address: '0x0',
    }
];

const ROPSTEN_GATEWAY_TOKENS: GatewayTokenItem[] = [
    {
      name: 'Test Gateway Token',
      symbol: 'tKYC',
      address: '0xF1FEEeAC97aE1C23c3D9e11885Af440FCB39C348',
    }
];

const LOCALHOST_GATEWAY_TOKENS: GatewayTokenItem[] = [
  {
    name: 'Test-KYC',
    symbol: 'tKYC',
    address: '0xa16E02E87b7454126E5E10d957A927A7F5B5d2be',
  }
];

export const gatewayTokenAddresses: {[key: number]: GatewayTokenItem[]} = {
  1: MAINNET_GATEWAY_TOKENS,
  3: ROPSTEN_GATEWAY_TOKENS,
  1337: LOCALHOST_GATEWAY_TOKENS,
}