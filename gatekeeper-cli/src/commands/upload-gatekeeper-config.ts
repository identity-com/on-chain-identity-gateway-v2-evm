import {
    confirmationsFlag,
    feesFlag, gatekeeperNetworkFlag,
    gatewayTokenAddressFlag,
    chainFlag, parseFlagsWithPrivateKey,
    privateKeyFlag, gasLimitFlag,
    gatewayNetworkAddressFlag,
  } from '../utils/oclif/flags'
  import {Args, Command, Flags} from '@oclif/core'
  import {makeDidRegistryClient, makeGatewayNetworkTs} from '../utils/oclif/utils'
  import { utils } from 'ethers';
  
  export default class UploadGatekeeperConfig extends Command {
    static description = 'Uploads issuer.config file to the associated did';
  
    static examples = [
      `$ gateway-eth upload-gatekeeper-config 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94 -n 123
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
        didRegistryContractAddress: Args.string({name: 'didRegistryContractAddress', required: true, description: 'Contract address of the did registry (currently only support did-bnb)'}),
        serviceEndpointUrl: Args.string({name: 'serviceEndpointUrl', required: true, description: 'Url gatekeeper owns that users will be redirected to for token issuance'})
    }
  
    async run(): Promise<void> {
      const {args, flags} = await this.parse(UploadGatekeeperConfig)

  
      const parsedFlags = parseFlagsWithPrivateKey(flags)
  
      const didRegistry = await makeDidRegistryClient(args.didRegistryContractAddress, parsedFlags.privateKey, parsedFlags.provider);

      // Check is did already initialized
      const isDidInitialized = didRegistry.isGenerativeDidState(didRegistry.getDid())

      if(!isDidInitialized) {
        this.log(` Initializing did state`)
        const initilizeTx = await didRegistry.initializeDidState();
        const initilizeReceipt = await initilizeTx.wait(flags.confirmations);

        this.log(`Initialized did. TxHash: ${initilizeReceipt.transactionHash}`)
      }
  
      const sendableTransaction = await didRegistry.addService({
        fragment: 'gateway-issuer',
        service_type: "gateway-issuer",
        service_endpoint: args.serviceEndpointUrl
    })
  
      const receipt = await sendableTransaction.wait(flags.confirmations)
  
      this.log(
        `Added gateway-issuer service endpoint for gatekeeper. TxHash: ${receipt.transactionHash}`,
      )
    }
  }
  