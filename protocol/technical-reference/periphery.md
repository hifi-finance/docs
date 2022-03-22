---
id: periphery
title: Periphery
sidebar_position: 4
---

# Periphery

The Hifi protocol is architected such that every function does one job and job only. In software engineering
parlance, this practice is called separation of concerns, a design principle which makes it easier to reason about how the
protocol behaves. Most importantly, it gives the protocol better security guarantees.

Modularization comes with a cost, though. It forces us to "compose" multiple contract calls, if we wish to provide a
good user experience in our user interface. This is where [DSProxy](https://github.com/dapphub/ds-proxy) comes into play -
a smart contract wallet designed to address this need.

For brevity, we won't expound on the technical properties of DSProxy here. You can refer to this
[guide](https://ethereum.stackexchange.com/questions/90303/what-is-dsproxy-and-how-does-it-work) for a detailed explanation. In short:

1. DSProxy is a smart contract wallet.
2. There is a so-called "target contract" that contains composite scripts, toward which the DSProxy delegate calls.

Is it the target contract that is documented herein.

## Functions

### addLiquidity

```solidity
function addLiquidity(
    contract IHifiPool hifiPool,
    uint256 underlyingOffered,
    uint256 maxHTokenRequired
) external
```

Adds liquidity to the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingAmount` and `maxHTokenRequired` tokens.

#### Parameters

| Name                | Type               | Description                                                       |
| :------------------ | :----------------- | :---------------------------------------------------------------- |
| `hifiPool`          | contract IHifiPool | The address of the HifiPool contract.                             |
| `underlyingOffered` | uint256            | The amount of underlying to invest.                               |
| `maxHTokenRequired` | uint256            | The maximum amount of hTokens that the user is willing to accept. |

### addLiquidityWithSignature

```solidity
function addLiquidityWithSignature(
    contract IHifiPool hifiPool,
    uint256 underlyingOffered,
    uint256 maxHTokenRequired,
    uint256 deadline,
    bytes signatureHToken,
    bytes signatureUnderlying
) external
```

Adds liquidity to the AMM using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by caller to the DSProxy to spend `underlyingAmount`
  and `maxHTokenRequired` tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type               | Description                                                       |
| :-------------------- | :----------------- | :---------------------------------------------------------------- |
| `hifiPool`            | contract IHifiPool | The address of the HifiPool contract.                             |
| `underlyingOffered`   | uint256            | The amount of underlying to invest.                               |
| `maxHTokenRequired`   | uint256            | The maximum amount of hTokens that the user is willing to accept. |
| `deadline`            | uint256            | The deadline beyond which the signatures are not valid anymore.   |
| `signatureHToken`     | bytes              | The packed signature for the hToken.                              |
| `signatureUnderlying` | bytes              | The packed signature for the underlying.                          |

### borrowHToken

```solidity
function borrowHToken(
    contract IBalanceSheetV2 balanceSheet,
    contract IHToken hToken,
    uint256 borrowAmount
) external
```

Borrows hTokens.

#### Parameters

| Name           | Type                     | Description                               |
| :------------- | :----------------------- | :---------------------------------------- |
| `balanceSheet` | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `hToken`       | contract IHToken         | The address of the HToken contract.       |
| `borrowAmount` | uint256                  | The amount of hTokens to borrow.          |

### borrowHTokenAndAddLiquidity

```solidity
function borrowHTokenAndAddLiquidity(
    contract IBalanceSheetV2 balanceSheet,
    contract IHifiPool hifiPool,
    uint256 maxBorrowAmount,
    uint256 underlyingOffered
) external
```

Borrows hTokens and adds liquidity to the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingAmount` tokens.

#### Parameters

| Name                | Type                     | Description                                                                            |
| :------------------ | :----------------------- | :------------------------------------------------------------------------------------- |
| `balanceSheet`      | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                              |
| `hifiPool`          | contract IHifiPool       | The address of the HifiPool contract.                                                  |
| `maxBorrowAmount`   | uint256                  | The amount of hTokens to borrow and the max amount that the user is willing to invest. |
| `underlyingOffered` | uint256                  | The amount of underlying to invest.                                                    |

### borrowHTokenAndAddLiquidityWithSignature

```solidity
function borrowHTokenAndAddLiquidityWithSignature(
    contract IBalanceSheetV2 balanceSheet,
    contract IHifiPool hifiPool,
    uint256 maxBorrowAmount,
    uint256 underlyingOffered,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Borrows hTokens and adds liquidity to the AMM using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend
  `underlyingOffered` tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                                            |
| :-------------------- | :----------------------- | :------------------------------------------------------------------------------------- |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                              |
| `hifiPool`            | contract IHifiPool       | The address of the HifiPool contract.                                                  |
| `maxBorrowAmount`     | uint256                  | The amount of hTokens to borrow and the max amount that the user is willing to invest. |
| `underlyingOffered`   | uint256                  | The amount of underlying to invest.                                                    |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore.                          |
| `signatureUnderlying` | bytes                    | The packed signature for the underlying.                                               |

### borrowHTokenAndBuyUnderlying

```solidity
function borrowHTokenAndBuyUnderlying(
    contract IBalanceSheetV2 balanceSheet,
    contract IHifiPool hifiPool,
    uint256 maxBorrowAmount,
    uint256 underlyingOut
) external
```

Borrows hTokens and buys underlying.

Emits a {BorrowHTokenAndBuyUnderlying} event.

#### Parameters

| Name              | Type                     | Description                                                                         |
| :---------------- | :----------------------- | :---------------------------------------------------------------------------------- |
| `balanceSheet`    | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                           |
| `hifiPool`        | contract IHifiPool       | The address of the HifiPool contract.                                               |
| `maxBorrowAmount` | uint256                  | The amount of hTokens to borrow and the max amount that the user is willing to pay. |
| `underlyingOut`   | uint256                  | The exact amount of underlying that the user wants to buy.                          |

### borrowHTokenAndSellHToken

```solidity
function borrowHTokenAndSellHToken(
    contract IBalanceSheetV2 balanceSheet,
    contract IHifiPool hifiPool,
    uint256 borrowAmount,
    uint256 minUnderlyingOut
) external
```

Borrows hTokens and sells them.

Emits a {BorrowHTokenAndSellHToken} event.

#### Parameters

| Name               | Type                     | Description                                                          |
| :----------------- | :----------------------- | :------------------------------------------------------------------- |
| `balanceSheet`     | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                            |
| `hifiPool`         | contract IHifiPool       | The address of the HifiPool contract.                                |
| `borrowAmount`     | uint256                  | The exact amount of hTokens to borrow and sell.                      |
| `minUnderlyingOut` | uint256                  | The minimum amount of underlying that the user is willing to accept. |

### buyHToken

```solidity
function buyHToken(
    contract IHifiPool hifiPool,
    uint256 hTokenOut,
    uint256 maxUnderlyingIn
) external
```

Buys hTokens with underlying.

Requirements:

- The caller must have allowed DSProxy to spend `maxUnderlyingIn` tokens.

#### Parameters

| Name              | Type               | Description                                                       |
| :---------------- | :----------------- | :---------------------------------------------------------------- |
| `hifiPool`        | contract IHifiPool | The address of the HifiPool contract.                             |
| `hTokenOut`       | uint256            | The exact amount of hTokens that the user wants to buy.           |
| `maxUnderlyingIn` | uint256            | The maximum amount of underlying that the user is willing to pay. |

### buyHTokenAndAddLiquidity

```solidity
function buyHTokenAndAddLiquidity(
    contract IHifiPool hifiPool,
    uint256 hTokenOut,
    uint256 maxUnderlyingAmount
) external
```

Buys hTokens and adds liquidity to the AMM.

Requirements:

- The caller must have allowed DSProxy to spend `maxUnderlyingIn + underlyingOffered` tokens.

#### Parameters

| Name                  | Type               | Description                                                                   |
| :-------------------- | :----------------- | :---------------------------------------------------------------------------- |
| `hifiPool`            | contract IHifiPool | The address of the HifiPool contract.                                         |
| `hTokenOut`           | uint256            | The amount of hTokens to buy.                                                 |
| `maxUnderlyingAmount` | uint256            | The maximum amount of underlying that the user is willing to sell and invest. |

### buyHTokenAndAddLiquidityWithSignature

```solidity
function buyHTokenAndAddLiquidityWithSignature(
    contract IHifiPool hifiPool,
    uint256 hTokenOut,
    uint256 maxUnderlyingAmount,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Buys hTokens and adds liquidity to the AMM using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend
  `maxUnderlyingIn + underlyingOffered` tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type               | Description                                                                   |
| :-------------------- | :----------------- | :---------------------------------------------------------------------------- |
| `hifiPool`            | contract IHifiPool | The address of the HifiPool contract.                                         |
| `hTokenOut`           | uint256            | The amount of hTokens to buy.                                                 |
| `maxUnderlyingAmount` | uint256            | The maximum amount of underlying that the user is willing to sell and invest. |
| `deadline`            | uint256            | The deadline beyond which the signature is not valid anymore.                 |
| `signatureUnderlying` | bytes              | The packed signature for the underlying.                                      |

### buyHTokenAndRepayBorrow

```solidity
function buyHTokenAndRepayBorrow(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    uint256 maxUnderlyingIn,
    uint256 hTokenOut
) external
```

Buys hTokens with underlying and repays the borrow.

Requirements:

- The caller must have allowed the DSProxy to spend `maxUnderlyingIn` tokens.

#### Parameters

| Name              | Type                     | Description                                                                                 |
| :---------------- | :----------------------- | :------------------------------------------------------------------------------------------ |
| `hifiPool`        | contract IHifiPool       | The address of the HifiPool contract.                                                       |
| `balanceSheet`    | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                                   |
| `maxUnderlyingIn` | uint256                  | The maximum amount of underlying that the user is willing to pay.                           |
| `hTokenOut`       | uint256                  | The exact amount of hTokens to buy and the amount to repay and the maximum amount to repay. |

### buyHTokenAndRepayBorrowWithSignature

```solidity
function buyHTokenAndRepayBorrowWithSignature(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    uint256 maxUnderlyingIn,
    uint256 hTokenOut,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Buys hTokens with underlying and repays the borrow.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `maxUnderlyingIn`
  tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                                                 |
| :-------------------- | :----------------------- | :------------------------------------------------------------------------------------------ |
| `hifiPool`            | contract IHifiPool       | The address of the HifiPool contract.                                                       |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                                   |
| `maxUnderlyingIn`     | uint256                  | The maximum amount of underlying that the user is willing to pay.                           |
| `hTokenOut`           | uint256                  | The exact amount of hTokens to buy and the amount to repay and the maximum amount to repay. |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore.                               |
| `signatureUnderlying` | bytes                    | The packed signature for the underlying.                                                    |

### buyHTokenWithSignature

```solidity
function buyHTokenWithSignature(
    contract IHifiPool hifiPool,
    uint256 hTokenOut,
    uint256 maxUnderlyingIn,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Buys hTokens with underlying using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `maxUnderlyingIn`
  tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type               | Description                                                       |
| :-------------------- | :----------------- | :---------------------------------------------------------------- |
| `hifiPool`            | contract IHifiPool | The address of the HifiPool contract.                             |
| `hTokenOut`           | uint256            | The exact amount of hTokens that the user wants to buy.           |
| `maxUnderlyingIn`     | uint256            | The maximum amount of underlying that the user is willing to pay. |
| `deadline`            | uint256            | The deadline beyond which the signature is not valid anymore.     |
| `signatureUnderlying` | bytes              | The packed signature for the underlying.                          |

### buyUnderlying

```solidity
function buyUnderlying(
    contract IHifiPool hifiPool,
    uint256 underlyingOut,
    uint256 maxHTokenIn
) external
```

Buys underlying with hTokens.

Requirements:

- The caller must have allowed DSProxy to spend `maxHTokenIn` tokens.

#### Parameters

| Name            | Type               | Description                                                    |
| :-------------- | :----------------- | :------------------------------------------------------------- |
| `hifiPool`      | contract IHifiPool | The address of the HifiPool contract.                          |
| `underlyingOut` | uint256            | The exact amount of underlying that the user wants to buy.     |
| `maxHTokenIn`   | uint256            | The maximum amount of hTokens that the user is willing to pay. |

### buyUnderlyingAndAddLiquidity

```solidity
function buyUnderlyingAndAddLiquidity(
    contract IHifiPool hifiPool,
    uint256 maxHTokenAmount,
    uint256 underlyingOffered
) external
```

Buys underlying and adds liquidity to the AMM.

- The caller must have allowed DSProxy to spend `maxHTokenAmount` tokens.

#### Parameters

| Name                | Type               | Description                                                                       |
| :------------------ | :----------------- | :-------------------------------------------------------------------------------- |
| `hifiPool`          | contract IHifiPool | The address of the HifiPool contract.                                             |
| `maxHTokenAmount`   | uint256            | maxHTokenAmount The maximum amount of hTokens that the user is willing to invest. |
| `underlyingOffered` | uint256            | The amount of underlying to invest.                                               |

### buyUnderlyingAndAddLiquidityWithSignature

```solidity
function buyUnderlyingAndAddLiquidityWithSignature(
    contract IHifiPool hifiPool,
    uint256 maxHTokenAmount,
    uint256 underlyingOffered,
    uint256 deadline,
    bytes signatureHToken
) external
```

Buys underlying and adds liquidity to the AMM.

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend
  `maxHTokenAmount` tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                | Type               | Description                                                                       |
| :------------------ | :----------------- | :-------------------------------------------------------------------------------- |
| `hifiPool`          | contract IHifiPool | The address of the HifiPool contract.                                             |
| `maxHTokenAmount`   | uint256            | maxHTokenAmount The maximum amount of hTokens that the user is willing to invest. |
| `underlyingOffered` | uint256            | The amount of underlying to invest.                                               |
| `deadline`          | uint256            | The deadline beyond which the signature is not valid anymore.                     |
| `signatureHToken`   | bytes              | The packed signature for the hToken.                                              |

### buyUnderlyingWithSignature

```solidity
function buyUnderlyingWithSignature(
    contract IHifiPool hifiPool,
    uint256 underlyingOut,
    uint256 maxHTokenIn,
    uint256 deadline,
    bytes signatureHToken
) external
```

Buys underlying with hTokens using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `maxHTokenIn`
  tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name              | Type               | Description                                                    |
| :---------------- | :----------------- | :------------------------------------------------------------- |
| `hifiPool`        | contract IHifiPool | The address of the HifiPool contract.                          |
| `underlyingOut`   | uint256            | The exact amount of underlying that the user wants to buy.     |
| `maxHTokenIn`     | uint256            | The maximum amount of hTokens that the user is willing to pay. |
| `deadline`        | uint256            | The deadline beyond which the signature is not valid anymore.  |
| `signatureHToken` | bytes              | The packed signature for the hToken.                           |

### depositCollateral

```solidity
function depositCollateral(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20 collateral,
    uint256 depositAmount
) external
```

Deposits collateral into the vault.

Requirements:

- The caller must have allowed the DSProxy to spend `collateralAmount` tokens.

#### Parameters

| Name            | Type                     | Description                               |
| :-------------- | :----------------------- | :---------------------------------------- |
| `balanceSheet`  | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `collateral`    | contract IErc20          | The address of the collateral contract.   |
| `depositAmount` | uint256                  | The amount of collateral to deposit.      |

### depositCollateralAndBorrowHToken

```solidity
function depositCollateralAndBorrowHToken(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20 collateral,
    contract IHToken hToken,
    uint256 depositAmount,
    uint256 borrowAmount
) external
```

Deposits collateral into the vault and borrows hTokens.

Requirements:

- The caller must have allowed the DSProxy to spend `collateralAmount` tokens.

#### Parameters

| Name            | Type                     | Description                               |
| :-------------- | :----------------------- | :---------------------------------------- |
| `balanceSheet`  | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `collateral`    | contract IErc20          | The address of the collateral contract.   |
| `hToken`        | contract IHToken         | The address of the HToken contract.       |
| `depositAmount` | uint256                  | The amount of collateral to deposit.      |
| `borrowAmount`  | uint256                  | The amount of hTokens to borrow.          |

### depositCollateralAndBorrowHTokenAndAddLiquidity

```solidity
function depositCollateralAndBorrowHTokenAndAddLiquidity(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20 collateral,
    contract IHifiPool hifiPool,
    uint256 depositAmount,
    uint256 maxBorrowAmount,
    uint256 underlyingOffered
) external
```

Deposits collateral into the vault, borrows hTokens and adds liquidity to the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `collateralAmount` tokens.

#### Parameters

| Name                | Type                     | Description                                                                            |
| :------------------ | :----------------------- | :------------------------------------------------------------------------------------- |
| `balanceSheet`      | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                              |
| `collateral`        | contract IErc20          | The address of the collateral contract.                                                |
| `hifiPool`          | contract IHifiPool       | The address of the HifiPool contract.                                                  |
| `depositAmount`     | uint256                  | The amount of collateral to deposit.                                                   |
| `maxBorrowAmount`   | uint256                  | The amount of hTokens to borrow and the max amount that the user is willing to invest. |
| `underlyingOffered` | uint256                  | The amount of underlying to invest.                                                    |

### depositCollateralAndBorrowHTokenAndAddLiquidityWithSignature

```solidity
function depositCollateralAndBorrowHTokenAndAddLiquidityWithSignature(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20Permit collateral,
    contract IHifiPool hifiPool,
    uint256 depositAmount,
    uint256 maxBorrowAmount,
    uint256 underlyingOffered,
    uint256 deadline,
    bytes signatureCollateral,
    bytes signatureUnderlying
) external
```

Deposits collateral into the vault, borrows hTokens and adds liquidity to the AMM using EIP-2612
signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `collateralAmount`
  and `underlyingAmount` tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                                            |
| :-------------------- | :----------------------- | :------------------------------------------------------------------------------------- |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                              |
| `collateral`          | contract IErc20Permit    | The address of the collateral contract.                                                |
| `hifiPool`            | contract IHifiPool       | The address of the HifiPool contract.                                                  |
| `depositAmount`       | uint256                  | The amount of collateral to deposit.                                                   |
| `maxBorrowAmount`     | uint256                  | The amount of hTokens to borrow and the max amount that the user is willing to invest. |
| `underlyingOffered`   | uint256                  | The amount of underlying to invest.                                                    |
| `deadline`            | uint256                  | The deadline beyond which the signatures are not valid anymore.                        |
| `signatureCollateral` | bytes                    | The packed signature for the collateral.                                               |
| `signatureUnderlying` | bytes                    | The packed signature for the underlying.                                               |

### depositCollateralAndBorrowHTokenAndSellHToken

```solidity
function depositCollateralAndBorrowHTokenAndSellHToken(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20 collateral,
    contract IHifiPool hifiPool,
    uint256 depositAmount,
    uint256 borrowAmount,
    uint256 minUnderlyingOut
) external
```

Deposits collateral into the vault, borrows hTokens and sells them.

Requirements:

- The caller must have allowed the DSProxy to spend `collateralAmount` tokens.

#### Parameters

| Name               | Type                     | Description                                                          |
| :----------------- | :----------------------- | :------------------------------------------------------------------- |
| `balanceSheet`     | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                            |
| `collateral`       | contract IErc20          | The address of the collateral contract.                              |
| `hifiPool`         | contract IHifiPool       | The address of the HifiPool contract.                                |
| `depositAmount`    | uint256                  | The amount of collateral to deposit.                                 |
| `borrowAmount`     | uint256                  | The exact amount of hTokens to borrow.                               |
| `minUnderlyingOut` | uint256                  | The minimum amount of underlying that the user is willing to accept. |

### depositCollateralAndBorrowHTokenAndSellHTokenWithSignature

```solidity
function depositCollateralAndBorrowHTokenAndSellHTokenWithSignature(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20Permit collateral,
    contract IHifiPool hifiPool,
    uint256 depositAmount,
    uint256 borrowAmount,
    uint256 minUnderlyingOut,
    uint256 deadline,
    bytes signatureCollateral
) external
```

Deposits collateral into the vault, borrows hTokens and sells them.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `collateralAmount`
  and `underlyingAmount` for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                          |
| :-------------------- | :----------------------- | :------------------------------------------------------------------- |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                            |
| `collateral`          | contract IErc20Permit    | The address of the collateral contract.                              |
| `hifiPool`            | contract IHifiPool       | The address of the HifiPool contract.                                |
| `depositAmount`       | uint256                  | The amount of collateral to deposit.                                 |
| `borrowAmount`        | uint256                  | The exact amount of hTokens to borrow.                               |
| `minUnderlyingOut`    | uint256                  | The minimum amount of underlying that the user is willing to accept. |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore.        |
| `signatureCollateral` | bytes                    | The packed signature for the collateral.                             |

### depositCollateralAndBorrowHTokenWithSignature

```solidity
function depositCollateralAndBorrowHTokenWithSignature(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20Permit collateral,
    contract IHToken hToken,
    uint256 depositAmount,
    uint256 borrowAmount,
    uint256 deadline,
    bytes signatureCollateral
) external
```

Deposits collateral into the vault and borrows hTokens using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend
  `depositAmount` `collateral` tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                   |
| :-------------------- | :----------------------- | :------------------------------------------------------------ |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                     |
| `collateral`          | contract IErc20Permit    | The address of the collateral contract.                       |
| `hToken`              | contract IHToken         | The address of the HToken contract.                           |
| `depositAmount`       | uint256                  | The amount of collateral to deposit.                          |
| `borrowAmount`        | uint256                  | The amount of hTokens to borrow.                              |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore. |
| `signatureCollateral` | bytes                    | The packed signature for the collateral.                      |

### depositCollateralWithSignature

```solidity
function depositCollateralWithSignature(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20Permit collateral,
    uint256 depositAmount,
    uint256 deadline,
    bytes signatureCollateral
) external
```

Deposits collateral into the vault using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend
  `depositAmount` tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                   |
| :-------------------- | :----------------------- | :------------------------------------------------------------ |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                     |
| `collateral`          | contract IErc20Permit    | The address of the collateral contract.                       |
| `depositAmount`       | uint256                  | The amount of collateral to deposit.                          |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore. |
| `signatureCollateral` | bytes                    | The packed signature for the collateral.                      |

### depositUnderlying

```solidity
function depositUnderlying(
    contract IHToken hToken,
    uint256 underlyingAmount
) external
```

Deposits the underlying in the HToken contract to mint hTokens.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingAmount` tokens.

#### Parameters

| Name               | Type             | Description                          |
| :----------------- | :--------------- | :----------------------------------- |
| `hToken`           | contract IHToken | The address of the HToken contract.  |
| `underlyingAmount` | uint256          | The amount of underlying to deposit. |

### depositUnderlyingAndBorrowHTokenAndAddLiquidity

```solidity
function depositUnderlyingAndBorrowHTokenAndAddLiquidity(
    contract IHifiPool hifiPool,
    uint256 depositAmount,
    uint256 underlyingOffered
) external
```

Deposits underlying in the HToken contract to mint hTokens, borrows hTokens and adds liquidity
to the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `depositAmount + underlyingOffered` tokens.

#### Parameters

| Name                | Type               | Description                                        |
| :------------------ | :----------------- | :------------------------------------------------- |
| `hifiPool`          | contract IHifiPool | The address of the HifiPool contract.              |
| `depositAmount`     | uint256            | The amount of underlying to deposit as collateral. |
| `underlyingOffered` | uint256            | The amount of underlying to invest.                |

### depositUnderlyingAndBorrowHTokenAndAddLiquidityWithSignature

```solidity
function depositUnderlyingAndBorrowHTokenAndAddLiquidityWithSignature(
    contract IHifiPool hifiPool,
    uint256 depositAmount,
    uint256 underlyingOffered,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Deposits underlying as collateral into the vault, borrows hTokens and adds liquidity to the AMM using
EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend
  `depositAmount + underlyingOffered` for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type               | Description                                                   |
| :-------------------- | :----------------- | :------------------------------------------------------------ |
| `hifiPool`            | contract IHifiPool | The address of the HifiPool contract.                         |
| `depositAmount`       | uint256            | The amount of underlying to deposit as collateral.            |
| `underlyingOffered`   | uint256            | The amount of underlying to invest.                           |
| `deadline`            | uint256            | The deadline beyond which the signature is not valid anymore. |
| `signatureUnderlying` | bytes              | The packed signature for the underlying.                      |

### depositUnderlyingAndRepayBorrow

```solidity
function depositUnderlyingAndRepayBorrow(
    contract IHToken hToken,
    contract IBalanceSheetV2 balanceSheet,
    uint256 underlyingAmount
) external
```

Deposits underlying in the HToken contract to mint hTokens, and repays the borrow.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingAmount` tokens.

#### Parameters

| Name               | Type                     | Description                               |
| :----------------- | :----------------------- | :---------------------------------------- |
| `hToken`           | contract IHToken         | The address of the HToken contract.       |
| `balanceSheet`     | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `underlyingAmount` | uint256                  | The amount of underlying to deposit.      |

### depositUnderlyingAndRepayBorrowWithSignature

```solidity
function depositUnderlyingAndRepayBorrowWithSignature(
    contract IHToken hToken,
    contract IBalanceSheetV2 balanceSheet,
    uint256 underlyingAmount,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Supplies underlying to mint hTokens and repay the hToken borrow using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `underlyingAmount`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                   |
| :-------------------- | :----------------------- | :------------------------------------------------------------ |
| `hToken`              | contract IHToken         | The address of the HToken contract.                           |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                     |
| `underlyingAmount`    | uint256                  | The amount of underlying to supply.                           |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore. |
| `signatureUnderlying` | bytes                    | The packed signature for the underlying.                      |

### depositUnderlyingWithSignature

```solidity
function depositUnderlyingWithSignature(
    contract IHToken hToken,
    uint256 underlyingAmount,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Supplies the underlying to mint hTokens using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `underlyingAmount`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type             | Description                                                   |
| :-------------------- | :--------------- | :------------------------------------------------------------ |
| `hToken`              | contract IHToken | The address of the HToken contract.                           |
| `underlyingAmount`    | uint256          | The amount of underlying to supply.                           |
| `deadline`            | uint256          | The deadline beyond which the signature is not valid anymore. |
| `signatureUnderlying` | bytes            | The packed signature for the underlying.                      |

### redeem

```solidity
function redeem(
    contract IHToken hToken,
    uint256 hTokenAmount,
    uint256 underlyingAmount
) external
```

Redeems the underlying in exchange for hTokens.

Requirements:

- The caller must have allowed the DSProxy to spend `hTokenAmount` hTokens.

#### Parameters

| Name               | Type             | Description                         |
| :----------------- | :--------------- | :---------------------------------- |
| `hToken`           | contract IHToken | The address of the HToken contract. |
| `hTokenAmount`     | uint256          | The amount of hTokens to provide.   |
| `underlyingAmount` | uint256          | The amount of underlying to redeem. |

### redeemWithSignature

```solidity
function redeemWithSignature(
    contract IHToken hToken,
    uint256 hTokenAmount,
    uint256 underlyingAmount,
    uint256 deadline,
    bytes signatureHToken
) external
```

Redeems hTokens for underlying using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `hTokenAmount`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type             | Description                                                   |
| :----------------- | :--------------- | :------------------------------------------------------------ |
| `hToken`           | contract IHToken | The address of the HToken contract.                           |
| `hTokenAmount`     | uint256          | The amount of hTokens to redeem.                              |
| `underlyingAmount` | uint256          | The amount of underlying to redeem.                           |
| `deadline`         | uint256          | The deadline beyond which the signature is not valid anymore. |
| `signatureHToken`  | bytes            | The packed signature for hToken.                              |

### removeLiquidity

```solidity
function removeLiquidity(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned
) external
```

Removes liquidity from the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `poolTokensBurned` tokens.

#### Parameters

| Name               | Type               | Description                           |
| :----------------- | :----------------- | :------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract. |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.      |

### removeLiquidityAndRedeem

```solidity
function removeLiquidityAndRedeem(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned
) external
```

Removes liquidity from the AMM and redeems underlying in exchange for all hTokens
retrieved from the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `poolTokensBurned` tokens.

#### Parameters

| Name               | Type               | Description                           |
| :----------------- | :----------------- | :------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract. |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.      |

### removeLiquidityAndRedeemWithSignature

```solidity
function removeLiquidityAndRedeemWithSignature(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned,
    uint256 deadline,
    bytes signatureLPToken
) external
```

Removes liquidity from the AMM, and redeems all hTokens for the underlying using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `poolTokensBurned`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type               | Description                                                   |
| :----------------- | :----------------- | :------------------------------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                         |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.                              |
| `deadline`         | uint256            | The deadline beyond which the signature is not valid anymore. |
| `signatureLPToken` | bytes              | The packed signature for LP tokens.                           |

### removeLiquidityAndRepayBorrowAndWithdrawCollateral

```solidity
function removeLiquidityAndRepayBorrowAndWithdrawCollateral(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20 collateral,
    uint256 poolTokensBurned,
    uint256 repayAmount,
    uint256 withdrawAmount
) external
```

Removes liquidity from the AMM, repays the borrow and withdraws collateral.

Requirements:

- The caller must have allowed the DSProxy to spend `poolTokensBurned` tokens.

#### Parameters

| Name               | Type                     | Description                               |
| :----------------- | :----------------------- | :---------------------------------------- |
| `hifiPool`         | contract IHifiPool       | The address of the HifiPool contract.     |
| `balanceSheet`     | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `collateral`       | contract IErc20          | The address of the collateral contract.   |
| `poolTokensBurned` | uint256                  | The amount of LP tokens to burn.          |
| `repayAmount`      | uint256                  | The amount of hTokens to repay.           |
| `withdrawAmount`   | uint256                  | The amount of collateral to withdraw.     |

### removeLiquidityAndRepayBorrowAndWithdrawCollateralWithSignature

```solidity
function removeLiquidityAndRepayBorrowAndWithdrawCollateralWithSignature(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20 collateral,
    uint256 poolTokensBurned,
    uint256 repayAmount,
    uint256 withdrawAmount,
    uint256 deadline,
    bytes signatureLPToken
) external
```

Removes liquidity from the AMM, repays the borrow and withdraws collateral using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `poolTokensBurned`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type                     | Description                                                   |
| :----------------- | :----------------------- | :------------------------------------------------------------ |
| `hifiPool`         | contract IHifiPool       | The address of the HifiPool contract.                         |
| `balanceSheet`     | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                     |
| `collateral`       | contract IErc20          | The address of the collateral contract.                       |
| `poolTokensBurned` | uint256                  | The amount of LP tokens to burn.                              |
| `repayAmount`      | uint256                  | The amount of hTokens to repay.                               |
| `withdrawAmount`   | uint256                  | The amount of collateral to withdraw.                         |
| `deadline`         | uint256                  | The deadline beyond which the signature is not valid anymore. |
| `signatureLPToken` | bytes                    | The packed signature for LP tokens.                           |

### removeLiquidityAndSellHToken

```solidity
function removeLiquidityAndSellHToken(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned,
    uint256 minUnderlyingOut
) external
```

Removes liquidity from the AMM, and sells all hTokens for the underlying.

Requirements:

- The caller must have allowed the DSProxy to spend `poolTokensBurned` tokens.

#### Parameters

| Name               | Type               | Description                                                          |
| :----------------- | :----------------- | :------------------------------------------------------------------- |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                                |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.                                     |
| `minUnderlyingOut` | uint256            | The minimum amount of underlying that the user is willing to accept. |

### removeLiquidityAndSellHTokenWithSignature

```solidity
function removeLiquidityAndSellHTokenWithSignature(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned,
    uint256 minUnderlyingOut,
    uint256 deadline,
    bytes signatureLPToken
) external
```

Removes liquidity from the AMM, and sells all hTokens for underlying using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `poolTokensBurned`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type               | Description                                                          |
| :----------------- | :----------------- | :------------------------------------------------------------------- |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                                |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.                                     |
| `minUnderlyingOut` | uint256            | The minimum amount of underlying that the user is willing to accept. |
| `deadline`         | uint256            | The deadline beyond which the signature is not valid anymore.        |
| `signatureLPToken` | bytes              | The packed signature for LP tokens.                                  |

### removeLiquidityWithSignature

```solidity
function removeLiquidityWithSignature(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned,
    uint256 deadline,
    bytes signatureLPToken
) external
```

Removes liquidity from the AMM using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `poolTokensBurned`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type               | Description                                                   |
| :----------------- | :----------------- | :------------------------------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                         |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.                              |
| `deadline`         | uint256            | The deadline beyond which the signature is not valid anymore. |
| `signatureLPToken` | bytes              | The packed signature for LP tokens.                           |

### repayBorrow

```solidity
function repayBorrow(
    contract IBalanceSheetV2 balanceSheet,
    contract IHToken hToken,
    uint256 repayAmount
) external
```

Repays the hToken borrow.

Requirements:

- The caller must have allowed the DSProxy to spend `repayAmount` hTokens.

#### Parameters

| Name           | Type                     | Description                               |
| :------------- | :----------------------- | :---------------------------------------- |
| `balanceSheet` | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `hToken`       | contract IHToken         | The address of the HToken contract.       |
| `repayAmount`  | uint256                  | The amount of hTokens to repay.           |

### repayBorrowWithSignature

```solidity
function repayBorrowWithSignature(
    contract IBalanceSheetV2 balanceSheet,
    contract IHToken hToken,
    uint256 repayAmount,
    uint256 deadline,
    bytes signatureHToken
) external
```

Repays the hToken borrow using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `repayAmount`
  hTokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name              | Type                     | Description                                                   |
| :---------------- | :----------------------- | :------------------------------------------------------------ |
| `balanceSheet`    | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                     |
| `hToken`          | contract IHToken         | The address of the HToken contract.                           |
| `repayAmount`     | uint256                  | The amount of hTokens to repay.                               |
| `deadline`        | uint256                  | The deadline beyond which the signature is not valid anymore. |
| `signatureHToken` | bytes                    | The packed signature for HTokens.                             |

### sellHToken

```solidity
function sellHToken(
    contract IHifiPool hifiPool,
    uint256 hTokenIn,
    uint256 minUnderlyingOut
) external
```

Sells hTokens for underlying.

Requirements:

- The caller must have allowed DSProxy to spend `hTokenIn` tokens.

#### Parameters

| Name               | Type               | Description                                                          |
| :----------------- | :----------------- | :------------------------------------------------------------------- |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                                |
| `hTokenIn`         | uint256            | The exact amount of hTokens that the user wants to sell.             |
| `minUnderlyingOut` | uint256            | The minimum amount of underlying that the user is willing to accept. |

### sellHTokenWithSignature

```solidity
function sellHTokenWithSignature(
    contract IHifiPool hifiPool,
    uint256 hTokenIn,
    uint256 minUnderlyingOut,
    uint256 deadline,
    bytes signatureHToken
) external
```

Sells hTokens for underlying using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `hTokenIn`
  hTokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type               | Description                                                          |
| :----------------- | :----------------- | :------------------------------------------------------------------- |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                                |
| `hTokenIn`         | uint256            | The exact amount of hTokens that the user wants to sell.             |
| `minUnderlyingOut` | uint256            | The minimum amount of underlying that the user is willing to accept. |
| `deadline`         | uint256            | The deadline beyond which the signature is not valid anymore.        |
| `signatureHToken`  | bytes              | The packed signature for HTokens.                                    |

### sellUnderlying

```solidity
function sellUnderlying(
    contract IHifiPool hifiPool,
    uint256 underlyingIn,
    uint256 minHTokenOut
) external
```

Sells underlying for hTokens.

Requirements:

- The caller must have allowed DSProxy to spend `underlyingIn` tokens.

#### Parameters

| Name           | Type               | Description                                                       |
| :------------- | :----------------- | :---------------------------------------------------------------- |
| `hifiPool`     | contract IHifiPool | The address of the HifiPool contract.                             |
| `underlyingIn` | uint256            | The exact amount of underlying that the user wants to sell.       |
| `minHTokenOut` | uint256            | The minimum amount of hTokens that the user is willing to accept. |

### sellUnderlyingAndRepayBorrow

```solidity
function sellUnderlyingAndRepayBorrow(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    uint256 underlyingIn,
    uint256 minHTokenOut
) external
```

Sells underlying for hTokens, then uses them to repay the hToken borrow.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingIn` tokens.

#### Parameters

| Name             | Type                     | Description                                                                      |
| :--------------- | :----------------------- | :------------------------------------------------------------------------------- |
| `hifiPool`       | contract IHifiPool       | The address of the HifiPool contract.                                            |
| `balanceSheet`   | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                        |
| `underlyingIn`   | uint256                  | The exact amount of underlying that the user wants to sell.                      |
| `minHTokenOut`   | uint256                  | The minimum amount of hTokens that the user is willing to accept and the maximum |
| amount to repay. |

amount to repay.

### sellUnderlyingAndRepayBorrowWithSignature

```solidity
function sellUnderlyingAndRepayBorrowWithSignature(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    uint256 underlyingIn,
    uint256 minHTokenOut,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Sells underlying for hTokens, then uses them to repay the hToken borrow using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `underlyingIn`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                                      |
| :-------------------- | :----------------------- | :------------------------------------------------------------------------------- |
| `hifiPool`            | contract IHifiPool       | The address of the HifiPool contract.                                            |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                        |
| `underlyingIn`        | uint256                  | The exact amount of underlying that the user wants to sell.                      |
| `minHTokenOut`        | uint256                  | The minimum amount of hTokens that the user is willing to accept and the maximum |
| amount to repay.      |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore.                    |
| `signatureUnderlying` | bytes                    | The packed signature for the underlying.                                         |

### sellUnderlyingWithSignature

```solidity
function sellUnderlyingWithSignature(
    contract IHifiPool hifiPool,
    uint256 underlyingIn,
    uint256 minHTokenOut,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Sells underlying for hTokens using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `underlyingIn`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type               | Description                                                       |
| :-------------------- | :----------------- | :---------------------------------------------------------------- |
| `hifiPool`            | contract IHifiPool | The address of the HifiPool contract.                             |
| `underlyingIn`        | uint256            | The exact amount of underlying that the user wants to sell.       |
| `minHTokenOut`        | uint256            | The minimum amount of hTokens that the user is willing to accept. |
| `deadline`            | uint256            | The deadline beyond which the signature is not valid anymore.     |
| `signatureUnderlying` | bytes              | The packed signature for the underlying.                          |

### withdrawCollateral

```solidity
function withdrawCollateral(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20 collateral,
    uint256 withdrawAmount
) external
```

Withdraws collateral from the vault.

#### Parameters

| Name             | Type                     | Description                               |
| :--------------- | :----------------------- | :---------------------------------------- |
| `balanceSheet`   | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `collateral`     | contract IErc20          | The address of the collateral contract.   |
| `withdrawAmount` | uint256                  | The amount of collateral to withdraw.     |

### wrapEthAndDepositCollateral

```solidity
function wrapEthAndDepositCollateral(
    contract WethInterface weth,
    contract IBalanceSheetV2 balanceSheet
) external
```

Wraps ETH into WETH and makes a collateral deposit in the BalanceSheet contract.

This is a payable function so it can receive ETH transfers.

#### Parameters

| Name           | Type                     | Description                               |
| :------------- | :----------------------- | :---------------------------------------- |
| `weth`         | contract WethInterface   | The address of the WETH contract.         |
| `balanceSheet` | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |

### wrapEthAndDepositAndBorrowHTokenAndSellHToken

```solidity
function wrapEthAndDepositAndBorrowHTokenAndSellHToken(
    contract WethInterface weth,
    contract IBalanceSheetV2 balanceSheet,
    contract IHifiPool hifiPool,
    uint256 borrowAmount,
    uint256 minUnderlyingOut
) external
```

Wraps ETH into WETH, deposits collateral into the vault, borrows hTokens and sells them.

This is a payable function so it can receive ETH transfers.

#### Parameters

| Name               | Type                     | Description                                                          |
| :----------------- | :----------------------- | :------------------------------------------------------------------- |
| `weth`             | contract WethInterface   | The address of the WETH contract.                                    |
| `balanceSheet`     | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                            |
| `hifiPool`         | contract IHifiPool       | The address of the HifiPool contract.                                |
| `borrowAmount`     | uint256                  | The exact amount of hTokens to borrow and sell for underlying.       |
| `minUnderlyingOut` | uint256                  | The minimum amount of underlying that the user is willing to accept. |

## Events

### BorrowHTokenAndBuyUnderlying

```solidity
event BorrowHTokenAndBuyUnderlying(
    address borrower,
    uint256 borrowAmount,
    uint256 underlyingAmount
)
```

Emitted when hTokens are borrowed and used to buy underlying.

#### Parameters

| Name               | Type    | Description                              |
| :----------------- | :------ | :--------------------------------------- |
| `borrower`         | address | The address of the borrower.             |
| `borrowAmount`     | uint256 | The amount of hTokens borrowed and sold. |
| `underlyingAmount` | uint256 | The amount of underlying bought.         |

### BorrowHTokenAndSellHToken

```solidity
event BorrowHTokenAndSellHToken(
    address borrower,
    uint256 borrowAmount,
    uint256 underlyingAmount
)
```

Emitted when hTokens are borrowed and sold for underlying.

#### Parameters

| Name               | Type    | Description                              |
| :----------------- | :------ | :--------------------------------------- |
| `borrower`         | address | The address of the borrower.             |
| `borrowAmount`     | uint256 | The amount of hTokens borrowed and sold. |
| `underlyingAmount` | uint256 | The amount of underlying bought.         |

## Custom Errors

### HifiProxyTarget\_\_AddLiquidityHTokenSlippage

```solidity
error HifiProxyTarget__AddLiquidityHTokenSlippage(uint256 expectedHTokenRequired, uint256 actualHTokenRequired)
```

Emitted when the hToken slippage is higher than what the user is willing to tolerate.

### HifiProxyTarget\_\_AddLiquidityUnderlyingSlippage

```solidity
error HifiProxyTarget__AddLiquidityUnderlyingSlippage(uint256 expectedUnderlyingRequired, uint256 actualUnderlyingRequired)
```

Emitted when the underlying slippage is higher than what the user is willing to tolerate.

### HifiProxyTarget\_\_TradeSlippage

```solidity
error HifiProxyTarget__TradeSlippage(uint256 expectedAmount, uint256 actualAmount)
```

Emitted when the slippage is higher than what the user is willing to tolerate.
