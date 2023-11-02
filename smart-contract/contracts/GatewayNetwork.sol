// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import { ParameterizedAccessControl } from "./ParameterizedAccessControl.sol";
import { IGatewayNetwork } from "./interfaces/IGatewayNetwork.sol";

contract GatewayNetwork is ParameterizedAccessControl, IGatewayNetwork {
    mapping(bytes32 => GatekeeperNetworkData) public _networks;
    mapping(bytes32 => address) private _nextPrimaryAuthoritys;

    modifier onlyPrimaryNetworkAuthority(bytes32 networkName) {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        require(msg.sender == _networks[networkName].primaryAuthority, "Only the primary authority can perform this action");
        _;
    }

    constructor() {
        // Contract deployer is the initial super admin
        _superAdmins[msg.sender] = true;
    }
   
    function createNetwork(GatekeeperNetworkData calldata network) external override onlySuperAdmin {
        bytes32 networkName = network.name;

        require(networkName != bytes32(0), "Network name cannot be an empty string");
        require(network.primaryAuthority != address(0), "Network primary authority cannot be zero address");
        // Check if network name already exist. If it does throw and error
        if(_networks[networkName].primaryAuthority != address(0)) {
            revert GatewayNetworkAlreadyExists(string(abi.encodePacked(networkName)));
        }
        
        _networks[networkName] = network;

        emit GatekeeperNetworkCreated(network.primaryAuthority, networkName, network.passExpireTimestamp);
    } 
    function closeNetwork(bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName) {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        require(_networks[networkName].gatekeepers.length == 0, "Network can only be removed if no gatekeepers are in it");

        delete _networks[networkName];

        emit GatekeeperNetworkDeleted(networkName);
    }

    function addGatekeeper(address gatekeeper, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName){
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        require(gatekeeper != address(0), "Zero address cannot be added as a gatekeeper");

        bool isAlreadyGatekeeper = isGateKeeper(networkName, gatekeeper);

        if(isAlreadyGatekeeper) {
            revert GatewayNetworkGatekeeperAlreadyExists(string(abi.encodePacked(networkName)), gatekeeper);
        }

        GatekeeperNetworkData storage networkData = _networks[networkName];
  
        networkData.gatekeepers.push(gatekeeper);
        emit GatekeeperNetworkGatekeeperAdded(gatekeeper);
    }

    function removeGatekeeper(address gatekeeper, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName){
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        bool isAlreadyGatekeeper = isGateKeeper(networkName, gatekeeper);

        if(!isAlreadyGatekeeper) {
            revert GatewayNetworkGatekeeperDoesNotExists(string(abi.encodePacked(networkName)), gatekeeper);
        }

        GatekeeperNetworkData storage networkData = _networks[networkName];
        address[] storage currentGatekeepers = _networks[networkName].gatekeepers;

        // Remove gatekeeper
        for(uint i = 0; i < currentGatekeepers.length; i++) {
            if(currentGatekeepers[i] == gatekeeper) {
                // Swap gatekeeper to be removed with last element in the array
                _networks[networkName].gatekeepers[i] = _networks[networkName].gatekeepers[currentGatekeepers.length - 1];
                // Remove last element in array
                _networks[networkName].gatekeepers.pop();
            }
        }

        emit GatekeeperNetworkGatekeeperRemoved(gatekeeper);
    }

    // Two transactions are required to transfer the primary authority of a network
    // Tx 1: The current primary authority submits a transaction setting the new primary authority
    // Tx 2: The new primary authority must accept the update (this helps prevent misconfiguring the primary authority of a network)
    function updatePrimaryAuthority(address newPrimaryAuthortiy, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName) {
        require(newPrimaryAuthortiy != address(0), "Primary authority cannot be set to the zero address");
        _nextPrimaryAuthoritys[networkName] = newPrimaryAuthortiy;
    } 

    function claimPrimaryAuthority(bytes32 networkName) external override {
        require(msg.sender == _nextPrimaryAuthoritys[networkName], "Can only claim authority on a network if given permission by the current primary authority");

        _networks[networkName].primaryAuthority = msg.sender;

        _nextPrimaryAuthoritys[networkName] = address(0);
    } 

    function updatePassExpirationTimestamp(uint newExpirationTimestamp, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName) {
        require(doesNetworkExist(uint(networkName)), "Network does not exist");
        _networks[networkName].passExpireTimestamp = newExpirationTimestamp;
    }

    function isGateKeeper(bytes32 networkName, address gatekeeper) public view override returns(bool) {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        address[] memory gatekeepers = _networks[networkName].gatekeepers;

        for(uint i = 0; i < gatekeepers.length; i++) {
            if(gatekeepers[i] == gatekeeper) {
                return true;
            }
        }
        return false;
    }

    function getNetworkId(bytes32 networkName) external view override returns(uint) {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        return uint256(networkName);
    }

    function getNetwork(uint networkId) external view override returns(GatekeeperNetworkData memory) {
        require(_networks[bytes32(networkId)].primaryAuthority != address(0), "Network does not exist");
        return _networks[bytes32(networkId)];
    }

    function doesNetworkExist(uint networkId) public view override returns(bool) {
        bytes32 networkName = bytes32(networkId);
        return _networks[networkName].primaryAuthority != address(0);
    }

    function getSupportedToken(bytes32 networkName) public view override returns(address) {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        return _networks[networkName].supportedToken;
    }

    function gatekeepersOnNetwork(bytes32 networkName) public view returns(address[] memory) {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        return _networks[networkName].gatekeepers;
    }
}