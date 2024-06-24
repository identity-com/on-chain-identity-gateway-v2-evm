import {Args, Command, Flags} from '@oclif/core'

import { makeGatewayNetworkTs } from '../utils/oclif/utils'
import {
  confirmationsFlag, DEFAULT_GATEKEEPER_NETWORK,
  feesFlag, gatewayTokenAddressFlag, chainFlag, parseFlagsWithPrivateKey,
  privateKeyFlag, gasLimitFlag,
  gatewayNetworkAddressFlag,
} from '../utils/oclif/flags'
import { getAddress } from '@ethersproject/address';
import { ZERO_ADDRESS } from '../utils';
import { utils } from 'ethers';

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
  
  static args = {
    name: Args.string({name: 'name', required: true, description: 'Name of the new network'}),
    primaryAuthority: Args.string({name: 'primaryAuthority', required: true, description: 'EOA that will be the admin on the network'}),
    description: Args.string({name: 'description', required: true, description: 'Description of the network.'}),
    passExpireDurationInSeconds: Args.integer({name: 'passExpireDurationInSeconds', required: false, description: 'Default expiration of passes on this network. This value can be overriden by gatekeepers'}),
    defaultFee: Args.integer({name: 'defaultFee', required: false, description: 'Default fee amount on pass issuance, refresh, expiration and freezing'}),
    supportedToken: Args.string({name: 'supportedToken', required: false, description: 'ERC20 token address that will be used for fees. The zero address represents native ether. Default token is native ether.'})
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(CreateGatekeeperNetwork)

    const confirmations = flags.confirmations

    const parsedFlags = parseFlagsWithPrivateKey({...flags, gatekeeperNetwork: DEFAULT_GATEKEEPER_NETWORK})

    //this.log(`Creating gatekeeper network: name ${args.name}`)
    const gatewayNetwork = await makeGatewayNetworkTs(parsedFlags)

    const fee = args.defaultFee ? args.defaultFee : 0;
    const createNetworkInput = {
      primaryAuthority: getAddress(args.primaryAuthority),
      name: utils.formatBytes32String(args.name),
      passExpireDurationInSeconds: args.passExpireDurationInSeconds ? args.passExpireDurationInSeconds : 0,
      networkFeatureMask: 0,
      networkFee: {
        issueFee: fee,
        refreshFee: fee,
        expireFee: fee,
        freezeFee: fee
      },
      supportedToken: args.supportedToken ? getAddress(args.supportedToken) : ZERO_ADDRESS,
      gatekeepers: [],
      lastFeeUpdateTimestamp: 0,
      description: utils.formatBytes32String(args.description)
    }

    const sendableTransaction = await gatewayNetwork.createNetwork(createNetworkInput)

    const receipt = await sendableTransaction.wait(confirmations)

    this.log(
      `Created Gatekeeper Network. TxHash: ${receipt.transactionHash} with inputs \n ${JSON.stringify(createNetworkInput)}`,
    )
  }
}
