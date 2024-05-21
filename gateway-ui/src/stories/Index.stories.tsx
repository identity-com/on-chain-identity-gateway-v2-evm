import type { Meta, StoryObj } from '@storybook/react';
import { Wallet, ethers } from "ethers";
import { CollapsableGatewayPortal } from '..';


const foundryDefaultPKWithToken = "0x35993999f8c2237011bd36ae3329c7169d0c3763432c6efe6584ef0a8f22fa65"; // One of the 10 default addresses created by foundry. This address has a gateway token
const publicRPC =  new ethers.providers.JsonRpcProvider("https://bsc-testnet-rpc.publicnode.com	");

// const gatewayIssuerServiceOnTestnet = {
//   fragment: 'gateway-issuer',
//   service_type: 'gateway-issuer',
//   service_endpoint: 'https://bafybeifqxswjdxzwl75ov2bpssvpyojhotahzopblfla63lsiht7ggnnwa.ipfs.w3s.link/'
// }

const meta: Meta<typeof CollapsableGatewayPortal> = {
    title: 'Example protocol UI',
    component: CollapsableGatewayPortal,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
      networkName: { defaultValue: 'test', name: "networkName", type: "string" },
    },
};

export default meta;
type Story = StoryObj<typeof CollapsableGatewayPortal>;


export const WalletWithToken: Story = {
    args: {
      userWallet: new Wallet(foundryDefaultPKWithToken, publicRPC),
      networkName: "Identity.com KYC Verification"
  },
};

export const WalletWithoutToken: Story = {
  args: {
    userWallet: Wallet.createRandom().connect(publicRPC),
    networkName: "Identity.com KYC Verification"
  },
};

  