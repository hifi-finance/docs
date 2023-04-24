---
id: hifi
title: HIFI
sidebar_position: 2
---

# HIFI

HIFI is an ERC-20 token that empowers its holders to delegate voting rights to any address, including their own.

Any changes to a token holder's balance result in an automatic adjustment of the voting rights allocated to the delegated address.

This mechanism ensures that the Hifi Governance process remains dynamic, transparent, and responsive to the needs of the Hifi Finance community.

## Variables

### allowances

- Type: `mapping(address => mapping(address => uint96))`
- Visibility: `internal`

Allowance amounts on behalf of others.

### balances

- Type: `mapping(address => uint96)`
- Visibility: `internal`

Official record of token balances for each account.

### delegates

- Type: `mapping(address => address)`
- Visibility: `public`

A record of each account's delegate.

### DOMAIN_TYPEHASH

- Type: `bytes32`
- Visibility: `public`

The EIP-712 typehash for the contract's domain.

### mft

- Type: `IERC20`
- Visibility: `public`

The MFT token contract.

### minter

- Type: `address`
- Visibility: `public`

Address which may mint new tokens.

### name

- Type: `string`
- Visibility: `public`

EIP-20 token name for this token.

### nonces

- Type: `mapping(address => uint256)`
- Visibility: `public`

A record of states for signing / validating signatures.

### numCheckpoints

- Type: `mapping(address => uint32)`
- Visibility: `public`

The number of checkpoints for each account.

### PERMIT_TYPEHASH

- Type: `bytes32`
- Visibility: `public`

The EIP-712 typehash for the permit struct used by the contract.

### symbol

- Type: `string`
- Visibility: `public`

EIP-20 token symbol for this token.

### swapRatio

- Type: `uint8`
- Visibility: `public`

Hifi to MFT token swap ratio.

### totalSupply

- Type: `uint256`
- Visibility: `public`

Total number of tokens in circulation.

### DELEGATION_TYPEHASH

- Type: `bytes32`
- Visibility: `public`

The EIP-712 typehash for the delegation struct used by the contract.

### decimals

- Type: `uint8`
- Visibility: `public`

EIP-20 token decimals for this token.

### checkpoints

- Type: `mapping(address => mapping(uint32 => Checkpoint))`
- Visibility: `public`

A record of votes checkpoints for each account, by index.

### Checkpoint

- Type: `struct`
- Visibility: `internal`

A checkpoint for marking number of votes from a given block.

## Constant Functions

### allowance

```solidity
function allowance(address account, address spender) external view returns (uint256)
```

Get the number of tokens `spender` is approved to spend on behalf of `account`

#### Parameters

| Name    | Type    | Description                                   |
| ------- | ------- | --------------------------------------------- |
| account | address | The address of the account holding the funds  |
| spender | address | The address of the account spending the funds |

#### Return Values

