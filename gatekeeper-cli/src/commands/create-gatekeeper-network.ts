import {Command, Flags} from '@oclif/core'

import { makeGatewayNetworkTs } from '../utils/oclif/utils'
import {
  confirmationsFlag, DEFAULT_GATEKEEPER_NETWORK,
  feesFlag, gatewayTokenAddressFlag, chainFlag, parseFlagsWithPrivateKey,
  privateKeyFlag, gasLimitFlag,
  gatewayNetworkAddressFlag,
} from '../utils/oclif/flags'

export default class CreateGatekeeperNetwork extends Command {
  static description = 'Create a new gatekeeper network';

  static examples = [
    `$ gateway-eth create-gatekeeper-network <number> <name>
		`,
  ];

  static flags = {
    help: Flags.help({char: 'h'}),
    privateKey: privateKeyFlag(),
    chain: chainFlag(),
    gatewayTokenAddress: gatewayTokenAddressFlag(),
    gatewayNetworkAddress: gatewayNetworkAddressFlag(),
    fees: feesFlag(),
    gasLimit: gasLimitFlag(),
    confirmations: confirmationsFlag(),
  };

  static args = [
    {name: 'name', required: true, description: 'Name of the new network'},
    {name: 'primaryAuthority', required: true, description: 'EOA that will be the admin on the network'},
    {name: 'passExpireDurationInSeconds', required: true, description: 'Default expiration of passes on this network. This value can be overriden by gatekeepers'},
    {name: 'defaultFee', required: false, description: 'Default fee amount on pass issuance, refresh, expiration and freezing'},
    {name: 'supportedToken', required: false, description: 'ERC20 token address that will be used for fees. The zero address represents native ether. Default token is native ether.'},
    {name: 'description', required: true, description: 'Description of the network.'}
  ];

  async run(): Promise<void> {
    const {args, flags} = await this.parse(CreateGatekeeperNetwork)

    const confirmations = flags.confirmations

    const parsedFlags = parseFlagsWithPrivateKey({...flags, gatekeeperNetwork: DEFAULT_GATEKEEPER_NETWORK})

    this.log(`Creating gatekeeper network: name ${args.name}`)

    const gatewayNetwork = await makeGatewayNetworkTs(parsedFlags)

    const createNetworkInput = {
      primaryAuthority: args.primaryAuthority,
      name: args.name,
      passExpireDurationInSeconds: args.passExpireDurationInSeconds,
      networkFeatureMask: 0,
      networkFee: {
        issueFee: args.defaultFee,
        refreshFee: args.defaultFee,
        expireFee: args.defaultFee,
        freezeFee: args.defaultFee
      },
      supportedToken: args.supportedToken,
      gatekeepers: [],
      lastFeeUpdateTimestamp: 0,
      description: args.description
    }

    const sendableTransaction = await gatewayNetwork.createNetwork(createNetworkInput)

    const receipt = await sendableTransaction.wait(confirmations)

    this.log(
      `Created Gatekeeper Network. TxHash: ${receipt.transactionHash}`,
    )
  }
}
