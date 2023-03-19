/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ERC3525Upgradeable,
  ERC3525UpgradeableInterface,
} from "../../../@solvprotocol/erc-3525/ERC3525Upgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "ApprovalValue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "metadataDescriptor",
        type: "address",
      },
    ],
    name: "SetMetadataDescriptor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_oldSlot",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_newSlot",
        type: "uint256",
      },
    ],
    name: "SlotChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "TransferValue",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "operator_",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "contractURI",
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
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator_",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    inputs: [],
    name: "metadataDescriptor",
    outputs: [
      {
        internalType: "contract IERC3525MetadataDescriptorUpgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator_",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved_",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "slotOf",
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
        internalType: "uint256",
        name: "slot_",
        type: "uint256",
      },
    ],
    name: "slotURI",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [],
    name: "symbol",
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
        name: "index_",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
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
        name: "owner_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index_",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
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
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
    inputs: [],
    name: "totalSupply",
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
        internalType: "uint256",
        name: "fromTokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromTokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toTokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "valueDecimals",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612c44806100206000396000f3fe6080604052600436106101615760003560e01c80634f6ccce7116100c15780639cc7f7081161007a5780639cc7f708146103a3578063a22cb465146103c3578063b88d4fde146103e3578063c87b56dd146103f6578063e345e0bc14610416578063e8a3d48514610436578063e985e9c51461044b57600080fd5b80634f6ccce7146102fb5780636352211e1461031b57806370a082311461033b578063840f71131461035b5780638cb0a5111461037b57806395d89b411461038e57600080fd5b806318160ddd1161011e57806318160ddd1461024b57806323b872dd14610260578063263f3e7e146102735780632f745c5914610293578063310ed7f0146102b35780633e7e8669146102c657806342842e0e146102e857600080fd5b806301ffc9a71461016657806306fdde031461019b578063081812fc146101bd578063095ea7b3146101f557806309c3dd871461020a5780630f485c021461022a575b600080fd5b34801561017257600080fd5b50610186610181366004612476565b61046b565b60405190151581526020015b60405180910390f35b3480156101a757600080fd5b506101b061050e565b60405161019291906124eb565b3480156101c957600080fd5b506101dd6101d83660046124fe565b6105a0565b6040516001600160a01b039091168152602001610192565b61020861020336600461252e565b6105f2565b005b34801561021657600080fd5b506101b06102253660046124fe565b610681565b61023d610238366004612558565b610782565b604051908152602001610192565b34801561025757600080fd5b5060385461023d565b61020861026e36600461258d565b6107c4565b34801561027f57600080fd5b5061023d61028e3660046124fe565b6107f5565b34801561029f57600080fd5b5061023d6102ae36600461252e565b61083d565b6102086102c13660046125b9565b6108de565b3480156102d257600080fd5b5060355460405160ff9091168152602001610192565b6102086102f636600461258d565b6108f4565b34801561030757600080fd5b5061023d6103163660046124fe565b61090f565b34801561032757600080fd5b506101dd6103363660046124fe565b6109a0565b34801561034757600080fd5b5061023d6103563660046125e5565b610a10565b34801561036757600080fd5b50603b546101dd906001600160a01b031681565b610208610389366004612558565b610a98565b34801561039a57600080fd5b506101b0610b20565b3480156103af57600080fd5b5061023d6103be3660046124fe565b610b2f565b3480156103cf57600080fd5b506102086103de36600461260e565b610b77565b6102086103f13660046126b4565b610b86565b34801561040257600080fd5b506101b06104113660046124fe565b610bb8565b34801561042257600080fd5b5061023d61043136600461275f565b610c57565b34801561044257600080fd5b506101b0610c8b565b34801561045757600080fd5b5061018661046636600461278b565b610d94565b60006001600160e01b031982166301ffc9a760e01b148061049c57506001600160e01b03198216630354d60560e61b145b806104b757506001600160e01b031982166380ac58cd60e01b145b806104d257506001600160e01b031982166370b0048160e11b145b806104ed57506001600160e01b0319821663780e9d6360e01b145b8061050857506001600160e01b03198216635b5e139f60e01b145b92915050565b60606033805461051d906127b5565b80601f0160208091040260200160405190810160405280929190818152602001828054610549906127b5565b80156105965780601f1061056b57610100808354040283529160200191610596565b820191906000526020600020905b81548152906001019060200180831161057957829003601f168201915b5050505050905090565b60006105ab82610dc6565b6000828152603960205260409020546038805490919081106105cf576105cf6127f0565b60009182526020909120600460069092020101546001600160a01b031692915050565b60006105fd826109a0565b9050806001600160a01b0316836001600160a01b0316141561063a5760405162461bcd60e51b815260040161063190612806565b60405180910390fd5b336001600160a01b038216148061065657506106568133610d94565b6106725760405162461bcd60e51b815260040161063190612848565b61067c8383610dee565b505050565b6060600061069a60408051602081019091526000815290565b603b549091506001600160a01b03166106fa5760008151116106cb576040518060200160405280600081525061077b565b806106d584610e85565b6040516020016106e69291906128a1565b60405160208183030381529060405261077b565b603b54604051633601bfc560e11b8152600481018590526001600160a01b0390911690636c037f8a906024015b60006040518083038186803b15801561073f57600080fd5b505afa158015610753573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261077b91908101906128e1565b9392505050565b600061078f338584610f22565b600061079a85610fb2565b90506107b184826107aa886107f5565b6000610fbc565b6107bc8582856110e3565b949350505050565b6107ce3382611395565b6107ea5760405162461bcd60e51b815260040161063190612958565b61067c8383836113fd565b600061080082610dc6565b600082815260396020526040902054603880549091908110610824576108246127f0565b9060005260206000209060060201600101549050919050565b600061084883610a10565b82106108a15760405162461bcd60e51b815260206004820152602260248201527f455243333532353a206f776e657220696e646578206f7574206f6620626f756e604482015261647360f01b6064820152608401610631565b6001600160a01b0383166000908152603a602052604090208054839081106108cb576108cb6127f0565b9060005260206000200154905092915050565b6108e9338483610f22565b61067c8383836110e3565b61067c83838360405180602001604052806000815250610b86565b600061091a60385490565b82106109745760405162461bcd60e51b815260206004820152602360248201527f455243333532353a20676c6f62616c20696e646578206f7574206f6620626f756044820152626e647360e81b6064820152608401610631565b60388281548110610987576109876127f0565b9060005260206000209060060201600001549050919050565b60006109ab82610dc6565b6000828152603960205260409020546038805490919081106109cf576109cf6127f0565b60009182526020909120600360069092020101546001600160a01b0316905080610a0b5760405162461bcd60e51b8152600401610631906129aa565b919050565b60006001600160a01b038216610a7c5760405162461bcd60e51b815260206004820152602b60248201527f455243333532353a2062616c616e636520717565727920666f7220746865207a60448201526a65726f206164647265737360a81b6064820152608401610631565b506001600160a01b03166000908152603a602052604090205490565b6000610aa3846109a0565b9050806001600160a01b0316836001600160a01b03161415610ad75760405162461bcd60e51b815260040161063190612806565b336001600160a01b0382161480610af35750610af38133610d94565b610b0f5760405162461bcd60e51b815260040161063190612848565b610b1a84848461155e565b50505050565b60606034805461051d906127b5565b6000610b3a82610dc6565b600082815260396020526040902054603880549091908110610b5e57610b5e6127f0565b9060005260206000209060060201600201549050919050565b610b82338383611696565b5050565b610b903383611395565b610bac5760405162461bcd60e51b815260040161063190612958565b610b1a84848484611761565b6060610bc382610dc6565b6000610bda60408051602081019091526000815290565b603b549091506001600160a01b0316610c26576000815111610c0b576040518060200160405280600081525061077b565b80610c1584610e85565b6040516020016106e69291906129dd565b603b546040516344a5a61760e11b8152600481018590526001600160a01b039091169063894b4c2e90602401610727565b6000610c6283610dc6565b5060009182526037602090815260408084206001600160a01b0393909316845291905290205490565b60606000610ca460408051602081019091526000815290565b603b549091506001600160a01b0316610d04576000815111610cd55760405180602001604052806000815250610d8e565b80610cdf306117d4565b604051602001610cf0929190612a0c565b604051602081830303815290604052610d8e565b603b60009054906101000a90046001600160a01b03166001600160a01b031663725fa09c6040518163ffffffff1660e01b815260040160006040518083038186803b158015610d5257600080fd5b505afa158015610d66573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d8e91908101906128e1565b91505090565b6001600160a01b039182166000908152603a602090815260408083209390941682526002909201909152205460ff1690565b610dcf816117ea565b610deb5760405162461bcd60e51b8152600401610631906129aa565b50565b600081815260396020526040902054603880548492908110610e1257610e126127f0565b6000918252602090912060069091020160040180546001600160a01b0319166001600160a01b0392831617905581908316610e4c826109a0565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60606000610e9283611836565b600101905060008167ffffffffffffffff811115610eb257610eb2612645565b6040519080825280601f01601f191660200182016040528015610edc576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610f1557610f1a565b610ee6565b509392505050565b6000610f2e8385610c57565b9050610f3a8484611395565b158015610f4957506000198114155b15610b1a5781811015610f9e5760405162461bcd60e51b815260206004820152601f60248201527f455243333532353a20696e73756666696369656e7420616c6c6f77616e6365006044820152606401610631565b610b1a8385610fad8585612a66565b61155e565b600061050861190e565b6001600160a01b03841661101c5760405162461bcd60e51b815260206004820152602160248201527f455243333532353a206d696e7420746f20746865207a65726f206164647265736044820152607360f81b6064820152608401610631565b826110735760405162461bcd60e51b815260206004820152602160248201527f455243333532353a2063616e6e6f74206d696e74207a65726f20746f6b656e496044820152601960fa1b6064820152608401610631565b61107c836117ea565b156110c95760405162461bcd60e51b815260206004820152601d60248201527f455243333532353a20746f6b656e20616c7265616479206d696e7465640000006044820152606401610631565b6110d4848484611925565b6110de83826119eb565b610b1a565b6110ec836117ea565b6111485760405162461bcd60e51b815260206004820152602760248201527f455243333532353a207472616e736665722066726f6d20696e76616c696420746044820152661bdad95b88125160ca1b6064820152608401610631565b611151826117ea565b6111ab5760405162461bcd60e51b815260206004820152602560248201527f455243333532353a207472616e7366657220746f20696e76616c696420746f6b604482015264195b88125160da1b6064820152608401610631565b6000838152603960205260408120546038805490919081106111cf576111cf6127f0565b9060005260206000209060060201905060006038603960008681526020019081526020016000205481548110611207576112076127f0565b90600052602060002090600602019050828260020154101561127e5760405162461bcd60e51b815260206004820152602a60248201527f455243333532353a20696e73756666696369656e742062616c616e636520666f60448201526939103a3930b739b332b960b11b6064820152608401610631565b80600101548260010154146112ec5760405162461bcd60e51b815260206004820152602e60248201527f455243333532353a207472616e7366657220746f20746f6b656e20776974682060448201526d191a5999995c995b9d081cdb1bdd60921b6064820152608401610631565b828260020160008282546113009190612a66565b925050819055508281600201600082825461131b9190612a7d565b9091555050604051838152849086907f0b2aac84f3ec956911fd78eae5311062972ff949f38412e8da39069d9f068cc69060200160405180910390a361137285858560405180602001604052806000815250611a70565b61138e5760405162461bcd60e51b815260040161063190612a95565b5050505050565b60006113a082610dc6565b60006113ab836109a0565b9050806001600160a01b0316846001600160a01b031614806113d257506113d28185610d94565b806107bc5750836001600160a01b03166113eb846105a0565b6001600160a01b031614949350505050565b826001600160a01b0316611410826109a0565b6001600160a01b0316146114725760405162461bcd60e51b8152602060048201526024808201527f455243333532353a207472616e736665722066726f6d20696e76616c6964206f6044820152633bb732b960e11b6064820152608401610631565b6001600160a01b0382166114d65760405162461bcd60e51b815260206004820152602560248201527f455243333532353a207472616e7366657220746f20746865207a65726f206164604482015264647265737360d81b6064820152608401610631565b60006114e1826107f5565b905060006114ee83610b2f565b90506114fb600084610dee565b61150483611c16565b61150e8584611cb2565b6115188484611dd3565b82846001600160a01b0316866001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461138e565b6001600160a01b0382166115c75760405162461bcd60e51b815260206004820152602a60248201527f455243333532353a20617070726f76652076616c756520746f20746865207a65604482015269726f206164647265737360b01b6064820152608401610631565b6115d18284611e5c565b611637576000838152603960205260409020546038805490919081106115f9576115f96127f0565b60009182526020808320600692909202909101600501805460018101825590835291200180546001600160a01b0319166001600160a01b0384161790555b60008381526037602090815260408083206001600160a01b038616808552908352928190208490555183815285917f621b050de0ad08b51d19b48b3e6df75348c4de6bdd93e81b252ca62e28265b1b91015b60405180910390a3505050565b816001600160a01b0316836001600160a01b031614156116f85760405162461bcd60e51b815260206004820152601a60248201527f455243333532353a20617070726f766520746f2063616c6c65720000000000006044820152606401610631565b6001600160a01b038381166000818152603a602090815260408083209487168084526002909501825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319101611689565b61176c8484846113fd565b61177884848484611f30565b610b1a5760405162461bcd60e51b815260206004820152602760248201527f455243333532353a207472616e7366657220746f206e6f6e204552433732315260448201526632b1b2b4bb32b960c91b6064820152608401610631565b60606105086001600160a01b03831660146120fd565b60385460009015801590610508575060008281526039602052604090205460388054849290811061181d5761181d6127f0565b9060005260206000209060060201600001541492915050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106118755772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef810000000083106118a1576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106118bf57662386f26fc10000830492506010015b6305f5e10083106118d7576305f5e100830492506008015b61271083106118eb57612710830492506004015b606483106118fd576064830492506002015b600a83106105085760010192915050565b600061191e603680546001019055565b5060365490565b6040805160c081018252838152602080820184905260008284018190526001600160a01b038716606084015260808301819052835181815291820190935260a0820152905061197381612299565b61197d8484611dd3565b60405183906001600160a01b038616906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a4816000847fe4f48c240d3b994948aa54f3e2f5fca59263dfe1d52b6e4cf39a5d249b5ccb6560405160405180910390a450505050565b600082815260396020526040902054603880548392908110611a0f57611a0f6127f0565b90600052602060002090600602016002016000828254611a2f9190612a7d565b909155505060405181815282906000907f0b2aac84f3ec956911fd78eae5311062972ff949f38412e8da39069d9f068cc69060200160405180910390a35050565b600080611a7c856109a0565b90506001600160a01b0381163b15158015611b1457506040516301ffc9a760e01b81526001600160a01b038216906301ffc9a790611ac490629ce20b60e01b90600401612add565b60206040518083038186803b158015611adc57600080fd5b505afa158015611af0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b149190612af2565b15611c0a57604051629ce20b60e01b81526001600160a01b03821690629ce20b90611b4b9033908a908a908a908a90600401612b0f565b602060405180830381600087803b158015611b6557600080fd5b505af1925050508015611b95575060408051601f3d908101601f19168201909252611b9291810190612b4d565b60015b611bef573d808015611bc3576040519150601f19603f3d011682016040523d82523d6000602084013e611bc8565b606091505b508051611be75760405162461bcd60e51b815260040161063190612a95565b805181602001fd5b6001600160e01b031916629ce20b60e01b1491506107bc9050565b50600195945050505050565b600081815260396020526040812054603880549091908110611c3a57611c3a6127f0565b600091825260208220600560069092020190810154909250905b81811015610b1a576000836005018281548110611c7357611c736127f0565b60009182526020808320909101548783526037825260408084206001600160a01b03909216845291528120555080611caa81612b6a565b915050611c54565b600081815260396020526040812054603880549091908110611cd657611cd66127f0565b6000918252602080832060069290920290910160030180546001600160a01b0319166001600160a01b039485161790559184168152603a909152604081208054909190611d2590600190612a66565b90506000826000018281548110611d3e57611d3e6127f0565b90600052602060002001549050600083600101600086815260200190815260200160002054905081846000018281548110611d7b57611d7b6127f0565b60009182526020808320909101929092558381526001860190915260408082208390558682528120558354849080611db557611db5612b85565b60019003818190600052602060002001600090559055505050505050565b600081815260396020526040902054603880548492908110611df757611df76127f0565b6000918252602080832060069290920290910160030180546001600160a01b0319166001600160a01b03948516179055939091168152603a80845260408083208054858552600182810188529285208190559286529082018155825292902090910155565b600081815260396020526040812054603880548392908110611e8057611e806127f0565b6000918252602082206005600690920201015491505b81811015611f2557600084815260396020526040902054603880546001600160a01b03881692908110611ecb57611ecb6127f0565b90600052602060002090600602016005018281548110611eed57611eed6127f0565b6000918252602090912001546001600160a01b03161415611f1357600192505050610508565b80611f1d81612b6a565b915050611e96565b506000949350505050565b60006001600160a01b0384163b15158015611fc957506040516301ffc9a760e01b81526001600160a01b038516906301ffc9a790611f7990630a85bd0160e11b90600401612add565b60206040518083038186803b158015611f9157600080fd5b505afa158015611fa5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fc99190612af2565b156120f557604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290612000903390899088908890600401612b9b565b602060405180830381600087803b15801561201a57600080fd5b505af192505050801561204a575060408051601f3d908101601f1916820190925261204791810190612b4d565b60015b6120db573d808015612078576040519150601f19603f3d011682016040523d82523d6000602084013e61207d565b606091505b508051611be75760405162461bcd60e51b815260206004820152602660248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201526531b2b4bb32b960d11b6064820152608401610631565b6001600160e01b031916630a85bd0160e11b1490506107bc565b5060016107bc565b6060600061210c836002612bd8565b612117906002612a7d565b67ffffffffffffffff81111561212f5761212f612645565b6040519080825280601f01601f191660200182016040528015612159576020820181803683370190505b509050600360fc1b81600081518110612174576121746127f0565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106121a3576121a36127f0565b60200101906001600160f81b031916908160001a90535060006121c7846002612bd8565b6121d2906001612a7d565b90505b600181111561224a576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612206576122066127f0565b1a60f81b82828151811061221c5761221c6127f0565b60200101906001600160f81b031916908160001a90535060049490941c9361224381612bf7565b90506121d5565b50831561077b5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610631565b603880548251600090815260396020908152604080832084905560018401855593909152835160069092027f38395c5dceade9603479b177b68959049485df8aa97b39f3533039af5f4561998101928355818501517f38395c5dceade9603479b177b68959049485df8aa97b39f3533039af5f45619a820155928401517f38395c5dceade9603479b177b68959049485df8aa97b39f3533039af5f45619b84015560608401517f38395c5dceade9603479b177b68959049485df8aa97b39f3533039af5f45619c840180546001600160a01b039283166001600160a01b03199182161790915560808601517f38395c5dceade9603479b177b68959049485df8aa97b39f3533039af5f45619d8601805491909316911617905560a084015180518594610b1a937f38395c5dceade9603479b177b68959049485df8aa97b39f3533039af5f45619e90910192019082805482825590600052602060002090810192821561243b579160200282015b8281111561243b57825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190612406565b5061244792915061244b565b5090565b5b80821115612447576000815560010161244c565b6001600160e01b031981168114610deb57600080fd5b60006020828403121561248857600080fd5b813561077b81612460565b60005b838110156124ae578181015183820152602001612496565b83811115610b1a5750506000910152565b600081518084526124d7816020860160208601612493565b601f01601f19169290920160200192915050565b60208152600061077b60208301846124bf565b60006020828403121561251057600080fd5b5035919050565b80356001600160a01b0381168114610a0b57600080fd5b6000806040838503121561254157600080fd5b61254a83612517565b946020939093013593505050565b60008060006060848603121561256d57600080fd5b8335925061257d60208501612517565b9150604084013590509250925092565b6000806000606084860312156125a257600080fd5b6125ab84612517565b925061257d60208501612517565b6000806000606084860312156125ce57600080fd5b505081359360208301359350604090920135919050565b6000602082840312156125f757600080fd5b61077b82612517565b8015158114610deb57600080fd5b6000806040838503121561262157600080fd5b61262a83612517565b9150602083013561263a81612600565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561268457612684612645565b604052919050565b600067ffffffffffffffff8211156126a6576126a6612645565b50601f01601f191660200190565b600080600080608085870312156126ca57600080fd5b6126d385612517565b93506126e160208601612517565b925060408501359150606085013567ffffffffffffffff81111561270457600080fd5b8501601f8101871361271557600080fd5b80356127286127238261268c565b61265b565b81815288602083850101111561273d57600080fd5b8160208401602083013760006020838301015280935050505092959194509250565b6000806040838503121561277257600080fd5b8235915061278260208401612517565b90509250929050565b6000806040838503121561279e57600080fd5b6127a783612517565b915061278260208401612517565b600181811c908216806127c957607f821691505b602082108114156127ea57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b60208082526022908201527f455243333532353a20617070726f76616c20746f2063757272656e74206f776e60408201526132b960f11b606082015260800190565b60208082526039908201527f455243333532353a20617070726f76652063616c6c6572206973206e6f74206f6040820152781ddb995c881b9bdc88185c1c1c9bdd995908199bdc88185b1b603a1b606082015260800190565b600083516128b3818460208801612493565b64736c6f742f60d81b90830190815283516128d5816005840160208801612493565b01600501949350505050565b6000602082840312156128f357600080fd5b815167ffffffffffffffff81111561290a57600080fd5b8201601f8101841361291b57600080fd5b80516129296127238261268c565b81815285602083850101111561293e57600080fd5b61294f826020830160208601612493565b95945050505050565b60208082526032908201527f455243333532353a207472616e736665722063616c6c6572206973206e6f74206040820152711bdddb995c881b9bdc88185c1c1c9bdd995960721b606082015260800190565b602080825260199082015278115490cccd4c8d4e881a5b9d985b1a59081d1bdad95b881251603a1b604082015260600190565b600083516129ef818460208801612493565b835190830190612a03818360208801612493565b01949350505050565b60008351612a1e818460208801612493565b68636f6e74726163742f60b81b9083019081528351612a44816009840160208801612493565b01600901949350505050565b634e487b7160e01b600052601160045260246000fd5b600082821015612a7857612a78612a50565b500390565b60008219821115612a9057612a90612a50565b500190565b60208082526028908201527f455243333532353a207472616e7366657220746f206e6f6e20455243333532356040820152672932b1b2b4bb32b960c11b606082015260800190565b6001600160e01b031991909116815260200190565b600060208284031215612b0457600080fd5b815161077b81612600565b60018060a01b038616815284602082015283604082015282606082015260a060808201526000612b4260a08301846124bf565b979650505050505050565b600060208284031215612b5f57600080fd5b815161077b81612460565b6000600019821415612b7e57612b7e612a50565b5060010190565b634e487b7160e01b600052603160045260246000fd5b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612bce908301846124bf565b9695505050505050565b6000816000190483118215151615612bf257612bf2612a50565b500290565b600081612c0657612c06612a50565b50600019019056fea26469706673582212203e7d90dcf2c349f9965f68141883ca6faad776e6b3b3d5a4fe6e9cd037a8853764736f6c63430008090033";

type ERC3525UpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC3525UpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC3525Upgradeable__factory extends ContractFactory {
  constructor(...args: ERC3525UpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC3525Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC3525Upgradeable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC3525Upgradeable {
    return super.attach(address) as ERC3525Upgradeable;
  }
  override connect(signer: Signer): ERC3525Upgradeable__factory {
    return super.connect(signer) as ERC3525Upgradeable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC3525UpgradeableInterface {
    return new utils.Interface(_abi) as ERC3525UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC3525Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC3525Upgradeable;
  }
}