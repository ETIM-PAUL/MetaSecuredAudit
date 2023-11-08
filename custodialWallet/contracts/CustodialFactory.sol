// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./CustodialWallet.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";

/// @notice Factory contract to deploy user smart wallets. Expected to be passed the bytecode of the user
///         smart wallet
contract CustodialFactory {
    IEntryPoint public immutable entryPoint;
    mapping(address => CustodialWallet) public userWallet;
    mapping(address => bool) public userWalletExist;

    constructor(IEntryPoint _entryPoint) {
        entryPoint = _entryPoint;
    }

    function deployWallet(uint256 salt) external returns (CustodialWallet) {
        address walletAddress = computeAddress(salt);

        // Determine if a wallet is already deployed at this address, if so return that
        uint256 codeSize = walletAddress.code.length;
        if (codeSize > 0) {
            return CustodialWallet(payable(walletAddress));
        } else {
            // Deploy the wallet
            CustodialWallet wallet = new CustodialWallet{salt: bytes32(salt)}(
                entryPoint,
                msg.sender
            );
            return wallet;
        }
    }

    /// @notice Deterministically compute the address of a smart wallet using Create2
    function computeAddress(uint256 salt) public view returns (address) {
        return
            Create2.computeAddress(
                bytes32(salt),
                keccak256(
                    abi.encodePacked(
                        type(CustodialWallet).creationCode,
                        abi.encode(entryPoint, msg.sender)
                    )
                )
            );
    }

    function hasAnAccountAndReturn()
        external
        view
        returns (CustodialWallet userAccount)
    {
        require(userWalletExist[msg.sender] == true, "No Account Found");
        userAccount = userWallet[msg.sender];
    }
}
