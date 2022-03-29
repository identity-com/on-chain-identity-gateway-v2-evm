import { Command, flags } from "@oclif/command";
import { BigNumber, utils, Wallet } from "ethers";
import { BaseProvider } from "@ethersproject/providers";
import { GatewayToken } from "../contracts/GatewayToken";
import {
  privateKeyFlag,
  gatewayTokenAddressFlag,
  networkFlag,
  confirmationsFlag,
  gasPriceFeeFlag,
} from "../utils/flags";
import { TxBase } from "../utils/tx";
import { mnemonicSigner, privateKeySigner } from "../utils/signer";

export default class AddGatekeeper extends Command {
  static description = "Add a gatekeeper to a GatewayToken contract";

  static examples = [
    `$ gateway add-gatekeeper 0x893F4Be53274353CD3379C87C8fd1cb4f8458F94
		`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    privateKey: privateKeyFlag(),
    gatewayTokenAddress: gatewayTokenAddressFlag(),
    network: networkFlag(),
    gasPriceFee: gasPriceFeeFlag(),
    confirmations: confirmationsFlag(),
  };

  static args = [
    {
      name: "address",
      required: true,
      description: "Gatekeeper address to add to the GatewayToken contract",
      parse: (input: string): string | null =>
        utils.isAddress(input) ? input : null,
    },
  ];

  async run(): Promise<void> {
    const { args, flags } = this.parse(AddGatekeeper);

    const pk = flags.privateKey;
    const gatekeeper: string = args.address;
    const provider: BaseProvider = flags.network;

    const confirmations = flags.confirmations;

    const signer: Wallet = utils.isValidMnemonic(pk)
      ? mnemonicSigner(pk, provider)
      : privateKeySigner(pk, provider);

    const gatewayTokenAddress: string = flags.gatewayTokenAddress;

    this.log(`Adding:
			gatekeeper ${gatekeeper} 
			to GatewayToken ${gatewayTokenAddress}`);

    const gatewayToken = new GatewayToken(signer, gatewayTokenAddress);

    const gasPrice = await flags.gasPriceFee;
    const gasLimit = await gatewayToken.contract.estimateGas.addGatekeeper(
      gatekeeper
    );

    const txParams: TxBase = {
      gasLimit: gasLimit,
      gasPrice: BigNumber.from(utils.parseUnits(String(gasPrice), "gwei")),
    };

    const tx: any = await (confirmations > 0
      ? (
          await gatewayToken.addGatekeeper(gatekeeper, txParams)
        ).wait(confirmations)
      : gatewayToken.addGatekeeper(gatekeeper, txParams));

    this.log(
      `Added gatekeeper to Gateway Token contract. TxHash: ${
        confirmations > 0 ? tx.transactionHash : tx.hash
      }`
    );
  }
}
