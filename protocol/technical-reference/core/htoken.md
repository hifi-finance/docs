---
id: htoken
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

The unique BalanceSheet associated with this HToken.

#### Return Values

| Type | Description            |
| :--- | :--------------------- |
|      | BalanceSheet contract. |

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

The Erc20 underlying, or target, asset for this HToken.

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
    uint256 hTokenAmount
) external
```

Pays the token holder the face value after maturation.

Emits a {Redeem} event.

Requirements:

- Must be called after maturation.
- The amount to redeem cannot be zero.
- There must be enough liquidity in the contract.

#### Parameters

| Name           | Type    | Description                                               |
| :------------- | :------ | :-------------------------------------------------------- |
| `hTokenAmount` | uint256 | The amount of hTokens to redeem for the underlying asset. |

### supplyUnderlying

```solidity
function supplyUnderlying(
    uint256 underlyingAmount
) external
```

Mints hTokens by supplying an equivalent amount of underlying.

Emits a {SupplyUnderlying} event.

Requirements:

- The amount to supply cannot be zero.
- The caller must have allowed this contract to spend `underlyingAmount` tokens.

#### Parameters

| Name               | Type    | Description                         |
| :----------------- | :------ | :---------------------------------- |
| `underlyingAmount` | uint256 | The amount of underlying to supply. |

### \_setBalanceSheet

```solidity
function _setBalanceSheet(
    contract IBalanceSheetV1 newBalanceSheet
) external
```

Updates the address of the BalanceSheet contract.

Throws a {SetBalanceSheet} event.

Requirements:

- The caller must be the owner.

#### Parameters

| Name              | Type                     | Description                                   |
| :---------------- | :----------------------- | :-------------------------------------------- |
| `newBalanceSheet` | contract IBalanceSheetV1 | The address of the new BalanceSheet contract. |

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
    uint256 hTokenAmount,
    uint256 underlyingAmount
  )
```

Emitted when hTokens are redeemed.

#### Parameters

| Name               | Type    | Description                               |
| :----------------- | :------ | :---------------------------------------- |
| `account`          | address | The account redeeming the hTokens.        |
| `hTokenAmount`     | uint256 | The amount of redeemed hTokens.           |
| `underlyingAmount` | uint256 | The amount of received underlying tokens. |

### SetBalanceSheet

```solidity
  event SetBalanceSheet(
    address owner,
    contract IBalanceSheetV1 oldBalanceSheet,
    contract IBalanceSheetV1 newBalanceSheet
  )
```

Emitted when the BalanceSheet is set.

#### Parameters

| Name              | Type                     | Description                          |
| :---------------- | :----------------------- | :----------------------------------- |
| `owner`           | address                  | The address of the owner.            |
| `oldBalanceSheet` | contract IBalanceSheetV1 | The address of the old BalanceSheet. |
| `newBalanceSheet` | contract IBalanceSheetV1 | The address of the new BalanceSheet. |

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
