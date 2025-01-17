// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ParameterizedAccessControl } from "./ParameterizedAccessControl.sol";
import {BitMask} from "./library/BitMask.sol";
import { IGatewayNetwork } from "./interfaces/IGatewayNetwork.sol";
import { IGatewayGatekeeper } from './interfaces/IGatewayGatekeeper.sol';
import { IGatewayStaking } from './interfaces/IGatewayStaking.sol';
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Common__MissingAccount} from "./library/CommonErrors.sol";

contract GatewayNetwork is ParameterizedAccessControl, IGatewayNetwork, UUPSUpgradeable {
    using BitMask for uint256;
    using SafeERC20 for IERC20;

    bytes32 public constant NETWORK_FEE_PAYER_ROLE = keccak256("NETWORK_FEE_PAYER_ROLE");

    mapping(bytes32 => GatekeeperNetworkData) public _networks;
    mapping(bytes32 => uint256) public networkFeeBalances;
    mapping(bytes32 => address) private _nextPrimaryAuthoritys;

    address private _gatewayGatekeeperContractAddress;
    address private _gatewayGatekeeperStakingContractAddress;

    modifier onlyPrimaryNetworkAuthority(bytes32 networkName) {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        require(msg.sender == _networks[networkName].primaryAuthority, "Only the primary authority can perform this action");
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    // empty constructor in line with the UUPS upgradeable proxy pattern
    // solhint-disable-next-line no-empty-blocks
    constructor() {
        _disableInitializers();
    }

    function initialize(address owner, address gatewayGatekeeperContractAddress, address gatewayStakingContractAddress) initializer public {
        if (owner == address(0)) revert Common__MissingAccount();
        _superAdmins[owner] = true;

        // Allow contract deployer to set NETWORK_FEE_PAYER_ROLE role
        _grantRole(DEFAULT_ADMIN_ROLE, 0, owner);
        _setRoleAdmin(NETWORK_FEE_PAYER_ROLE, 0, DEFAULT_ADMIN_ROLE);

        if (gatewayGatekeeperContractAddress == address(0)) revert Common__MissingAccount();
        if (gatewayStakingContractAddress == address(0)) revert Common__MissingAccount();

        _gatewayGatekeeperContractAddress = gatewayGatekeeperContractAddress;
        _gatewayGatekeeperStakingContractAddress = gatewayStakingContractAddress;
   }
   
    function createNetwork(GatekeeperNetworkData calldata network) external override {
        bytes32 networkName = network.name;

        require(networkName != bytes32(0), "Network name cannot be an empty string");
        require(network.primaryAuthority != address(0), "Network primary authority cannot be zero address");
        // Check if network name already exist. If it does throw and error
        if(_networks[networkName].primaryAuthority != address(0)) {
            revert GatewayNetworkAlreadyExists(string(abi.encodePacked(networkName)));
        }

        // Check fees
        require(network.networkFee.issueFee <= MAX_FEE_BPS, "Issue fee must be below 100%");
        require(network.networkFee.refreshFee <= MAX_FEE_BPS, "Refresh fee must be below 100%");
        require(network.networkFee.expireFee <= MAX_FEE_BPS, "Expiration fee must be below 100%");
        require(network.networkFee.freezeFee <= MAX_FEE_BPS, "Freeze fee must be below 100%");
        
        _networks[networkName] = network;
        _networks[networkName].lastFeeUpdateTimestamp = block.timestamp;
         // reset gatekeeper list so that primary authority can add gatekeepers manually
        _networks[networkName].gatekeepers = new address[](0);


        emit GatekeeperNetworkCreated(network.primaryAuthority, networkName, network.passExpireDurationInSeconds);
    } 

    function transferNetworkFees(uint256 feeAmount, bytes32 networkName, address tokenSender) external payable override onlyRole(NETWORK_FEE_PAYER_ROLE, 0) {
        // Check
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");

        address feeToken = _networks[networkName].supportedToken;

        // Interaction

        // If network fees are paid in native ETH
        if(feeToken == address(0)) {
            require(feeAmount == msg.value, "The feeAmount in native eth must equal the eth sent in msg.value");
            networkFeeBalances[networkName] += feeAmount;
        } else {
            require(msg.value == 0, "No eth can be transferred for fees in ERC-20");
            // Effect
            networkFeeBalances[networkName] += feeAmount;

            IERC20 token = IERC20(feeToken);
            token.safeTransferFrom(tokenSender, address(this), feeAmount);
        }
    }

    function withdrawNetworkFees(bytes32 networkName) external payable override onlyPrimaryNetworkAuthority(networkName) {
        address feeToken = _networks[networkName].supportedToken;
        uint256 feeBalance = networkFeeBalances[networkName];
        
        //Check
        require(feeBalance > 0, "Network does not have any fees to withdraw");

        // Effect
        networkFeeBalances[networkName] = 0;

        //Interaction 

        // If networks fees are paid in ETH
        if(feeToken == address(0)) {
            (bool success, ) = payable(_networks[networkName].primaryAuthority).call{value: feeBalance}("");
            if (!success) {
                revert GatewayNetwork__TransferFailed(feeBalance);
            }
        } else {
            IERC20 token = IERC20(feeToken);
            token.safeTransfer(_networks[networkName].primaryAuthority, feeBalance);
        }
    }

    function closeNetwork(bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName) {
        require(_networks[networkName].gatekeepers.length == 0, "Network can only be removed if no gatekeepers are in it");
        require(networkFeeBalances[networkName] == 0, "Network has fees that need to be withdrawn");

        delete _networks[networkName];
        delete _nextPrimaryAuthoritys[networkName];

        emit GatekeeperNetworkDeleted(networkName);
    }

    function addGatekeeper(address gatekeeper, bytes32 networkName) public override onlyPrimaryNetworkAuthority(networkName){
        require(gatekeeper != address(0), "Zero address cannot be added as a gatekeeper");
        bool isAlreadyGatekeeper = isGateKeeper(networkName, gatekeeper);

        if(isAlreadyGatekeeper) {
            revert GatewayNetworkGatekeeperAlreadyExists(string(abi.encodePacked(networkName)), gatekeeper);
        }

        bool hasMinimumStake = IGatewayStaking(_gatewayGatekeeperStakingContractAddress).hasMinimumGatekeeperStake(gatekeeper);

        require(hasMinimumStake, "Address does not meet the minimum stake requirements of the gateway protocol");

        GatekeeperNetworkData storage networkData = _networks[networkName];

        require(networkData.gatekeepers.length <= 20, "Gateway network cannot have more than 21 gatekeepers");
  
        networkData.gatekeepers.push(gatekeeper);

        IGatewayGatekeeper(_gatewayGatekeeperContractAddress).initializeGatekeeperNetworkData(networkName, gatekeeper, IGatewayGatekeeper.GatekeeperStatus.ACTIVE);
        emit GatekeeperNetworkGatekeeperAdded(gatekeeper);
    }

    function addGatekeepers(address[] memory gatekeepers, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName){
        for(uint i = 0; i < gatekeepers.length; i++) {
            addGatekeeper(gatekeepers[i], networkName);
        }
    }

    function removeGatekeeper(address gatekeeper, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName){
        bool isAlreadyGatekeeper = isGateKeeper(networkName, gatekeeper);

        if(!isAlreadyGatekeeper) {
            revert GatewayNetworkGatekeeperDoesNotExists(string(abi.encodePacked(networkName)), gatekeeper);
        }

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
        
        IGatewayGatekeeper(_gatewayGatekeeperContractAddress).removeGatekeeper(networkName, gatekeeper);
        emit GatekeeperNetworkGatekeeperRemoved(gatekeeper);
    }

    // Two transactions are required to transfer the primary authority of a network
    // Tx 1: The current primary authority submits a transaction setting the new primary authority
    // Tx 2: The new primary authority must accept the update (this helps prevent misconfiguring the primary authority of a network)
    function updatePrimaryAuthority(address newPrimaryAuthortiy, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName) {
        require(newPrimaryAuthortiy != address(0), "Primary authority cannot be set to the zero address");
        _nextPrimaryAuthoritys[networkName] = newPrimaryAuthortiy;
    } 

    function updateGatekeeperStatus(address gatekeeper, bytes32 networkName, IGatewayGatekeeper.GatekeeperStatus status) external override onlyPrimaryNetworkAuthority(networkName) {
        require(isGateKeeper(networkName, gatekeeper), "Address is not a gatekeeper for the requested network");
        IGatewayGatekeeper(_gatewayGatekeeperContractAddress).updateGatekeeperStatus(networkName, gatekeeper, status);
    }

    function claimPrimaryAuthority(bytes32 networkName) external override {
        require(msg.sender == _nextPrimaryAuthoritys[networkName], "Can only claim authority on a network if given permission by the current primary authority");

        _networks[networkName].primaryAuthority = msg.sender;

        _nextPrimaryAuthoritys[networkName] = address(0);
    } 

    function updatePassExpirationTime(uint newExpirationTimeInSeconds, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName) {
        _networks[networkName].passExpireDurationInSeconds = newExpirationTimeInSeconds;
    }

    function updateNetworkFeatures(uint256 newFeatureMask, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName) {
        _networks[networkName].networkFeatureMask = newFeatureMask;
    }

    function updateFees(NetworkFeesBps calldata fees, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName) {
        // checks 
        require(fees.issueFee <= MAX_FEE_BPS, "Issue fee must be below 100%");
        require(fees.refreshFee <= MAX_FEE_BPS, "Refresh fee must be below 100%");
        require(fees.expireFee <= MAX_FEE_BPS, "Expiration fee must be below 100%");
        require(fees.freezeFee <= MAX_FEE_BPS, "Freeze fee must be below 100%");


        uint lastFeeUpdateTimestamp = _networks[networkName].lastFeeUpdateTimestamp;

        if(lastFeeUpdateTimestamp != 0 && block.timestamp < lastFeeUpdateTimestamp + FEE_CONFIG_DELAY_TIME) {
            revert GatewayNetwork_Fee_Cannot_Be_Updated_Yet(lastFeeUpdateTimestamp, lastFeeUpdateTimestamp + FEE_CONFIG_DELAY_TIME);
        }

        _networks[networkName].networkFee = fees;
        _networks[networkName].lastFeeUpdateTimestamp = block.timestamp;
    }
    
    function updateDescription(bytes calldata description, bytes32 networkName) external override onlyPrimaryNetworkAuthority(networkName) {
        _networks[networkName].description = description;
    }

    function resetNetworkFeeUpdateTime(bytes32 networkName) external override onlySuperAdmin {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        _networks[networkName].lastFeeUpdateTimestamp = 0;
    }

    function networkHasFeature(bytes32 networkName, NetworkFeature feature) public view override returns (bool) {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        return _networks[networkName].networkFeatureMask.checkBit(uint8(feature));
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

    function getGatekeepersOnNetwork(bytes32 networkName) public view returns(address[] memory) {
        require(_networks[networkName].primaryAuthority != address(0), "Network does not exist");
        return _networks[networkName].gatekeepers;
    }

    function _authorizeUpgrade(address) internal override onlySuperAdmin {}
}