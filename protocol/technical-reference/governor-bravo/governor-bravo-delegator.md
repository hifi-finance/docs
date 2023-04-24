---
id: governor-bravo-delegator
title: Governor Bravo Delegator
sidebar_position: 5
---

# Governor Bravo Delegator

Hifi Finance's GovernorBravoDelegator is a smart contract that serves as a proxy for the actual implementation of the Hifi Governance contract, known as the GovernorBravoDelegate. The delegator contract allows for the GovernorBravoDelegate implementation to be upgraded without changing the address of the proxy, allowing for upgrades while preserving user interactions with the Governance system. The GovernorBravoDelegator contract is responsible for managing proposals, holding governance tokens, and facilitating voting on proposals. It also allows for delegation of voting power, which is an important feature of the Hifi Governance system.

## Variables

### admin

- Type: `address`
- Visibility: `public`

Administrator for this contract.

### implementation

- Type: `address`
- Visibility: `public`

The address of the current implementation contract. The implementation contract contains the actual implementation logic for the governor, and can be updated by the admin through the \_setImplementation() function. When a function is called on the governor, the call is delegated to the implementation contract to execute the logic.

### pendingAdmin

- Type: `address`
- Visibility: `public`

Pending administrator for this contract.

## Non-Constant Functions

```solidity
function _setImplementation(address implementation_) public
```

Called by the admin to update the implementation of the delegator

#### Parameters

| Name             | Type    | Description                                          |
| ---------------- | ------- | ---------------------------------------------------- |
| implementation\_ | address | The address of the new implementation for delegation |

## Events

### NewImplementation

```solidity
event NewImplementation(address oldImplementation, address newImplementation)
```

Emitted when implementation is changed.
