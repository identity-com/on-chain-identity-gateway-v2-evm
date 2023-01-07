/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  FlagsStorage,
  FlagsStorageInterface,
} from "../../contracts/FlagsStorage";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_superAdmin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "flag",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
    ],
    name: "FlagAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "flag",
        type: "bytes32",
      },
    ],
    name: "FlagRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "prevSuperAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "superAdmin",
        type: "address",
      },
    ],
    name: "SuperAdminUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "flag",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
    ],
    name: "addFlag",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "flags",
        type: "bytes32[]",
      },
      {
        internalType: "uint8[]",
        name: "indexes",
        type: "uint8[]",
      },
    ],
    name: "addFlags",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "flagIndexes",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "flag",
        type: "bytes32",
      },
    ],
    name: "isFlagSupported",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "flag",
        type: "bytes32",
      },
    ],
    name: "removeFlag",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "flags",
        type: "bytes32[]",
      },
    ],
    name: "removeFlags",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "superAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supportedFlagsMask",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "newSuperAdmin",
        type: "address",
      },
    ],
    name: "updateSuperAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610c24380380610c2483398101604081905261002f91610054565b600280546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610b91806100936000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80638e7de730116100665780638e7de73014610129578063a3d0bb2a1461013c578063a64a09561461015f578063b3b48bc214610172578063cae43fd81461018557600080fd5b8063243da6a71461009857806329575f6a146100b45780633551f2e3146100df578063661870b1146100f4575b600080fd5b6100a160035481565b6040519081526020015b60405180910390f35b6002546100c7906001600160a01b031681565b6040516001600160a01b0390911681526020016100ab565b6100f26100ed366004610936565b610198565b005b610117610102366004610973565b60046020526000908152604090205460ff1681565b60405160ff90911681526020016100ab565b6100f2610137366004610973565b610286565b61014f61014a366004610973565b610308565b60405190151581526020016100ab565b6100f261016d3660046109a2565b61031a565b6100f26101803660046109ce565b61034e565b6100f2610193366004610a90565b610431565b6002546001600160a01b031633146101cb5760405162461bcd60e51b81526004016101c290610ab9565b60405180910390fd5b60005b81518160ff1610156102825761020a828260ff16815181106101f2576101f2610ae2565b6020026020010151600061057b90919063ffffffff16565b61024b5760405162461bcd60e51b8152602060048201526012602482015271119b1859c81b9bdd081cdd5c1c1bdc9d195960721b60448201526064016101c2565b610270828260ff168151811061026357610263610ae2565b6020026020010151610596565b8061027a81610b0e565b9150506101ce565b5050565b6002546001600160a01b031633146102b05760405162461bcd60e51b81526004016101c290610ab9565b6102bb60008261057b565b6102fc5760405162461bcd60e51b8152602060048201526012602482015271119b1859c81b9bdd081cdd5c1c1bdc9d195960721b60448201526064016101c2565b61030581610596565b50565b6000610314818361057b565b92915050565b6002546001600160a01b031633146103445760405162461bcd60e51b81526004016101c290610ab9565b61028282826105fc565b6002546001600160a01b031633146103785760405162461bcd60e51b81526004016101c290610ab9565b80518251146103c95760405162461bcd60e51b815260206004820152601a60248201527f496e636f7272656374207661726961626c6573206c656e67746800000000000060448201526064016101c2565b60005b82518160ff16101561042c5761041a838260ff16815181106103f0576103f0610ae2565b6020026020010151838360ff168151811061040d5761040d610ae2565b60200260200101516105fc565b8061042481610b0e565b9150506103cc565b505050565b6002546001600160a01b0316331461045b5760405162461bcd60e51b81526004016101c290610ab9565b6001600160a01b0381166104bc5760405162461bcd60e51b815260206004820152602260248201527f4e45572044414f20434f4e54524f4c4c4552204953205a45524f204144445245604482015261535360f01b60648201526084016101c2565b6001600160a01b0381163b61051f5760405162461bcd60e51b8152602060048201526024808201527f4e45572044414f20434f4e54524f4c4c4552204953204e4f54204120434f4e54604482015263149050d560e21b60648201526084016101c2565b6002546040516001600160a01b038084169216907fd0f5553fb48dccd0de81c4705fa3feaf0b9a936a294741cfb724c33b8373f0c190600090a3600280546001600160a01b0319166001600160a01b0392909216919091179055565b600081815260018301602052604081205415155b9392505050565b6105a1600082610706565b50600081815260046020526040808220805460038054600160ff90931692831b19169055815460ff19169091559051909183917fb4e020b0ecc1c15088dc1d0790a96729268843758491c25d3fa0450d8a9ad34d9190a25050565b600354600160ff83161b16156106495760405162461bcd60e51b8152602060048201526012602482015271125b99195e08185b1c9958591e481d5cd95960721b60448201526064016101c2565b61065460008361057b565b156106965760405162461bcd60e51b8152602060048201526012602482015271119b1859c8185b1c9958591e48195e1a5cdd60721b60448201526064016101c2565b6000828152600460205260408120805460ff191660ff84161790556106bb9083610712565b50600354600160ff83161b1760035560405160ff8216815282907fdd0fa0fc5900cc449b60e07ecc54e117f3828a22f16d74c408c3d456d69f25fe9060200160405180910390a25050565b600061058f838361071e565b600061058f8383610811565b60008181526001830160205260408120548015610807576000610742600183610b2e565b855490915060009061075690600190610b2e565b90508181146107bb57600086600001828154811061077657610776610ae2565b906000526020600020015490508087600001848154811061079957610799610ae2565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806107cc576107cc610b45565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610314565b6000915050610314565b600081815260018301602052604081205461085857508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610314565b506000610314565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561089f5761089f610860565b604052919050565b600067ffffffffffffffff8211156108c1576108c1610860565b5060051b60200190565b600082601f8301126108dc57600080fd5b813560206108f16108ec836108a7565b610876565b82815260059290921b8401810191818101908684111561091057600080fd5b8286015b8481101561092b5780358352918301918301610914565b509695505050505050565b60006020828403121561094857600080fd5b813567ffffffffffffffff81111561095f57600080fd5b61096b848285016108cb565b949350505050565b60006020828403121561098557600080fd5b5035919050565b803560ff8116811461099d57600080fd5b919050565b600080604083850312156109b557600080fd5b823591506109c56020840161098c565b90509250929050565b600080604083850312156109e157600080fd5b823567ffffffffffffffff808211156109f957600080fd5b610a05868387016108cb565b9350602091508185013581811115610a1c57600080fd5b85019050601f81018613610a2f57600080fd5b8035610a3d6108ec826108a7565b81815260059190911b82018301908381019088831115610a5c57600080fd5b928401925b82841015610a8157610a728461098c565b82529284019290840190610a61565b80955050505050509250929050565b600060208284031215610aa257600080fd5b81356001600160a01b038116811461058f57600080fd5b6020808252600f908201526e2727aa1029aaa822a91020a226a4a760891b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff811415610b2557610b25610af8565b60010192915050565b600082821015610b4057610b40610af8565b500390565b634e487b7160e01b600052603160045260246000fdfea26469706673582212207199f6938330c02b8979d051e4e248d0db1035069a32ef9642e8a983d1e880eb64736f6c63430008090033";

type FlagsStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FlagsStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FlagsStorage__factory extends ContractFactory {
  constructor(...args: FlagsStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _superAdmin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FlagsStorage> {
    return super.deploy(_superAdmin, overrides || {}) as Promise<FlagsStorage>;
  }
  override getDeployTransaction(
    _superAdmin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_superAdmin, overrides || {});
  }
  override attach(address: string): FlagsStorage {
    return super.attach(address) as FlagsStorage;
  }
  override connect(signer: Signer): FlagsStorage__factory {
    return super.connect(signer) as FlagsStorage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FlagsStorageInterface {
    return new utils.Interface(_abi) as FlagsStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FlagsStorage {
    return new Contract(address, _abi, signerOrProvider) as FlagsStorage;
  }
}
