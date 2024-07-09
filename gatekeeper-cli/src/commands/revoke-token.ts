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
  
  export default class RevokeToken extends Command {
    static description = 'Gatekeeper can revoke tokens they issued';
  
    static examples = [
      `$ gateway-eth revoke-token 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
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
    }
  
    async run(): Promise<void> {
      const {args, flags} = await this.parse(RevokeToken)
  
      const tokenOwner: string = args.tokenOwner
      const parsedFlags = parseFlagsWithPrivateKey(flags)
  
  
      const gatewayNetwork = await makeGatewayNetworkTs(parsedFlags)
      const gatewayTokenTs = await makeGatewayTs(parsedFlags)

      const networkId = await gatewayNetwork.getNetworkId(utils.formatBytes32String(args.networkName));
      const sendableTransaction = await gatewayTokenTs.revoke(tokenOwner, networkId.valueOf() as bigint)
  
      const receipt = await sendableTransaction.wait(flags.confirmations)
  
      this.log(
        `Revoked gateway token. TxHash: ${receipt.transactionHash}`,
      )
    }
  }
  