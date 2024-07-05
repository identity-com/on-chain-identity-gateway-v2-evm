import {
    confirmationsFlag,
    feesFlag, gatekeeperNetworkFlag,
    gatewayTokenAddressFlag,
    chainFlag, parseFlagsWithPrivateKey,
    privateKeyFlag, gasLimitFlag,
    gatewayNetworkAddressFlag,
  } from '../utils/oclif/flags'
  import {Args, Command, Flags} from '@oclif/core'
  import {makeGatekeeperTs} from '../utils/oclif/utils'
  import { utils } from 'ethers';
  
  export default class UpdateGatekeeperFees extends Command {
    static description = 'Update the fee amount a gatekeeper charges on a given network. Can only be changed once every 7 days.';
  
    static examples = [
      `$ gateway-eth add-gatekeeper 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
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
        networkName: Args.string({name: 'networkName', required: true, description: 'Name of the network'}),
        issueFee: Args.integer({name: 'issueFee', required: true, description: 'Fee amount on pass issuance'}),
        refreshFee: Args.integer({name: 'expireFee', required: true, description: 'Fee amount to refresh an expired token'}),
        freezeFee: Args.integer({name: 'freezeFee', required: true, description: 'Fee amount to freeze a pass'}),
        expireFee: Args.integer({name: 'expireFee', required: true, description: 'Fee amount to expire a  token'})
    }
  
    async run(): Promise<void> {
      const {args, flags} = await this.parse(UpdateGatekeeperFees)
  
      const parsedFlags = parseFlagsWithPrivateKey(flags)
  

  
      const gatewayGatekeeperClient = await makeGatekeeperTs(parsedFlags.provider, parsedFlags.privateKey, parsedFlags.gatekeeperContractAddress as string)
      const sendableTransaction = await gatewayGatekeeperClient.updateFeeConfig({issueFee: args.issueFee, expireFee: args.expireFee, freezeFee: args.freezeFee, refreshFee: args.refreshFee}, utils.formatBytes32String(args.networkName))
  
      const receipt = await sendableTransaction.wait(flags.confirmations)
  
      this.log(
        `Updated gatekeeper fees. TxHash: ${receipt.transactionHash}`,
      )
    }
  }
  