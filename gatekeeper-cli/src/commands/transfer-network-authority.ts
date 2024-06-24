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
import { utils } from 'ethers';

export default class TransferNetworkAuthority extends Command {
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
    address: Args.string({name: 'address', required: true, description: 'Gatekeeper address to add to the gatekeeper network'}),
    networkName: Args.string({name: 'networkName', required: true, description: 'Name of the network'})
  };
  
  async run(): Promise<void> {
    const {args, flags} = await this.parse(TransferNetworkAuthority)

    const confirmations = flags.confirmations

    const authority = args.address
    const networkName = utils.formatBytes32String(args.networkName);
    const parsedFlags = parseFlagsWithPrivateKey(flags)

    this.log(`Adding:
			authority ${authority}
			to network ${parsedFlags.gatekeeperNetwork}`)

      const gatewayNetwork = await makeGatewayNetworkTs(parsedFlags)
    const sendableTransaction = await gatewayNetwork.updatePrimaryAuthority(networkName, authority);

    const receipt = await sendableTransaction.wait(confirmations)

    this.log(
      `Added network authority to Gateway Token contract. TxHash: ${receipt.transactionHash}`,
    )
  }
}
