import {
  confirmationsFlag,
  feesFlag, gatekeeperNetworkFlag,
  gatewayTokenAddressFlag,
  chainFlag, parseFlagsWithPrivateKey,
  privateKeyFlag, gasLimitFlag,
  gatewayNetworkAddressFlag,
} from '../utils/oclif/flags'
import {Args, Command, Flags} from '@oclif/core'
import {makeGatewayNetworkTs} from '../utils/oclif/utils'
import { utils } from 'ethers';

export default class RemoveGatekeeper extends Command {
  static description = 'Remove a gatekeeper from a gatekeeper network';

  static examples = [
    `$ gateway-eth remove-gatekeeper 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
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
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(RemoveGatekeeper)

    const gatekeeper: string = args.address;
    const parsedFlags = parseFlagsWithPrivateKey(flags)

    this.log(`Removing:
			gatekeeper ${gatekeeper}
			from network ${args.networkName}`)

    const gatewayNetwork = await makeGatewayNetworkTs(parsedFlags)

    const sendableTransaction = await gatewayNetwork.removeGatekeeper(utils.formatBytes32String(args.networkName), gatekeeper)

    const receipt = await sendableTransaction.wait(flags.confirmations)

    this.log(
      `Removed gatekeeper from network. TxHash: ${receipt.transactionHash}`,
    )
  }
}
