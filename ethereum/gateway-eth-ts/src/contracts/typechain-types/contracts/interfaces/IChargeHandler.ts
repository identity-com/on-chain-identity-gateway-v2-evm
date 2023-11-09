/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export type ChargeStruct = {
  value: PromiseOrValue<BigNumberish>;
  chargeType: PromiseOrValue<BigNumberish>;
  token: PromiseOrValue<string>;
  tokenSender: PromiseOrValue<string>;
  recipient: PromiseOrValue<string>;
};

export type ChargeStructOutput = [BigNumber, number, string, string, string] & {
  value: BigNumber;
  chargeType: number;
  token: string;
  tokenSender: string;
  recipient: string;
};

export interface IChargeHandlerInterface extends utils.Interface {
  functions: {
    "handleCharge((uint256,uint8,address,address,address),uint256)": FunctionFragment;
    "setApproval(address,address,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "handleCharge" | "setApproval"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "handleCharge",
    values: [ChargeStruct, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setApproval",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "handleCharge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApproval",
    data: BytesLike
  ): Result;

  events: {
    "ApprovalSet(address,address,uint256,uint256)": EventFragment;
    "ChargePaid(tuple)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApprovalSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChargePaid"): EventFragment;
}

export interface ApprovalSetEventObject {
  gatewayTokenAddress: string;
  tokenAddress: string;
  tokens: BigNumber;
  network: BigNumber;
}
export type ApprovalSetEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  ApprovalSetEventObject
>;

export type ApprovalSetEventFilter = TypedEventFilter<ApprovalSetEvent>;

export interface ChargePaidEventObject {
  arg0: ChargeStructOutput;
}
export type ChargePaidEvent = TypedEvent<
  [ChargeStructOutput],
  ChargePaidEventObject
>;

export type ChargePaidEventFilter = TypedEventFilter<ChargePaidEvent>;

export interface IChargeHandler extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IChargeHandlerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    handleCharge(
      charge: ChargeStruct,
      network: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setApproval(
      gatewayTokenAddress: PromiseOrValue<string>,
      tokenAddress: PromiseOrValue<string>,
      tokens: PromiseOrValue<BigNumberish>,
      network: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  handleCharge(
    charge: ChargeStruct,
    network: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setApproval(
    gatewayTokenAddress: PromiseOrValue<string>,
    tokenAddress: PromiseOrValue<string>,
    tokens: PromiseOrValue<BigNumberish>,
    network: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    handleCharge(
      charge: ChargeStruct,
      network: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setApproval(
      gatewayTokenAddress: PromiseOrValue<string>,
      tokenAddress: PromiseOrValue<string>,
      tokens: PromiseOrValue<BigNumberish>,
      network: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ApprovalSet(address,address,uint256,uint256)"(
      gatewayTokenAddress?: null,
      tokenAddress?: null,
      tokens?: null,
      network?: null
    ): ApprovalSetEventFilter;
    ApprovalSet(
      gatewayTokenAddress?: null,
      tokenAddress?: null,
      tokens?: null,
      network?: null
    ): ApprovalSetEventFilter;

    "ChargePaid(tuple)"(arg0?: null): ChargePaidEventFilter;
    ChargePaid(arg0?: null): ChargePaidEventFilter;
  };

  estimateGas: {
    handleCharge(
      charge: ChargeStruct,
      network: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setApproval(
      gatewayTokenAddress: PromiseOrValue<string>,
      tokenAddress: PromiseOrValue<string>,
      tokens: PromiseOrValue<BigNumberish>,
      network: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    handleCharge(
      charge: ChargeStruct,
      network: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setApproval(
      gatewayTokenAddress: PromiseOrValue<string>,
      tokenAddress: PromiseOrValue<string>,
      tokens: PromiseOrValue<BigNumberish>,
      network: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
