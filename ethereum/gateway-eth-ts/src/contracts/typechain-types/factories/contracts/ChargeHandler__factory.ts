/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ChargeHandler,
  ChargeHandlerInterface,
} from "../../contracts/ChargeHandler";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expectedAllowance",
        type: "uint256",
      },
    ],
    name: "Charge__InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expectedValue",
        type: "uint256",
      },
    ],
    name: "Charge__InsufficientValue",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "enum ChargeType",
            name: "chargeType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenSender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
        ],
        indexed: false,
        internalType: "struct Charge",
        name: "",
        type: "tuple",
      },
    ],
    name: "ChargePaid",
    type: "event",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea264697066735822122003b5d49976f5d4c8a2a1c2c17a3d1e97aa76c567e955e47affc08ef2bd184f5164736f6c63430008090033";

type ChargeHandlerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChargeHandlerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ChargeHandler__factory extends ContractFactory {
  constructor(...args: ChargeHandlerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ChargeHandler> {
    return super.deploy(overrides || {}) as Promise<ChargeHandler>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ChargeHandler {
    return super.attach(address) as ChargeHandler;
  }
  override connect(signer: Signer): ChargeHandler__factory {
    return super.connect(signer) as ChargeHandler__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChargeHandlerInterface {
    return new utils.Interface(_abi) as ChargeHandlerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChargeHandler {
    return new Contract(address, _abi, signerOrProvider) as ChargeHandler;
  }
}
