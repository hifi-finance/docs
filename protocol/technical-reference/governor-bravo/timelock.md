---
id: timelock
title: Timelock
sidebar_position: 3
---

# Timelock

The Timelock contract is a vital component in decentralized governance, controlling each protocol contract and facilitating secure, transparent updates to system parameters, logic, and contracts. It operates through a "time-delayed, opt-out" upgrade pattern, allowing stakeholders ample time to review proposed changes and react accordingly. The Timelock contract, which has a hard-coded minimum delay, queues and executes proposals that have successfully passed a Governance vote, ensuring trust and transparency in the decision-making process.

## Constant Functions

### delay

```solidity
function delay() external returns (uint256)
```

The duration of the time after which a transaction can be executed.

### queuedTransactions

```solidity
function queuedTransactions(
    bytes32 hash
) external returns (bool)
```

Get the details about a queued transaction.

#### Parameters

| Name   | Type    | Description                           |
| :----- | :------ | :------------------------------------ |
| `hash` | bytes32 | The hash of the transaction to check. |

### GRACE_PERIOD

```solidity
function GRACE_PERIOD() external returns (uint256)
```

The duration of the time after the transaction is available to be executed, but before it expires.

## Non-Constant Functions

### acceptAdmin

```solidity
function acceptAdmin() public
```

Allows the pending admin to accept the admin role.

### cancelTransaction

```solidity
function cancelTransaction(
    address target,
    uint256 value,
    string signature,
    bytes data,
    uint256 eta
) public
```

Cancel a queued transaction.

#### Parameters

| Name        | Type    | Description                                                         |
| :---------- | :------ | :------------------------------------------------------------------ |
| `target`    | address | The target address of the contract which will be called.            |
| `value`     | uint256 | The amount of ETH to send with the transaction.                     |
| `signature` | string  | The signature of the function to be called.                         |
| `data`      | bytes   | The data that will be passed to the function.                       |
| `eta`       | uint256 | The timestamp of when the transaction will be available to execute. |

### executeTransaction

```solidity
function executeTransaction(
    address target,
    uint256 value,
    string signature,
    bytes data,
    uint256 eta
) public returns (bytes)
```

Execute a queued transaction.

#### Parameters

| Name        | Type    | Description                                                         |
| :---------- | :------ | :------------------------------------------------------------------ |
| `target`    | address | The target address of the contract which will be called.            |
| `value`     | uint256 | The amount of ETH to send with the transaction.                     |
| `signature` | string  | The signature of the function to be called.                         |
| `data`      | bytes   | The data that will be passed to the function.                       |
| `eta`       | uint256 | The timestamp of when the transaction will be available to execute. |

### queueTransaction

```solidity
function queueTransaction(
    address target,
    uint256 value,
    string signature,
    bytes data,
    uint256 eta
) public returns (bytes32)
```

Queue a transaction for future execution.

#### Parameters

| Name        | Type    | Description                                                         |
| :---------- | :------ | :------------------------------------------------------------------ |
| `target`    | address | The target address of the contract which will be called.            |
| `value`     | uint256 | The amount of ETH to send with the transaction.                     |
| `signature` | string  | The signature of the function to be called.                         |
| `data`      | bytes   | The data that will be passed to the function.                       |
| `eta`       | uint256 | The timestamp of when the transaction will be available to execute. |

### setDelay

```solidity
function setDelay(
    uint256 delay_
) public
```

Set the delay for the timelock.

#### Parameters

| Name     | Type    | Description                     |
| :------- | :------ | :------------------------------ |
| `delay_` | uint256 | The new delay that will be set. |

### setPendingAdmin

```solidity
function setPendingAdmin(
    address pendingAdmin_
) public
```

Set the address of the pending admin.

#### Parameters

| Name            | Type    | Description                             |
| :-------------- | :------ | :-------------------------------------- |
| `pendingAdmin_` | address | The new pending admin that will be set. |

## Events

### CancelTransaction

```solidity
event CancelTransaction(
    bytes32 txHash,
    address target,
    uint256 value,
    string signature,
    bytes data,
    uint256 eta
)
```

Emitted when timelock admin cancel the transaction.

#### Parameters

| Name        | Type    | Description                                                            |
| :---------- | :------ | :--------------------------------------------------------------------- |
| `txHash`    | bytes32 | The hash of the transaction that was canceled.                         |
| `target`    | address | The target contract address that contains the logic that was canceled. |
| `value`     | uint256 | The amount of ether meant to be transferred to the target contract.    |
| `signature` | string  | The signature of the function canceled.                                |
| `data`      | bytes   | The data passed to the function that was canceled.                     |
| `eta`       | uint256 | The timestamp after which the transaction was able to be canceled.     |

### ExecuteTransaction

```solidity
event ExecuteTransaction(
    bytes32 txHash,
    address target,
    uint256 value,
    string signature,
    bytes data,
    uint256 eta
)
```

Emitted when transaction is executed.

#### Parameters

| Name        | Type    | Description                                                            |
| :---------- | :------ | :--------------------------------------------------------------------- |
| `txHash`    | bytes32 | The hash of the transaction that was executed.                         |
| `target`    | address | The target contract address that contains the logic that was executed. |
| `value`     | uint256 | The amount of ether transferred to the target contract.                |
| `signature` | string  | The signature of the function executed.                                |
| `data`      | bytes   | The data passed to the function that was executed.                     |
| `eta`       | uint256 | The timestamp after which the transaction was able to be executed.     |

### NewAdmin

```solidity
event NewAdmin(
    address newAdmin
)
```

Emitted when there is a change in admin.

#### Parameters

| Name       | Type    | Description                 |
| :--------- | :------ | :-------------------------- |
| `newAdmin` | address | The new admin that was set. |

### NewDelay

```solidity
event NewDelay(
    uint256 newDelay
)
```

Emitted when new delay is set.

#### Parameters

| Name       | Type    | Description                 |
| :--------- | :------ | :-------------------------- |
| `newDelay` | uint256 | The new delay that was set. |

### NewPendingAdmin

```solidity
event NewPendingAdmin(
    address newPendingAdmin
)
```

Emitted when pending admin is set.

#### Parameters

| Name              | Type    | Description                         |
| :---------------- | :------ | :---------------------------------- |
| `newPendingAdmin` | address | The new pending admin that was set. |

### QueueTransaction

```solidity
event QueueTransaction(
    bytes32 txHash,
    address target,
    uint256 value,
    string signature,
    bytes data,
    uint256 eta
)
```

Emitted when transaction is queued.

#### Parameters

| Name        | Type    | Description                                                         |
| :---------- | :------ | :------------------------------------------------------------------ |
| `txHash`    | bytes32 | The hash of the transaction that was queued.                        |
| `target`    | address | The target contract address that contains the logic to be executed. |
| `value`     | uint256 | The amount of ether to transfer to the target contract.             |
| `signature` | string  | The signature of the function to be executed.                       |
| `data`      | bytes   | The data to be passed to the function to be executed.               |
| `eta`       | uint256 | The timestamp after which the transaction can be executed.          |
