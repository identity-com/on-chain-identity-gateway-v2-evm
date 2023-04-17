/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IGatewayToken,
  IGatewayTokenInterface,
} from "../../../contracts/interfaces/IGatewayToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "available",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "required",
        type: "uint256",
      },
    ],
    name: "GatewayToken__InsufficientFunds",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "GatewayToken__NetworkAlreadyExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "GatewayToken__NetworkDoesNotExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "GatewayToken__NotDAOGoverned",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "GatewayToken__TokenDoesNotExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "allowExpired",
        type: "bool",
      },
    ],
    name: "GatewayToken__TokenDoesNotExistOrIsInactive",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "enum IGatewayToken.TokenState",
        name: "state",
        type: "uint8",
      },
      {
        internalType: "enum IGatewayToken.TokenState",
        name: "expectedState",
        type: "uint8",
      },
    ],
    name: "GatewayToken__TokenInvalidStateForOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousDAOManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newDAOManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "DAOManagerTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "addNetworkAuthority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bool",
        name: "daoGoverned",
        type: "bool",
      },
      {
        internalType: "address",
        name: "daoManager",
        type: "address",
      },
    ],
    name: "createNetwork",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "getNetwork",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getToken",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "state",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "identity",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bitmask",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "gatekeeper",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "isGatekeeper",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "isNetworkAuthority",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mask",
        type: "uint256",
      },
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
            name: "recipient",
            type: "address",
          },
        ],
        internalType: "struct Charge",
        name: "charge",
        type: "tuple",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "authority",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "removeNetworkAuthority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "renameNetwork",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "previousManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "newManager",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "network",
        type: "uint256",
      },
    ],
    name: "transferDAOManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IGatewayToken__factory {
  static readonly abi = _abi;
  static createInterface(): IGatewayTokenInterface {
    return new utils.Interface(_abi) as IGatewayTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGatewayToken {
    return new Contract(address, _abi, signerOrProvider) as IGatewayToken;
  }
}