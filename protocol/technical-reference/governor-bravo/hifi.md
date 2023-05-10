---
id: hifi
title: HIFI
sidebar_position: 2
---

# HIFI

HIFI is an ERC-20 token enabling its owners to assign voting rights to any address, even their own. Alterations in an owner's token balance automatically modify the delegate's voting rights, ensuring a dynamic, transparent, and responsive Hifi Governance process for the Hifi Finance community.

## Constant Functions

### allowance

```solidity
function allowance(
    address account,
    address spender
) external returns (uint256)
```

Get the number of tokens `spender` is approved to spend on behalf of `account`

#### Parameters

| Name      | Type    | Description                                   |
| :-------- | :------ | :-------------------------------------------- |
| `account` | address | The address of the account holding the funds  |
| `spender` | address | The address of the account spending the funds |

#### Return Values

| Name  | Type    | Description                   |
| :---- | :------ | :---------------------------- |
| `[0]` | uint256 | The number of tokens approved |

### balanceOf

```solidity
function balanceOf(
    address account
) external returns (uint256)
```

Get the number of tokens held by the `account`

#### Parameters

| Name      | Type    | Description                                      |
| :-------- | :------ | :----------------------------------------------- |
| `account` | address | The address of the account to get the balance of |

#### Return Values

| Name  | Type    | Description               |
| :---- | :------ | :------------------------ |
| `[0]` | uint256 | The number of tokens held |

### getCurrentVotes

```solidity
function getCurrentVotes(
    address account
) external returns (uint96)
```

Gets the current votes balance for `account`

#### Parameters

| Name      | Type    | Description                      |
| :-------- | :------ | :------------------------------- |
| `account` | address | The address to get votes balance |

#### Return Values

| Name  | Type   | Description                               |
| :---- | :----- | :---------------------------------------- |
| `[0]` | uint96 | The number of current votes for `account` |

### getPriorVotes

```solidity
function getPriorVotes(
    address account,
    uint256 blockNumber
) public returns (uint96)
```

Determine the prior number of votes for an account as of a block number. The block number must be a finalized block or else this function will revert to prevent misinformation.

#### Parameters

| Name          | Type    | Description                                 |
| :------------ | :------ | :------------------------------------------ |
| `account`     | address | The address of the account to check         |
| `blockNumber` | uint256 | The block number to get the vote balance at |

#### Return Values

| Name  | Type   | Description                                               |
| :---- | :----- | :-------------------------------------------------------- |
| `[0]` | uint96 | The number of votes the account had as of the given block |

### totalSupply

Get the total number of tokens in existence

```solidity
function totalSupply() external returns (uint256)
```

## Non-Constant Functions

### approve

```solidity
function approve(
    address spender,
    uint256 rawAmount
) external returns (bool)
```

