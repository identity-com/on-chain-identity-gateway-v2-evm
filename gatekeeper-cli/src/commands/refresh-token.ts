import {
    confirmationsFlag,
    feesFlag, gatekeeperNetworkFlag,
    gatewayTokenAddressFlag,
    chainFlag, parseFlagsWithPrivateKey,
    privateKeyFlag, gasLimitFlag,
    gatewayNetworkAddressFlag,
  } from '../utils/oclif/flags'
  import {Args, Command, Flags} from '@oclif/core'
  import {makeGatewayNetworkTs, makeGatewayTs} from '../utils/oclif/utils'
  import { utils, Wallet } from 'ethers';
  
  export default class RefreshToken extends Command {
    static description = 'Gatekeepers can issue tokens on their respective networks';
  
    static examples = [
      `$ gateway-eth issue-token 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
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
      tokenOwner: Args.string({name: 'tokenOwner', required: true, description: 'Owner of the specified gateway token'}),
      networkName: Args.string({name: 'networkName', required: true, description: 'Name of the network'}),
      expirationTimeInSeconds: Args.integer({name: 'expirationTimeInSeconds', required: true, description: "The amount of time in seconds before a token expires. Default value is set to 0. Network primary authority can override this value"}),
      feeSender: Args.string({name: 'feeSender', required: true, description: "Address that will be paying the fee"}),
      chargeType: Args.string({name: "chargeType", required: true, description: "Supproted types are: NONE, ETH and ERC20. This is set by the network"}),
      feeValue: Args.integer({name: "feeValue", required: true, description: "Value charged to fee sender. They must approve before hand"})
    }
  
    async run(): Promise<void> {
      const {args, flags} = await this.parse(RefreshToken)
  
      const tokenOwner: string = args.tokenOwner
      const parsedFlags = parseFlagsWithPrivateKey(flags)
  
  
      const gatewayNetwork = await makeGatewayNetworkTs(parsedFlags)
      const gatewayTokenTs = await makeGatewayTs(parsedFlags)

      const networkId = await gatewayNetwork.getNetworkId(utils.formatBytes32String(args.networkName));
      const feeRecipient = (new Wallet(parsedFlags.privateKey)).address
      const sendableTransaction = await gatewayTokenTs.refresh(
          tokenOwner,
          networkId.valueOf() as bigint,
          {feeRecipient , feeSender: args.feeSender},
          args.expirationTimeInSeconds,
          {
              tokenSender: args.feeSender,
              recipient: feeRecipient
          }
      )
  
      const receipt = await sendableTransaction.wait(flags.confirmations)
  
      this.log(
        `Refreshed gateway token. TxHash: ${receipt.transactionHash}`,
      )
    }
  }
  