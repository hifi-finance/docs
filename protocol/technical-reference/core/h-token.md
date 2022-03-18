---
id: h-token
title: HToken
sidebar_position: 4
---

# HToken

Zero-coupon bond that tracks an ERC-20 underlying asset.

## Constant Functions

### balanceSheet

```solidity
function balanceSheet() external returns (contract IBalanceSheetV1)
```

Returns the BalanceSheet contract this HToken is connected to.

### getDepositorBalance

```solidity
function getDepositorBalance() external returns (uint256 amount)
```

Returns the balance of the given depositor.

### fintroller

```solidity
function fintroller() external returns (contract IFintroller)
```

Returns the Fintroller contract this HToken is connected to.

### isMatured

```solidity
function isMatured() external returns (bool)
```

Checks if the bond matured.

#### Return Values

| Type | Description                               |
| :--- | :---------------------------------------- |
| bool | true = bond matured, otherwise it didn't. |

### maturity

```solidity
function maturity() external returns (uint256)
```

Unix timestamp in seconds for when this HToken matures.

### totalUnderlyingReserve

```solidity
function totalUnderlyingReserve() external returns (uint256)
```

The amount of underlying redeemable after maturation.

### underlying

```solidity
function underlying() external returns (contract IErc20)
```

The Erc20 underlying asset for this HToken.

### underlyingPrecisionScalar

```solidity
function underlyingPrecisionScalar() external returns (uint256)
```

The ratio between normalized precision (1e18) and the underlying precision.

## Non-Constant Functions

### burn

```solidity
function burn(
    address holder,
    uint256 burnAmount
) external
```

Destroys `burnAmount` tokens from `holder`, reducing the token supply.

Emits a {Burn} and a {Transfer} event.

Requirements:

- Can only be called by the BalanceSheet contract.

#### Parameters

| Name         | Type    | Description                        |
| :----------- | :------ | :--------------------------------- |
| `holder`     | address | The account whose hTokens to burn. |
| `burnAmount` | uint256 | The amount of hTokens to burn.     |

### depositUnderlying

```solidity
function depositUnderlying(
    uint256 underlyingAmount
) external
```

Deposits underlying in exchange for an equivalent amount of hTokens.
Emits a {DepositUnderlying} event.

Requirements:

- The Fintroller must allow this action to be performed.
- The underlying amount to deposit cannot be zero.
- The caller must have allowed this contract to spend `underlyingAmount` tokens.

#### Parameters

| Name               | Type    | Description                          |
| :----------------- | :------ | :----------------------------------- |
| `underlyingAmount` | uint256 | The amount of underlying to deposit. |

### mint

```solidity
function mint(
    address beneficiary,
    uint256 mintAmount
) external
```

Prints new tokens into existence and assigns them to `beneficiary`, increasing the total supply.

Emits a {Mint} and a {Transfer} event.

Requirements:

- Can only be called by the BalanceSheet contract.

#### Parameters

| Name          | Type    | Description                                    |
| :------------ | :------ | :--------------------------------------------- |
| `beneficiary` | address | The account to mint the hTokens for.           |
| `mintAmount`  | uint256 | The amount of hTokens to print into existence. |

### redeem

```solidity
function redeem(
    uint256 underlyingAmount
) external
```

Pays the token holder the face value after maturation.

Emits a {Redeem} event.

Requirements:

- Can only be called after maturation.
- The amount of underlying to redeem cannot be zero.
- There must be enough liquidity in the contract.

#### Parameters

| Name           | Type    | Description                                               |
| :------------- | :------ | :-------------------------------------------------------- |
| `hTokenAmount` | uint256 | The amount of hTokens to redeem for the underlying asset. |

### \_setBalanceSheet

```solidity
function _setBalanceSheet(
    contract IBalanceSheetV2 newBalanceSheet
) external
```

Updates the BalanceSheet contract this HToken is connected to.
Throws a {SetBalanceSheet} event.
Requirements:

- The caller must be the owner.

#### Parameters

| Name              | Type                     | Description                                   |
| :---------------- | :----------------------- | :-------------------------------------------- |
| `newBalanceSheet` | contract IBalanceSheetV2 | The address of the new BalanceSheet contract. |

### withdrawUnderlying

```solidity
function withdrawUnderlying(
    uint256 underlyingAmount
) external
```

Withdraws underlying in exchange for hTokens.

Emits a {WithdrawUnderlying} event.

Requirements:

- The underlying amount to withdraw cannot be zero.
- Can only be called before maturation.

#### Parameters

| Name               | Type    | Description                           |
| :----------------- | :------ | :------------------------------------ |
| `underlyingAmount` | uint256 | The amount of underlying to withdraw. |

## Events

### Burn

```solidity
  event Burn(
    address holder,
    uint256 burnAmount
  )
```

Emitted when tokens are burnt.

#### Parameters

| Name         | Type    | Description                 |
| :----------- | :------ | :-------------------------- |
| `holder`     | address | The address of the holder.  |
| `burnAmount` | uint256 | The amount of burnt tokens. |

### Mint

```solidity
  event Mint(
    address beneficiary,
    uint256 mintAmount
  )
```

Emitted when tokens are minted.

#### Parameters

| Name          | Type    | Description                  |
| :------------ | :------ | :--------------------------- |
| `beneficiary` | address | The address of the holder.   |
| `mintAmount`  | uint256 | The amount of minted tokens. |

### Redeem

```solidity
event Redeem(
    address account,
    uint256 underlyingAmount,
    uint256 hTokenAmount
)
```

Emitted when underlying is redeemed.

#### Parameters

| Name               | Type    | Description                           |
| :----------------- | :------ | :------------------------------------ |
| `account`          | address | The account redeeming the underlying. |
| `underlyingAmount` | uint256 | The amount of redeemed underlying.    |
| `hTokenAmount`     | uint256 | The amount of provided hTokens.       |

### SetBalanceSheet

```solidity
event SetBalanceSheet(
    address owner,
    contract IBalanceSheetV2 oldBalanceSheet,
    contract IBalanceSheetV2 newBalanceSheet
)
```

Emitted when the BalanceSheet is set.

#### Parameters

| Name              | Type                     | Description                          |
| :---------------- | :----------------------- | :----------------------------------- |
| `owner`           | address                  | The address of the owner.            |
| `oldBalanceSheet` | contract IBalanceSheetV2 | The address of the old BalanceSheet. |
| `newBalanceSheet` | contract IBalanceSheetV2 | The address of the new BalanceSheet. |

### SupplyUnderlying

```solidity
  event SupplyUnderlying(
    address account,
    uint256 underlyingAmount,
    uint256 hTokenAmount
  )
```

Emitted when underlying is supplied in exchange for an equivalent amount of hTokens.

#### Parameters

| Name               | Type    | Description                        |
| :----------------- | :------ | :--------------------------------- |
| `account`          | address | The account supplying underlying.  |
| `underlyingAmount` | uint256 | The amount of supplied underlying. |
| `hTokenAmount`     | uint256 | The amount of minted hTokens.      |

### WithdrawUnderlying

```solidity
event WithdrawUnderlying(
    address depositor,
    uint256 underlyingAmount,
    uint256 hTokenAmount
)
```

Emitted when a depositor withdraws previously deposited underlying.

#### Parameters

| Name               | Type    | Description                         |
| :----------------- | :------ | :---------------------------------- |
| `depositor`        | address | The address of the depositor.       |
| `underlyingAmount` | uint256 | The amount of withdrawn underlying. |
| `hTokenAmount`     | uint256 | The amount of minted hTokens.       |
