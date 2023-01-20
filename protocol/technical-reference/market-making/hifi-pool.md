---
id: hifi-pool
title: Hifi Pool
sidebar_position: 1
---

# Hifi Pool

Dedicated AMM for market-making hTokens, based on the [Yield Space](https://yield.is/YieldSpace.pdf) design.

## Constant Functions

### getQuoteForBuyingHToken

```solidity
function getQuoteForBuyingHToken(
    uint256 hTokenOut
) external returns (uint256 underlyingIn)
```

Quotes how much underlying would be required to buy `hTokenOut` hToken.

Requirements:

- Cannot be called after maturity.

#### Parameters

| Name        | Type    | Description                                 |
| :---------- | :------ | :------------------------------------------ |
| `hTokenOut` | uint256 | The hypothetical amount of hTokens to sell. |

#### Return Values

| Name           | Type    | Description                                     |
| :------------- | :------ | :---------------------------------------------- |
| `underlyingIn` | uint256 | The hypothetical amount of underlying required. |

### getQuoteForBuyingUnderlying

```solidity
function getQuoteForBuyingUnderlying(
    uint256 underlyingOut
) external returns (uint256 hTokenIn)
```

Quotes how many hTokens would be required to buy `underlyingOut` underlying.

Requirements:

- Cannot be called after maturity.

#### Parameters

| Name            | Type    | Description                                    |
| :-------------- | :------ | :--------------------------------------------- |
| `underlyingOut` | uint256 | The hypothetical amount of underlying desired. |

#### Return Values

| Name       | Type    | Description                                  |
| :--------- | :------ | :------------------------------------------- |
| `hTokenIn` | uint256 | The hypothetical amount of hTokens required. |

### getMintInputs

```solidity
function getMintInputs(
    uint256 underlyingOffered
) external returns (uint256 hTokenRequired, uint256 poolTokensMinted)
```

Calculates how many hTokens would be required and how many LP tokens would be issued for a given
amount of underlying invested.

#### Parameters

| Name                | Type    | Description                               |
| :------------------ | :------ | :---------------------------------------- |
| `underlyingOffered` | uint256 | The amount of underlying tokens invested. |

#### Return Values

| Name               | Type    | Description                                                        |
| :----------------- | :------ | :----------------------------------------------------------------- |
| `hTokenRequired`   | uint256 | The hypothetical amount of hTokens required to mint new LP tokens. |
| `poolTokensMinted` | uint256 | The amount of LP tokens to mint.                                   |

### getBurnOutputs

```solidity
function getBurnOutputs(
    uint256 poolTokensBurned
) external returns (uint256 underlyingReturned, uint256 hTokenReturned)
```

Calculates how much underlying and hToken would be returned for a given amount of LP tokens.

#### Parameters

| Name               | Type    | Description                      |
| :----------------- | :------ | :------------------------------- |
| `poolTokensBurned` | uint256 | The amount of LP tokens to burn. |

#### Return Values

| Name                 | Type    | Description                                 |
| :------------------- | :------ | :------------------------------------------ |
| `underlyingReturned` | uint256 | The amount of reserve underlying retrieved. |
| `hTokenReturned`     | uint256 | The amount of reserve hToken retrieved.     |

### getQuoteForSellingHToken

```solidity
function getQuoteForSellingHToken(
    uint256 hTokenIn
) external returns (uint256 underlyingOut)
```

Quotes how much underlying would be obtained by selling `hTokenIn` hToken.

Requirements:

- Cannot be called after maturity.

#### Parameters

| Name       | Type    | Description                                 |
| :--------- | :------ | :------------------------------------------ |
| `hTokenIn` | uint256 | The hypothetical amount of hTokens to sell. |

#### Return Values

| Name            | Type    | Description                                                   |
| :-------------- | :------ | :------------------------------------------------------------ |
| `underlyingOut` | uint256 | The hypothetical amount of underlying that would be obtained. |

### getQuoteForSellingUnderlying

```solidity
function getQuoteForSellingUnderlying(
    uint256 underlyingIn
) external returns (uint256 hTokenOut)
```

Quotes how many hTokens would be obtained by selling `underlyingIn` underlying.

Requirements:

- Cannot be called after maturity.

#### Parameters

| Name           | Type    | Description                                    |
| :------------- | :------ | :--------------------------------------------- |
| `underlyingIn` | uint256 | The hypothetical amount of underlying to sell. |

#### Return Values

| Name        | Type    | Description                                                |
| :---------- | :------ | :--------------------------------------------------------- |
| `hTokenOut` | uint256 | The hypothetical amount of hTokens that would be obtained. |

### getNormalizedUnderlyingReserves

```solidity
function getNormalizedUnderlyingReserves() external returns (uint256 normalizedUnderlyingReserves)
```

Returns the normalized underlying reserves, i.e. the Erc20 balance scaled to have 18 decimals.

### getVirtualHTokenReserves

```solidity
function getVirtualHTokenReserves() external returns (uint256 virtualHTokenReserves)
```

Returns the virtual hToken reserves, as explained in the whitepaper.

Adds the Erc20 hToken balance to the total supply of LP tokens.

### maturity

```solidity
function maturity() external returns (uint256)
```

The unix timestamp at which the hToken expires.

### hToken

```solidity
function hToken() external returns (contract IHToken)
```

The hToken traded in this pool.

### underlying

```solidity
function underlying() external returns (contract IErc20)
```

The underlying token traded in this pool.

### underlyingPrecisionScalar

```solidity
function underlyingPrecisionScalar() external returns (uint256)
```

The ratio between our native precision (18) and the underlying precision.

## Non-Constant Functions

### burn

```solidity
function burn(
    uint256 poolTokensBurned
) external returns (uint256 underlyingReturned, uint256 hTokenReturned)
```

Burns LP tokens in exchange for underlying tokens and hTokens.

Emits a {RemoveLiquidity} event.

Requirements:

- The amount to burn cannot be zero.

#### Parameters

| Name               | Type    | Description                      |
| :----------------- | :------ | :------------------------------- |
| `poolTokensBurned` | uint256 | The amount of LP tokens to burn. |

#### Return Values

| Name                 | Type    | Description                                 |
| :------------------- | :------ | :------------------------------------------ |
| `underlyingReturned` | uint256 | The amount of reserve underlying retrieved. |
| `hTokenReturned`     | uint256 | The amount of reserve hToken retrieved.     |

### buyHToken

```solidity
function buyHToken(
    address to,
    uint256 hTokenOut
) external returns (uint256 underlyingIn)
```

Buys hToken with underlying.

Emits a {Trade} event.

Requirements:

- All from "getQuoteForBuyingHToken".
- The caller must have allowed this contract to spend `underlyingIn` tokens.
- The caller must have at least `underlyingIn` in their account.

#### Parameters

| Name        | Type    | Description                                                                      |
| :---------- | :------ | :------------------------------------------------------------------------------- |
| `to`        | address | The account that receives the hToken being bought.                               |
| `hTokenOut` | uint256 | The amount of hTokens being bought that will be transferred to the `to` account. |

#### Return Values

| Name           | Type    | Description                                                            |
| :------------- | :------ | :--------------------------------------------------------------------- |
| `underlyingIn` | uint256 | The amount of underlying that will be taken from the caller's account. |

### buyUnderlying

```solidity
function buyUnderlying(
    address to,
    uint256 underlyingOut
) external returns (uint256 hTokenIn)
```

Buys underlying with hToken.

Requirements:

- All from "getQuoteForBuyingUnderlying".
- The caller must have allowed this contract to spend `hTokenIn` tokens.
- The caller must have at least `hTokenIn` in their account.

#### Parameters

| Name            | Type    | Description                                                                         |
| :-------------- | :------ | :---------------------------------------------------------------------------------- |
| `to`            | address | The account that receives the underlying being bought.                              |
| `underlyingOut` | uint256 | The amount of underlying being bought that will be transferred to the `to` account. |

#### Return Values

| Name       | Type    | Description                                                         |
| :--------- | :------ | :------------------------------------------------------------------ |
| `hTokenIn` | uint256 | The amount of hTokens that will be taken from the caller's account. |

### mint

```solidity
function mint(
    uint256 underlyingOffered
) external returns (uint256 poolTokensMinted)
```

Mints LP tokens in exchange for adding underlying tokens and hTokens. An appropriate amount of
hTokens gets calculated and taken from the caller to be investigated alongside underlying tokens.

Emits an {AddLiquidity} event.

Requirements:

- The caller must have allowed this contract to spend `underlyingOffered` and `hTokenRequired` tokens.

#### Parameters

| Name                | Type    | Description                               |
| :------------------ | :------ | :---------------------------------------- |
| `underlyingOffered` | uint256 | The amount of underlying tokens invested. |

#### Return Values

| Name               | Type    | Description                      |
| :----------------- | :------ | :------------------------------- |
| `poolTokensMinted` | uint256 | The amount of LP tokens to mint. |

### sellHToken

```solidity
function sellHToken(
    address to,
    uint256 hTokenIn
) external returns (uint256 underlyingOut)
```

Sells hToken for underlying.

Emits a {Trade} event.

Requirements:

- All from "getQuoteForSellingHToken".
- The caller must have allowed this contract to spend `hTokenIn` tokens.
- The caller must have at least `hTokenIn` in their account.

#### Parameters

| Name       | Type    | Description                                                                  |
| :--------- | :------ | :--------------------------------------------------------------------------- |
| `to`       | address | The account that receives the underlying being bought.                       |
| `hTokenIn` | uint256 | The amount of underlying being sold that is taken from the caller's account. |

#### Return Values

| Name            | Type    | Description                                                            |
| :-------------- | :------ | :--------------------------------------------------------------------- |
| `underlyingOut` | uint256 | The amount of underlying that will be transferred to the `to` account. |

### sellUnderlying

```solidity
function sellUnderlying(
    address to,
    uint256 underlyingIn
) external returns (uint256 hTokenOut)
```

Sells underlying for hToken.

Emits a {Trade} event.

Requirements:

- All from "getQuoteForSellingUnderlying".
- The caller must have allowed this contract to spend `underlyingIn` tokens.
- The caller must have at least `underlyingIn` in their account.

#### Parameters

| Name           | Type    | Description                                                                  |
| :------------- | :------ | :--------------------------------------------------------------------------- |
| `to`           | address | The account that receives the hToken being bought.                           |
| `underlyingIn` | uint256 | The amount of underlying being sold that is taken from the caller's account. |

#### Return Values

| Name        | Type    | Description                                                           |
| :---------- | :------ | :-------------------------------------------------------------------- |
| `hTokenOut` | uint256 | The amount of hTokenOut that will be transferred to the `to` account. |

## Events

### AddLiquidity

```solidity
event AddLiquidity(
    uint256 maturity,
    address provider,
    uint256 underlyingAmount,
    uint256 hTokenAmount,
    uint256 poolTokenAmount
)
```

Emitted when liquidity is added to the AMM.

#### Parameters

| Name               | Type    | Description                            |
| :----------------- | :------ | :------------------------------------- |
| `maturity`         | uint256 | The maturity of the hToken.            |
| `provider`         | address | The address of the liquidity provider. |
| `underlyingAmount` | uint256 | The amount of underlying provided.     |
| `hTokenAmount`     | uint256 | The amount of hTokens provided.        |
| `poolTokenAmount`  | uint256 | The amount of pool tokens minted.      |

### RemoveLiquidity

```solidity
event RemoveLiquidity(
    uint256 maturity,
    address provider,
    uint256 underlyingAmount,
    uint256 hTokenAmount,
    uint256 poolTokenAmount
)
```

Emitted when liquidity is removed from the AMM.

#### Parameters

| Name               | Type    | Description                             |
| :----------------- | :------ | :-------------------------------------- |
| `maturity`         | uint256 | The maturity of the hToken.             |
| `provider`         | address | The address of the liquidity withdrawn. |
| `underlyingAmount` | uint256 | The amount of underlying withdrawn.     |
| `hTokenAmount`     | uint256 | The amount of hTokens provided.         |
| `poolTokenAmount`  | uint256 | The amount of pool tokens burned.       |

### Trade

```solidity
event Trade(
    uint256 maturity,
    address from,
    address to,
    int256 underlyingAmount,
    int256 hTokenAmount
)
```

Emitted when a trade is made in the AMM.

#### Parameters

| Name               | Type    | Description                                    |
| :----------------- | :------ | :--------------------------------------------- |
| `maturity`         | uint256 | The maturity of the hToken.                    |
| `from`             | address | The account sending the tokens to the AMM.     |
| `to`               | address | The account receiving the tokens from the AMM. |
| `underlyingAmount` | int256  | The amount of underlying bought or sold.       |
| `hTokenAmount`     | int256  | The amount of hTokens bought or sold.          |

## Custom Errors

### HifiPool\_\_BondMatured

```solidity
error HifiPool__BondMatured()
```

Emitted when the bond matured.

### HifiPool\_\_BuyHTokenZero

```solidity
error HifiPool__BuyHTokenZero()
```

Emitted when attempting to buy a zero amount of hTokens.

### HifiPool\_\_BuyHTokenUnderlyingZero

```solidity
error HifiPool__BuyHTokenUnderlyingZero()
```

Emitted when attempting to buy hTokens with a zero amount of underlying.

### HifiPool\_\_BuyUnderlyingZero

```solidity
error HifiPool__BuyUnderlyingZero()
```

Emitted when attempting to buy a zero amount of underlying.

### HifiPool\_\_BurnZero

```solidity
error HifiPool__BurnZero()
```

Emitted when offering zero underlying to mint LP tokens.

### HifiPool\_\_MintZero

```solidity
error HifiPool__MintZero()
```

Emitted when offering zero underlying to mint LP tokens.

### HifiPool\_\_NegativeInterestRate

```solidity
error HifiPool__NegativeInterestRate(uint256 virtualHTokenReserves, uint256 hTokenOut, uint256 normalizedUnderlyingReserves, uint256 normalizedUnderlyingIn)
```

Emitted when buying hTokens or selling underlying and the resultant hToken reserves would become
smaller than the underlying reserves.

### HifiPool\_\_SellHTokenZero

```solidity
error HifiPool__SellHTokenZero()
```

Emitted when attempting to sell a zero amount of hToken.

### HifiPool\_\_SellHTokenUnderlyingZero

```solidity
error HifiPool__SellHTokenUnderlyingZero()
```

Emitted when attempting to sell hTokens in exchange for a zero amount of underlying.

### HifiPool\_\_SellUnderlyingZero

```solidity
error HifiPool__SellUnderlyingZero()
```

Emitted when attempting to sell a zero amount of underlying.

### HifiPool\_\_ToInt256CastOverflow

```solidity
error HifiPool__ToInt256CastOverflow(uint256 number)
```

Emitted when trying to convert a uint256 number that doesn&#x27;t fit within int256.

### HifiPool\_\_VirtualHTokenReservesOverflow

```solidity
error HifiPool__VirtualHTokenReservesOverflow(uint256 hTokenBalance, uint256 totalSupply)
```

Emitted when the hToken balance added to the total supply of LP tokens overflows uint256.