Approve `spender` to transfer up to `rawAmount` from `msg.sender`. This will overwrite the approval amount for `spender`
and is subject to issues noted [here](https://eips.ethereum.org/EIPS/eip-20#approve)

#### Parameters

| Name        | Type    | Description                                                     |
| :---------- | :------ | :-------------------------------------------------------------- |
| `spender`   | address | The address of the account which may transfer tokens            |
| `rawAmount` | uint256 | The number of tokens that are approved (2^256-1 means infinite) |

#### Return Values

| Name  | Type | Description                           |
| :---- | :--- | :------------------------------------ |
| `[0]` | bool | Whether or not the approval succeeded |

### burn

```solidity
function burn(
    uint256 rawAmount
) external
```

Destroys `rawAmount` tokens from the caller

#### Parameters

| Name        | Type    | Description                  |
| :---------- | :------ | :--------------------------- |
| `rawAmount` | uint256 | The number of tokens to burn |

### burnFrom

```solidity
function burnFrom(
    address account,
    uint256 rawAmount
) external
```

Destroys `rawAmount` tokens from `account`, deducting from the caller's allowance

#### Parameters

| Name        | Type    | Description                             |
| :---------- | :------ | :-------------------------------------- |
| `account`   | address | The address of the account to burn from |
| `rawAmount` | uint256 | The number of tokens to burn            |

### delegate

```solidity
function delegate(
    address delegatee
) public
```

Delegate votes from `msg.sender` to `delegatee`

#### Parameters

| Name        | Type    | Description                      |
| :---------- | :------ | :------------------------------- |
| `delegatee` | address | The address to delegate votes to |

### delegateBySig

```solidity
function delegateBySig(
    address delegatee,
    uint256 nonce,
    uint256 expiry,
    uint8 v,
    bytes32 r,
    bytes32 s
) public
```

Delegates votes from signatory to `delegatee`

#### Parameters

| Name        | Type    | Description                                        |
| :---------- | :------ | :------------------------------------------------- |
| `delegatee` | address | The address to delegate votes to                   |
| `nonce`     | uint256 | The contract state required to match the signature |
| `expiry`    | uint256 | The time at which to expire the signature          |
| `v`         | uint8   | The recovery byte of the signature                 |
| `r`         | bytes32 | Half of the ECDSA signature pair                   |
| `s`         | bytes32 | Half of the ECDSA signature pair                   |

### mint

```solidity
function mint(
    address dst,
    uint256 rawAmount
) external
```

Mint new tokens

#### Parameters

| Name        | Type    | Description                            |
| :---------- | :------ | :------------------------------------- |
| `dst`       | address | The address of the destination account |
| `rawAmount` | uint256 | The number of tokens to be minted      |

### permit

```solidity
function permit(
    address owner,
    address spender,
    uint256 rawAmount,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
) external
```

Approve by signature. For more details, see https://eips.ethereum.org/EIPS/eip-2612.

#### Parameters

| Name        | Type    | Description                                                     |
| :---------- | :------ | :-------------------------------------------------------------- |
| `owner`     | address | The address to approve from                                     |
| `spender`   | address | The address to be approved                                      |
| `rawAmount` | uint256 | The number of tokens that are approved (2^256-1 means infinite) |
| `deadline`  | uint256 | The time at which to expire the signature                       |
| `v`         | uint8   | The recovery byte of the signature                              |
| `r`         | bytes32 | Half of the ECDSA signature pair                                |
| `s`         | bytes32 | Half of the ECDSA signature pair                                |

### setMinter

```solidity
function setMinter(
    address minter_
) external
```

Change the minter address

#### Parameters

| Name      | Type    | Description                   |
| :-------- | :------ | :---------------------------- |
| `minter_` | address | The address of the new minter |

### swap

```solidity
function swap(
    uint256 mftAmount
) external
```

Swap MFT tokens for Hifi

#### Parameters

| Name        | Type    | Description               |
| :---------- | :------ | :------------------------ |
| `mftAmount` | uint256 | The amount of MFT to swap |

### transfer

```solidity
function transfer(
    address dst,
    uint256 rawAmount
) external returns (bool)
```

Transfer `rawAmount` tokens from `msg.sender` to `dst`

#### Parameters

| Name        | Type    | Description                            |
| :---------- | :------ | :------------------------------------- |
| `dst`       | address | The address of the destination account |
| `rawAmount` | uint256 | The number of tokens to transfer       |

#### Return Values

| Name  | Type | Description                           |
| :---- | :--- | :------------------------------------ |
| `[0]` | bool | Whether or not the transfer succeeded |

### transferFrom

```solidity
function transferFrom(
    address src,
    address dst,
    uint256 rawAmount
) external returns (bool)
```

Transfer `rawAmount` tokens from `src` to `dst`

#### Parameters

| Name        | Type    | Description                            |
| :---------- | :------ | :------------------------------------- |
| `src`       | address | The address of the source account      |
| `dst`       | address | The address of the destination account |
| `rawAmount` | uint256 | The number of tokens to transfer       |

#### Return Values

| Name  | Type | Description                           |
| :---- | :--- | :------------------------------------ |
| `[0]` | bool | Whether or not the transfer succeeded |

## Events

### Approval

```solidity
event Approval(
    address owner,
    address spender,
    uint256 amount
)
```

The standard EIP-20 approval event

#### Parameters

| Name      | Type    | Description                                     |
| :-------- | :------ | :---------------------------------------------- |
| `owner`   | address | The address of the account that owns the tokens |
| `spender` | address | The address of the account to spend the tokens  |
| `amount`  | uint256 | The number of tokens approved to spend          |

### DelegateChanged

```solidity
event DelegateChanged(
    address delegator,
    address fromDelegate,
    address toDelegate
)
```

An event thats emitted when an account changes its delegate

#### Parameters

| Name           | Type    | Description                       |
| :------------- | :------ | :-------------------------------- |
| `delegator`    | address | The address which delegated votes |
| `fromDelegate` | address | The previous address delegated to |
| `toDelegate`   | address | The new address delegated to      |

### DelegateVotesChanged

```solidity
event DelegateVotesChanged(
    address delegate,
    uint256 previousBalance,
    uint256 newBalance
)
```

An event thats emitted when a delegate account's vote balance changes

#### Parameters

| Name              | Type    | Description                                  |
| :---------------- | :------ | :------------------------------------------- |
| `delegate`        | address | The address that delegated votes are cast to |
| `previousBalance` | uint256 | The previous balance of votes for `delegate` |
| `newBalance`      | uint256 | The new balance of votes for `delegate`      |

### MinterChanged

```solidity
event MinterChanged(
    address minter,
    address newMinter
)
```

An event thats emitted when the minter address is changed

#### Parameters

| Name        | Type    | Description                        |
| :---------- | :------ | :--------------------------------- |
| `minter`    | address | The address of the previous minter |
| `newMinter` | address | The address of the new minter      |

### Swap

```solidity
event Swap(
    address sender,
    uint256 mftAmount,
    uint256 hifiAmount
)
```

An event thats emitted when MFT tokens are swapped for HIFI

#### Parameters

| Name         | Type    | Description                 |
| :----------- | :------ | :-------------------------- |
| `sender`     | address | The address of the sender   |
| `mftAmount`  | uint256 | The amount of MFT swapped   |
| `hifiAmount` | uint256 | The amount of HIFI received |

### Transfer

```solidity
event Transfer(
    address from,
    address to,
    uint256 amount
)
```

The standard EIP-20 transfer event

#### Parameters

| Name     | Type    | Description                 |
| :------- | :------ | :-------------------------- |
| `from`   | address | The address of the sender   |
| `to`     | address | The address of the receiver |
| `amount` | uint256 | The amount of tokens sent   |
