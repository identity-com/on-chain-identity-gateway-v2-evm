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
  import { utils } from 'ethers';
  
  export default class VerifyAddress extends Command {
    static description = 'Checks if the given address has a valid gateway token on the given network';
  
    static examples = [
      `$ gateway-eth verify-address 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 networkName
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
        address: Args.string({name: 'address', required: true, description: 'Address to verify'}),
        networkName: Args.string({name: 'networkName', required: true, description: 'Name of the network'})
    }
  
    async run(): Promise<void> {
        const {args, flags} = await this.parse(VerifyAddress)

        const parsedFlags = parseFlagsWithPrivateKey(flags)
    
    
      const gatewayTokenTs = await makeGatewayTs(parsedFlags)
      const gatewayNetwork = await makeGatewayNetworkTs(parsedFlags)
      const networkId = await gatewayNetwork.getNetworkId(args.networkName);

      const hasValidToken = await gatewayTokenTs.verify(args.address, networkId.valueOf() as bigint);
  
  
      this.log(
        `Address ${args.address} ${hasValidToken ? "has" : "does not have"} a valid token`,
      )
    }
  }
  