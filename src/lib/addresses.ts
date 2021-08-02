export interface ContractAddresses {
    gatewayTokenController: string
}

const MAINNET_ADDRESSES: ContractAddresses = {
    gatewayTokenController: '0xbCC817f057950b0df41206C5D7125E6225Cae18e',
};

const ROPSTEN_ADDRESSES: ContractAddresses = {
    gatewayTokenController: '0xbCC817f057950b0df41206C5D7125E6225Cae18e',
};

const LOCALHOST_ADDRESSES: ContractAddresses = {
    gatewayTokenController: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
};

export const addresses:{[key: number]: ContractAddresses}  = {
    1: MAINNET_ADDRESSES,
    3: ROPSTEN_ADDRESSES,
    1337: LOCALHOST_ADDRESSES,
};