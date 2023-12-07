/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Gated, GatedInterface } from "../../contracts/Gated";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "gatewayToken",
        type: "address",
      },
    ],
    name: "IsGated__InvalidGatewayToken",
    type: "error",
  },
  {
    inputs: [],
    name: "IsGated__ZeroContractAddress",
    type: "error",
  },
] as const;

export class Gated__factory {
  static readonly abi = _abi;
  static createInterface(): GatedInterface {
    return new utils.Interface(_abi) as GatedInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Gated {
    return new Contract(address, _abi, signerOrProvider) as Gated;
  }
}