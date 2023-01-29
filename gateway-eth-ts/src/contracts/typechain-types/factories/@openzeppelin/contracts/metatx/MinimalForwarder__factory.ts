/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  MinimalForwarder,
  MinimalForwarderInterface,
} from "../../../../@openzeppelin/contracts/metatx/MinimalForwarder";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct MinimalForwarder.ForwardRequest",
        name: "req",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "getNonce",
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
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct MinimalForwarder.ForwardRequest",
        name: "req",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "verify",
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
] as const;

const _bytecode =
  "0x61014060405234801561001157600080fd5b50604080518082018252601081526f26b4b734b6b0b62337b93bb0b93232b960811b602080830191825283518085019094526005845264302e302e3160d81b908401528151902060e08190527fae209a0b48f21c054280f2455d32cf309387644879d9acbd8ffc1991638118856101008190524660a0529192917f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6100fb8184846040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b6080523060c052610120525061011092505050565b60805160a05160c05160e0516101005161012051610a4c61015f60003960006104ec0152600061053b015260006105160152600061046f01526000610499015260006104c30152610a4c6000f3fe6080604052600436106100345760003560e01c80632d0335ab1461003957806347153f8214610082578063bf5d3bdb146100a3575b600080fd5b34801561004557600080fd5b5061006f6100543660046107e4565b6001600160a01b031660009081526020819052604090205490565b6040519081526020015b60405180910390f35b610095610090366004610814565b6100d3565b6040516100799291906108e3565b3480156100af57600080fd5b506100c36100be366004610814565b61026c565b6040519015158152602001610079565b600060606100e285858561026c565b61014e5760405162461bcd60e51b815260206004820152603260248201527f4d696e696d616c466f727761726465723a207369676e617475726520646f6573604482015271081b9bdd081b585d18da081c995c5d595cdd60721b60648201526084015b60405180910390fd5b61015d6080860135600161091f565b60008061016d60208901896107e4565b6001600160a01b03166001600160a01b03168152602001908152602001600020819055506000808660200160208101906101a791906107e4565b6001600160a01b0316606088013560408901356101c760a08b018b610945565b6101d460208d018d6107e4565b6040516020016101e69392919061098c565b60408051601f1981840301815290829052610200916109b2565b600060405180830381858888f193505050503d806000811461023e576040519150601f19603f3d011682016040523d82523d6000602084013e610243565b606091505b509092509050610258603f60608901356109ce565b5a1161026057fe5b90969095509350505050565b60008061037f84848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061037992507fdd8f4b70b0f4393e889bd39128a30628a78b61816a9eb8199759e7a349657e4891506102dc905060208a018a6107e4565b6102ec60408b0160208c016107e4565b60408b013560608c013560808d013561030860a08f018f610945565b6040516103169291906109f0565b6040805191829003822060208301989098526001600160a01b0396871690820152949093166060850152608084019190915260a083015260c082015260e081019190915261010001604051602081830303815290604052805190602001206103ea565b9061043e565b9050608085013560008061039660208901896107e4565b6001600160a01b03166001600160a01b03168152602001908152602001600020541480156103e157506103cc60208601866107e4565b6001600160a01b0316816001600160a01b0316145b95945050505050565b60006104386103f7610462565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b92915050565b600080600061044d8585610589565b9150915061045a816105cf565b509392505050565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161480156104bb57507f000000000000000000000000000000000000000000000000000000000000000046145b156104e557507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6000808251604114156105c05760208301516040840151606085015160001a6105b487828585610720565b945094505050506105c8565b506000905060025b9250929050565b60008160048111156105e3576105e3610a00565b14156105ec5750565b600181600481111561060057610600610a00565b141561064e5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610145565b600281600481111561066257610662610a00565b14156106b05760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610145565b60038160048111156106c4576106c4610a00565b141561071d5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610145565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561075757506000905060036107db565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156107ab573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166107d4576000600192509250506107db565b9150600090505b94509492505050565b6000602082840312156107f657600080fd5b81356001600160a01b038116811461080d57600080fd5b9392505050565b60008060006040848603121561082957600080fd5b833567ffffffffffffffff8082111561084157600080fd5b9085019060c0828803121561085557600080fd5b9093506020850135908082111561086b57600080fd5b818601915086601f83011261087f57600080fd5b81358181111561088e57600080fd5b8760208285010111156108a057600080fd5b6020830194508093505050509250925092565b60005b838110156108ce5781810151838201526020016108b6565b838111156108dd576000848401525b50505050565b8215158152604060208201526000825180604084015261090a8160608501602087016108b3565b601f01601f1916919091016060019392505050565b6000821982111561094057634e487b7160e01b600052601160045260246000fd5b500190565b6000808335601e1984360301811261095c57600080fd5b83018035915067ffffffffffffffff82111561097757600080fd5b6020019150368190038213156105c857600080fd5b8284823760609190911b6bffffffffffffffffffffffff19169101908152601401919050565b600082516109c48184602087016108b3565b9190910192915050565b6000826109eb57634e487b7160e01b600052601260045260246000fd5b500490565b8183823760009101908152919050565b634e487b7160e01b600052602160045260246000fdfea26469706673582212202a7ef875d67f649117889cb60cd02a7889dbfa87af108817fa68a1f893e9c4fc64736f6c63430008090033";

type MinimalForwarderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MinimalForwarderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MinimalForwarder__factory extends ContractFactory {
  constructor(...args: MinimalForwarderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MinimalForwarder> {
    return super.deploy(overrides || {}) as Promise<MinimalForwarder>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MinimalForwarder {
    return super.attach(address) as MinimalForwarder;
  }
  override connect(signer: Signer): MinimalForwarder__factory {
    return super.connect(signer) as MinimalForwarder__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MinimalForwarderInterface {
    return new utils.Interface(_abi) as MinimalForwarderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MinimalForwarder {
    return new Contract(address, _abi, signerOrProvider) as MinimalForwarder;
  }
}