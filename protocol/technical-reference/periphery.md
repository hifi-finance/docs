---
id: periphery
title: Periphery
sidebar_position: 4
---

# Periphery

The Hifi protocol is architected it in such a way that every function does one job only. In software engineering
parlance, this is called separation of concerns, a design principles which makes it easier to reason about how the
protocol behaves. More importantly, it gives the protocol better security guarantees.

But modularization comes with a cost. In order to provide a good user experience in our user interface, we have to
"compose" multiple contract calls. This is where [DSProxy](https://github.com/dapphub/ds-proxy) comes into play -
a smart contract wallet designed to address this need.

For brevity, we won't expound on the technical properties of DSProxy here. For a detailed explanation, you can refer to
this [guide](https://ethereum.stackexchange.com/questions/90303/what-is-dsproxy-and-how-does-it-work). In short:

1. DSProxy is a smart contract wallet.
2. There is a so-called "target contract" that contains composite scripts, toward which the DSProxy delegate calls.

Is it the target contract that is documented in the sections below.

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

### borrowHToken

```solidity
function borrowHToken(
    contract IBalanceSheetV1 balanceSheet,
    contract IHToken hToken,
    uint256 borrowAmount
) external
```

Borrows hTokens.

#### Parameters

| Name           | Type                     | Description                               |
| :------------- | :----------------------- | :---------------------------------------- |
| `balanceSheet` | contract IBalanceSheetV1 | The address of the BalanceSheet contract. |
| `hToken`       | contract IHToken         | The address of the HToken contract.       |
| `borrowAmount` | uint256                  | The amount of hTokens to borrow.          |

### borrowHTokenAndAddLiquidity

```solidity
function borrowHTokenAndAddLiquidity(
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`      | contract IBalanceSheetV1 | The address of the BalanceSheet contract.                                              |
| `hifiPool`          | contract IHifiPool       | The address of the HifiPool contract.                                                  |
| `maxBorrowAmount`   | uint256                  | The amount of hTokens to borrow and the max amount that the user is willing to invest. |
| `underlyingOffered` | uint256                  | The amount of underlying to invest.                                                    |

### borrowHTokenAndBuyUnderlying

```solidity
function borrowHTokenAndBuyUnderlying(
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`    | contract IBalanceSheetV1 | The address of the BalanceSheet contract.                                           |
| `hifiPool`        | contract IHifiPool       | The address of the HifiPool contract.                                               |
| `maxBorrowAmount` | uint256                  | The amount of hTokens to borrow and the max amount that the user is willing to pay. |
| `underlyingOut`   | uint256                  | The exact amount of underlying that the user wants to buy.                          |

### borrowHTokenAndSellHToken

```solidity
function borrowHTokenAndSellHToken(
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`     | contract IBalanceSheetV1 | The address of the BalanceSheet contract.                            |
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

### buyHTokenAndRepayBorrow

```solidity
function buyHTokenAndRepayBorrow(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`    | contract IBalanceSheetV1 | The address of the BalanceSheet contract.                                                   |
| `maxUnderlyingIn` | uint256                  | The maximum amount of underlying that the user is willing to pay.                           |
| `hTokenOut`       | uint256                  | The exact amount of hTokens to buy and the amount to repay and the maximum amount to repay. |

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

### depositCollateral

```solidity
function depositCollateral(
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`  | contract IBalanceSheetV1 | The address of the BalanceSheet contract. |
| `collateral`    | contract IErc20          | The address of the collateral contract.   |
| `depositAmount` | uint256                  | The amount of collateral to deposit.      |

### depositCollateralAndBorrowHToken

```solidity
function depositCollateralAndBorrowHToken(
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`  | contract IBalanceSheetV1 | The address of the BalanceSheet contract. |
| `collateral`    | contract IErc20          | The address of the collateral contract.   |
| `hToken`        | contract IHToken         | The address of the HToken contract.       |
| `depositAmount` | uint256                  | The amount of collateral to deposit.      |
| `borrowAmount`  | uint256                  | The amount of hTokens to borrow.          |

### depositCollateralAndBorrowHTokenAndAddLiquidity

```solidity
function depositCollateralAndBorrowHTokenAndAddLiquidity(
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`      | contract IBalanceSheetV1 | The address of the BalanceSheet contract.                                              |
| `collateral`        | contract IErc20          | The address of the collateral contract.                                                |
| `hifiPool`          | contract IHifiPool       | The address of the HifiPool contract.                                                  |
| `depositAmount`     | uint256                  | The amount of collateral to deposit.                                                   |
| `maxBorrowAmount`   | uint256                  | The amount of hTokens to borrow and the max amount that the user is willing to invest. |
| `underlyingOffered` | uint256                  | The amount of underlying to invest.                                                    |

### depositCollateralAndBorrowHTokenAndSellHToken

```solidity
function depositCollateralAndBorrowHTokenAndSellHToken(
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`     | contract IBalanceSheetV1 | The address of the BalanceSheet contract.                            |
| `collateral`       | contract IErc20          | The address of the collateral contract.                              |
| `hifiPool`         | contract IHifiPool       | The address of the HifiPool contract.                                |
| `depositAmount`    | uint256                  | The amount of collateral to deposit.                                 |
| `borrowAmount`     | uint256                  | The exact amount of hTokens to borrow.                               |
| `minUnderlyingOut` | uint256                  | The minimum amount of underlying that the user is willing to accept. |

### depositUnderlyingAsCollateralAndBorrowHTokenAndAddLiquidity

```solidity
function depositUnderlyingAsCollateralAndBorrowHTokenAndAddLiquidity(
    contract IBalanceSheetV1 balanceSheet,
    contract IHifiPool hifiPool,
    uint256 depositAmount,
    uint256 underlyingOffered
) external
```

Deposits underlying as collateral into the vault, borrows hTokens and adds liquidity to the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `depositAmount + underlyingOffered` tokens.

#### Parameters

| Name                | Type                     | Description                                        |
| :------------------ | :----------------------- | :------------------------------------------------- |
| `balanceSheet`      | contract IBalanceSheetV1 | The address of the BalanceSheet contract.          |
| `hifiPool`          | contract IHifiPool       | The address of the HifiPool contract.              |
| `depositAmount`     | uint256                  | The amount of underlying to deposit as collateral. |
| `underlyingOffered` | uint256                  | The amount of underlying to invest.                |

### redeemHToken

```solidity
function redeemHToken(
    contract IHToken hToken,
    uint256 hTokenAmount
) external
```

Redeems hTokens for underlying.

Requirements:

- The caller must have allowed the DSProxy to spend `hTokenAmount` hTokens.

#### Parameters

| Name           | Type             | Description                         |
| :------------- | :--------------- | :---------------------------------- |
| `hToken`       | contract IHToken | The address of the HToken contract. |
| `hTokenAmount` | uint256          | The amount of hTokens to redeem.    |

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

### removeLiquidityAndRedeemHToken

```solidity
function removeLiquidityAndRedeemHToken(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned
) external
```

Removes liquidity from the AMM, and redeems all hTokens for underlying.

Requirements:

- The caller must have allowed the DSProxy to spend `poolTokensBurned` tokens.

#### Parameters

| Name               | Type               | Description                           |
| :----------------- | :----------------- | :------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract. |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.      |

### removeLiquidityAndRepayBorrowAndWithdrawCollateral

```solidity
function removeLiquidityAndRepayBorrowAndWithdrawCollateral(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`     | contract IBalanceSheetV1 | The address of the BalanceSheet contract. |
| `collateral`       | contract IErc20          | The address of the collateral contract.   |
| `poolTokensBurned` | uint256                  | The amount of LP tokens to burn.          |
| `repayAmount`      | uint256                  | The amount of hTokens to repay.           |
| `withdrawAmount`   | uint256                  | The amount of collateral to withdraw.     |

### removeLiquidityAndSellHToken

```solidity
function removeLiquidityAndSellHToken(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned,
    uint256 minUnderlyingOut
) external
```

Removes liquidity from the AMM, and sells all hTokens for underlying.

Requirements:

- The caller must have allowed the DSProxy to spend `poolTokensBurned` tokens.

#### Parameters

| Name               | Type               | Description                                                          |
| :----------------- | :----------------- | :------------------------------------------------------------------- |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                                |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.                                     |
| `minUnderlyingOut` | uint256            | The minimum amount of underlying that the user is willing to accept. |

### repayBorrow

```solidity
function repayBorrow(
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet` | contract IBalanceSheetV1 | The address of the BalanceSheet contract. |
| `hToken`       | contract IHToken         | The address of the HToken contract.       |
| `repayAmount`  | uint256                  | The amount of hTokens to repay.           |

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
    contract IBalanceSheetV1 balanceSheet,
    uint256 underlyingIn,
    uint256 minHTokenOut
) external
```

Sells underlying for hTokens, then uses them to repay the hToken borrow.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingIn` tokens.

#### Parameters

| Name           | Type                     | Description                                                                      |
| :------------- | :----------------------- | :------------------------------------------------------------------------------- |
| `hifiPool`     | contract IHifiPool       | The address of the HifiPool contract.                                            |
| `balanceSheet` | contract IBalanceSheetV1 | The address of the BalanceSheet contract.                                        |
| `underlyingIn` | uint256                  | The exact amount of underlying that the user wants to sell.                      |
| `minHTokenOut` | uint256                  | The minimum amount of hTokens that the user is willing to accept and the maximum |

amount to repay.

### supplyUnderlying

```solidity
function supplyUnderlying(
    contract IHToken hToken,
    uint256 underlyingAmount
) external
```

Supplies the underlying to mint hTokens.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingAmount` tokens.

#### Parameters

| Name               | Type             | Description                         |
| :----------------- | :--------------- | :---------------------------------- |
| `hToken`           | contract IHToken | The address of the HToken contract. |
| `underlyingAmount` | uint256          | The amount of underlying to supply. |

### supplyUnderlyingAndRepayBorrow

```solidity
function supplyUnderlyingAndRepayBorrow(
    contract IHToken hToken,
    contract IBalanceSheetV1 balanceSheet,
    uint256 underlyingAmount
) external
```

Supplies underlying to mint hTokens and repay the hToken borrow.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingAmount` tokens.

#### Parameters

| Name               | Type                     | Description                               |
| :----------------- | :----------------------- | :---------------------------------------- |
| `hToken`           | contract IHToken         | The address of the HToken contract.       |
| `balanceSheet`     | contract IBalanceSheetV1 | The address of the BalanceSheet contract. |
| `underlyingAmount` | uint256                  | The amount of underlying to supply.       |

### withdrawCollateral

```solidity
function withdrawCollateral(
    contract IBalanceSheetV1 balanceSheet,
    contract IErc20 collateral,
    uint256 withdrawAmount
) external
```

Withdraws collateral from the vault.

#### Parameters

| Name             | Type                     | Description                               |
| :--------------- | :----------------------- | :---------------------------------------- |
| `balanceSheet`   | contract IBalanceSheetV1 | The address of the BalanceSheet contract. |
| `collateral`     | contract IErc20          | The address of the collateral contract.   |
| `withdrawAmount` | uint256                  | The amount of collateral to withdraw.     |

### wrapEthAndDepositCollateral

```solidity
function wrapEthAndDepositCollateral(
    contract WethInterface weth,
    contract IBalanceSheetV1 balanceSheet
) external
```

Wraps ETH into WETH and make a collateral deposit in the BalanceSheet contract.

This is a payable function so it can receive ETH transfers.

#### Parameters

| Name           | Type                     | Description                               |
| :------------- | :----------------------- | :---------------------------------------- |
| `weth`         | contract WethInterface   | The address of the WETH contract.         |
| `balanceSheet` | contract IBalanceSheetV1 | The address of the BalanceSheet contract. |

### wrapEthAndDepositAndBorrowHTokenAndSellHToken

```solidity
function wrapEthAndDepositAndBorrowHTokenAndSellHToken(
    contract WethInterface weth,
    contract IBalanceSheetV1 balanceSheet,
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
| `balanceSheet`     | contract IBalanceSheetV1 | The address of the BalanceSheet contract.                            |
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

#### Parameters:

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

#### Parameters:

| Name               | Type    | Description                              |
| :----------------- | :------ | :--------------------------------------- |
| `borrower`         | address | The address of the borrower.             |
| `borrowAmount`     | uint256 | The amount of hTokens borrowed and sold. |
| `underlyingAmount` | uint256 | The amount of underlying bought.         |
