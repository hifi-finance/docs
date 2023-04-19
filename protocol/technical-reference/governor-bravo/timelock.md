---
id: timelock
title: Timelock
sidebar_position: 3
---

# Timelock

A Timelock contract serves as a crucial component for decentralized governance, ensuring that system parameters, logic, and contracts are updated securely and transparently. The Timelock contract enables a 'time-delayed, opt-out' upgrade pattern, which allows the community to review proposed changes and respond accordingly before they take effect.

Protocol contract is controlled by the Timelock, which queues and executes proposals that have successfully passed a Governance vote. The Timelock contract features a hard-coded minimum delay, representing the shortest possible notice period for a governance action. This delay ensures that stakeholders have sufficient time to review and react to the proposed changes, fostering trust and transparency in the decentralized decision-making process.

## Variables

### admin

- Type: `address`
- Visibility: `public`

The address of the current admin.

### delay

- Type: `uint256`
- Visibility: `public`

The delay period for the timelock (in seconds).

### GRACE_PERIOD

- Type: `uint256`
- Visibility: `public constant`

The grace period for executing a scheduled transaction (in seconds).

### MAXIMUM_DELAY

- Type: `uint256`
- Visibility: `public constant`

The maximum delay period allowed for the timelock (in seconds).

### MINIMUM_DELAY

- Type: `uint256`
- Visibility: `public constant`

The minimum delay period allowed for the timelock (in seconds).

### pendingAdmin

- Type: `address`
- Visibility: `public`

The address of the pending admin, who will become the admin after accepting the admin role.

### queuedTransactions

- Type: `mapping(bytes32 => bool)`
- Visibility: `public`

A mapping that stores the queued transactions, where the key is the transaction hash and the value is a boolean indicating if the transaction is queued.

## Constant Functions

### getBlockTimestamp

```solidity
function getBlockTimestamp() internal view returns (uint256)
```

Get the current block timestamp.

**Note**: This function is marked as `internal`, making it inaccessible outside of the contract.

## Non-Constant Functions

### acceptAdmin

```solidity
function acceptAdmin() public
```

Allows the pending admin to accept the admin role.

### cancelTransaction

```solidity
function cancelTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) public
```

Cancel a queued transaction.

### executeTransaction

```solidity
function executeTransaction(address target, uint256 value, string signature, bytes data, uint256 eta) public payable returns (bytes)
```

Execute a queued transaction.

### QueueTransaction

```solidity
event QueueTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)
```

Queue a transaction for future execution.

### setDelay

```solidity
function setDelay(uint256 delay_) public
```

Set the delay for the timelock.

### setPendingAdmin

```solidity
function setPendingAdmin(address pendingAdmin_) public
```

Set the address of the pending admin.

## Events

### CancelTransaction

```solidity
event CancelTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)
```

Emitted when timelock admin cancel the transaction.

### ExecuteTransaction

```solidity
event ExecuteTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)
```

Emitted when transaction is executed. 

### NewAdmin

```solidity
event NewAdmin(address newAdmin)
```

Emitted when there is a change in admin.

### NewDelay

```solidity
event NewDelay(uint256 newDelay)
```

Emitted when new delay is set.

### NewPendingAdmin

```solidity
event NewPendingAdmin(address newPendingAdmin)
```

Emitted when pending admin is set.

### QueueTransaction

```solidity
event QueueTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)
```

Emitted when transaction is queued.
