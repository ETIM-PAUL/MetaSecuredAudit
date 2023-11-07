## Metasecure Audit Report


| Contract Name: StorageVictim      | Version: 0.4.23         |
| --------------------------------- | ----------------------- |
| **Audit Performed By: Etim Paul** | **Date: 08/11/23**      |
| **No. of contracts: 1**           | **No. of Functions: 3** |

## Findings

### VULNERABILITY:  CRITICAL

#### i. Uninitialised Pointer Vulnerability:
 In Solidity, local variables that are declared with a storage location and not initialized, are assigned an unpredictable storage slot by the compiler. This can lead to unexpected behavior of the contract, especially if the uninitialized variable is later assigned a value or used in a contract function.
 Now in the contract, based on the state variable definition order, the address owner is in the first slot, hence the str.user will be slot(0).
#### Recommended Change:
Initialize the str to `Storage memory str;` in the store function


### VULNERABILITY:  MEDIUM
#### ii. Old Compiler Version:
The contract uses an outdated version of solidity which might introduce certain vulnerabilities and would not be compatible with recent versions of solidity compiler

#### Recommended Change:
Change the solidity compiler version to a more recent version.


### VULNERABILITY:  Educational
#### iii. Missing SPDX-License-Identifier
There is no definition of a license identifier, which might flag as an error in certain development environment.

#### Recommended Change:
Add a specified License identifier, you could use `unlicensed` or a specific identifier like MIT, GPL and the rest.

Not adding a license identifier in a smart contract, could result in license ambiguity, default copyright, lack of openness, etc.

### VULNERABILITY:  Educational
#### iv. Address owner could be marked `immutable`:
since address owner won't change in the contract, so the state variable can be mark as immutable. Marking it as immutable, means that it can be determined at constructor level and alss it will help in gas optimization

#### Recommended Change:
State variable `owner` should be marked as immutable.

### VULNERABILITY:  Educational
#### iv. Marking store(), getStore() and getOwner() as external functions:
since the functions are not needed inside the contract. It cost less gas calling an external function than public.

#### Recommended Change:
State variable `owner` should be marked as immutable.

## Summary

The contract has 1 critical, 1 medium and 3 low.

## Disclaimer

This audit report might not contain all the bugs. So it is advised to
perform further testing before deploying the contract to production.
