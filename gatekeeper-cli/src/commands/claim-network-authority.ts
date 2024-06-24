import {Args, Command, Flags} from '@oclif/core'

import {makeGatewayNetworkTs} from '../utils/oclif/utils'
import {
  confirmationsFlag,
  feesFlag, gatekeeperNetworkFlag,
  gatewayTokenAddressFlag,
  chainFlag, parseFlagsWithPrivateKey,
  privateKeyFlag, gasLimitFlag,
  gatewayNetworkAddressFlag,
} from '../utils/oclif/flags'
import { getSigner } from '../utils/oclif/signer';
import { utils } from 'ethers';

export default class ClaimNetworkAuthority extends Command {
  static description = 'Transfer network primary authority';

  static examples = [
    `$ gateway-eth add-network-authority 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
		`,
  ];

  static flags = {
    help: Flags.help({char: 'h'}),
    privateKey: privateKeyFlag(),
    gatewayTokenAddress: gatewayTokenAddressFlag(),
    gatekeeperNetwork: gatekeeperNetworkFlag(),
    gatewayNetworkAddress: gatewayNetworkAddressFlag(),
    chain: chainFlag(),
    fees: feesFlag(),
    gasLimit: gasLimitFlag(),
    confirmations: confirmationsFlag(),
  };

  static args = {
    networkName: Args.string({name: 'networkName', required: true, description: 'Name of the network'})
  }
  
  async run(): Promise<void> {
    const {args, flags} = await this.parse(ClaimNetworkAuthority)

    const confirmations = flags.confirmations

    const networkName = args.networkName;
    const parsedFlags = parseFlagsWithPrivateKey(flags)

    const signer = getSigner(parsedFlags.privateKey, parsedFlags.provider)
    
    const authority = signer.address

    this.log(`Adding:
			authority ${authority}
			to network ${parsedFlags.gatekeeperNetwork}`)

    const gatewayNetwork = await makeGatewayNetworkTs(parsedFlags)
    const sendableTransaction = await gatewayNetwork.claimPrimaryAuthority(utils.formatBytes32String(networkName));

    const receipt = await sendableTransaction.wait(confirmations)

    this.log(
      `Added network authority to Gateway Token contract. TxHash: ${receipt.transactionHash}`,
    )
  }
}