| Name | Type    | Description                   |
| ---- | ------- | ----------------------------- |
| [0]  | uint256 | The number of tokens approved |

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```

Get the number of tokens held by the `account`.

### getCurrentVotes

```solidity
function getCurrentVotes(address account) external view returns (uint96)
```

Gets the current votes balance for `account`.

#### Parameters

| Name    | Type    | Description                      |
| ------- | ------- | -------------------------------- |
| account | address | The address to get votes balance |

#### Return Values

| Name | Type   | Description                               |
| ---- | ------ | ----------------------------------------- |
| [0]  | uint96 | The number of current votes for `account` |

#### Parameters

| Name    | Type    | Description                                      |
| ------- | ------- | ------------------------------------------------ |
| account | address | The address of the account to get the balance of |

#### Return Values

| Name | Type    | Description               |
| ---- | ------- | ------------------------- |
| [0]  | uint256 | The number of tokens held |

### getPriorVotes

```solidity
function getPriorVotes(address account, uint256 blockNumber) public view returns (uint96)
```

Determine the prior number of votes for an account as of a block number

_Block number must be a finalized block or else this function will revert to prevent misinformation._

#### Parameters

| Name        | Type    | Description                                 |
| ----------- | ------- | ------------------------------------------- |
| account     | address | The address of the account to check         |
| blockNumber | uint256 | The block number to get the vote balance at |

#### Return Values

| Name | Type   | Description                                               |
| ---- | ------ | --------------------------------------------------------- |
| [0]  | uint96 | The number of votes the account had as of the given block |

## Non-Constant Functions

### approve

```solidity
function approve(address spender, uint256 rawAmount) external returns (bool)
```

Approve `spender` to transfer up to `amount` from `src`

_This will overwrite the approval amount for `spender`
and is subject to issues noted [here](https://eips.ethereum.org/EIPS/eip-20#approve)_

#### Parameters

| Name      | Type    | Description                                                     |
| --------- | ------- | --------------------------------------------------------------- |
| spender   | address | The address of the account which may transfer tokens            |
| rawAmount | uint256 | The number of tokens that are approved (2^256-1 means infinite) |

#### Return Values

| Name | Type | Description                           |
| ---- | ---- | ------------------------------------- |
| [0]  | bool | Whether or not the approval succeeded |

### burn

```solidity
function burn(uint256 rawAmount) external
```

Destroys `amount` tokens from the caller

#### Parameters

| Name      | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| rawAmount | uint256 | The number of tokens to burn |

### burnFrom

```solidity
function burnFrom(address account, uint256 rawAmount) external
```

Destroys `amount` tokens from `account`, deducting from the caller's allowance.

#### Parameters

| Name      | Type    | Description                             |
| --------- | ------- | --------------------------------------- |
| account   | address | The address of the account to burn from |
| rawAmount | uint256 | The number of tokens to burn            |

### delegate

```solidity
function delegate(address delegatee) public
```

Delegate votes from `msg.sender` to `delegatee`.
delegation by users is limited to one address at a time. The number of votes that are credited to the delegatee's vote count is proportional to the HIFI balance held by the user. Delegation starts from the current block and continues until the user delegates again or transfers their HIFI.

#### Parameters

| Name      | Type    | Description                      |
| --------- | ------- | -------------------------------- |
| delegatee | address | The address to delegate votes to |

### delegateBySig

```solidity
function delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s) public
```

Delegates votes from signatory to `delegatee`.

#### Parameters

| Name      | Type    | Description                                        |
| --------- | ------- | -------------------------------------------------- |
| delegatee | address | The address to delegate votes to                   |
| nonce     | uint256 | The contract state required to match the signature |
| expiry    | uint256 | The time at which to expire the signature          |
| v         | uint8   | The recovery byte of the signature                 |
| r         | bytes32 | Half of the ECDSA signature pair                   |
| s         | bytes32 | Half of the ECDSA signature pair                   |

### mint

```solidity
function mint(address dst, uint256 rawAmount) external
```

Mint new tokens.

#### Parameters

| Name      | Type    | Description                            |
| --------- | ------- | -------------------------------------- |
| dst       | address | The address of the destination account |
| rawAmount | uint256 | The number of tokens to be minted      |

### permit

```solidity
function permit(address owner, address spender, uint256 rawAmount, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external
```

Triggers an approval from owner to spends.

#### Parameters

| Name      | Type    | Description                                                     |
| --------- | ------- | --------------------------------------------------------------- |
| owner     | address | The address to approve from                                     |
| spender   | address | The address to be approved                                      |
| rawAmount | uint256 | The number of tokens that are approved (2^256-1 means infinite) |
| deadline  | uint256 | The time at which to expire the signature                       |
| v         | uint8   | The recovery byte of the signature                              |
| r         | bytes32 | Half of the ECDSA signature pair                                |
| s         | bytes32 | Half of the ECDSA signature pair                                |

### setMinter

```solidity
function setMinter(address minter_) external
```

Change the minter address.

#### Parameters

| Name     | Type    | Description                   |
| -------- | ------- | ----------------------------- |
| minter\_ | address | The address of the new minter |

### swap

```solidity
function swap(uint256 mftAmount) external
```

### transfer

```solidity
function transfer(address dst, uint256 rawAmount) external returns (bool)
```

Transfer `amount` tokens from `msg.sender` to `dst`.

#### Parameters

| Name      | Type    | Description                            |
| --------- | ------- | -------------------------------------- |
| dst       | address | The address of the destination account |
| rawAmount | uint256 | The number of tokens to transfer       |

#### Return Values

| Name | Type | Description                           |
| ---- | ---- | ------------------------------------- |
| [0]  | bool | Whether or not the transfer succeeded |

### transferFrom

```solidity
function transferFrom(address src, address dst, uint256 rawAmount) external returns (bool)
```

Transfer `amount` tokens from `src` to `dst`.

#### Parameters

| Name      | Type    | Description                            |
| --------- | ------- | -------------------------------------- |
| src       | address | The address of the source account      |
| dst       | address | The address of the destination account |
| rawAmount | uint256 | The number of tokens to transfer       |

#### Return Values

| Name | Type | Description                           |
| ---- | ---- | ------------------------------------- |
| [0]  | bool | Whether or not the transfer succeeded |

## Events

### Approval

```solidity
event Approval(address owner, address spender, uint256 amount)
```

The standard EIP-20 approval.

### DelegateChanged

```solidity
event DelegateChanged(address delegator, address fromDelegate, address toDelegate)
```

An event thats emitted when an account changes its delegate.

### DelegateVotesChanged

```solidity
event DelegateVotesChanged(address delegate, uint256 previousBalance, uint256 newBalance)
```

An event thats emitted when a delegate account's vote balance changes.

### MinterChanged

```solidity
event MinterChanged(address minter, address newMinter)
```

An event thats emitted when the minter address is changed.

### Swap

```solidity
event Swap(address sender, uint256 mftAmount, uint256 hifiAmount)
```

An event thats emitted when an MFT token is swapped for HIFI.

### Transfer

```solidity
event Transfer(address from, address to, uint256 amount)
```

The standard EIP-20 transfer event.
