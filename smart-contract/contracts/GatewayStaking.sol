// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import { IGatewayStaking } from "./interfaces/IGatewayStaking.sol";
import { ParameterizedAccessControl } from "./ParameterizedAccessControl.sol";
import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC4626 } from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract GatewayStaking is IGatewayStaking, ParameterizedAccessControl, UUPSUpgradeable {
   mapping(address => uint) _lastDepositTimestamp;
   
   constructor(ERC20 asset_, string memory name_, string memory symbol_) ERC4626(asset_) ERC20(name_, symbol_) {
      _disableInitializers();
   }

   function initialize(address owner) initializer public {
      _superAdmins[owner] = true;
   }

   function depositStake(uint256 assests) public override returns(uint256) {
      // Deposit stake using ERC-4626 deposit method
      require(assests > 0, "Must deposit assets to receive shares");
      return deposit(assests, msg.sender);
   }

   function withdrawStake(uint256 shares) public override returns (uint256) {
      // checks
      require(shares > 0, "Must burn shares to receive assets");

      // Redeem stake using ERC-4626 redeem method
      return redeem(shares, msg.sender, msg.sender);
   }

   function deposit(uint256 assets, address) public override returns (uint256) {
    _lastDepositTimestamp[msg.sender] = block.timestamp;
    return super.deposit(assets, msg.sender);
   }

   function redeem(uint256 shares, address, address) public override returns (uint256) {
      // check if time lock has expired
      uint256 lastDepositTimestamp = _lastDepositTimestamp[msg.sender];
      if (block.timestamp < lastDepositTimestamp + DEPOSIT_TIMELOCK_TIME) {
         revert GatewayStaking_Withdrawal_Locked(lastDepositTimestamp, lastDepositTimestamp + DEPOSIT_TIMELOCK_TIME);
      }

      return super.redeem(shares, msg.sender, msg.sender);
   }

   function setMinimumGatekeeperStake (uint256 minStakeAmount) public override onlySuperAdmin {
      GLOBAL_MIN_GATEKEEPER_STAKE = minStakeAmount;
   }

   function hasMinimumGatekeeperStake(address staker) public view override returns(bool) {
      return ERC20(address(this)).balanceOf(staker) >= GLOBAL_MIN_GATEKEEPER_STAKE;
   }

   /**
    * @dev These overrides can be removed once this contract is upgradeble
    */
   function _msgSender() internal view override(Context,ContextUpgradeable) returns (address) {
      return Context._msgSender();
   }

   function _msgData() internal view override(Context,ContextUpgradeable) returns (bytes calldata) {
      return Context._msgData();
   }

   function _authorizeUpgrade(address) internal override onlySuperAdmin {}
}