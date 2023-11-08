// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;
import "./CustodialWallet.sol";

interface CustodialInterface {
    function deployWallet(uint256 salt) external returns (CustodialWallet);

    function hasAnAccountAndReturn() external view returns (address);
}
