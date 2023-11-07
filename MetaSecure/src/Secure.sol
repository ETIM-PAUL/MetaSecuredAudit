// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract StorageVictim {
    address immutable owner;

    struct Storage {
        address user;
        uint256 amount;
    }

    mapping(address => Storage) storages;

    constructor() {
        owner = msg.sender;
    }

    function store(uint256 amount) external {
        Storage memory str;

        str.user = msg.sender;

        str.amount = amount;

        storages[msg.sender] = str;
    }

    function getStore() external view returns (address, uint256) {
        Storage storage str = storages[msg.sender];

        return (str.user, str.amount);
    }

    function getOwner() external view returns (address) {
        return owner;
    }
}
