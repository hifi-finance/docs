---
id: flash-uniswap-v2
title: Flash Uniswap V2
sidebar_position: 1
---

# Flash Uniswap V2

Integration of Uniswap V2 flash swaps for liquidating underwater accounts in Hifi.

## Constant Functions

### balanceSheet

```solidity
function balanceSheet() external returns (contract IBalanceSheetV2)
```

The `BalanceSheet` contract.

### getRepayAmount

```solidity
function getRepayAmount(
    contract IUniswapV2Pair pair,
    contract IErc20 underlying,
    uint256 underlyingAmount
) external returns (uint256 repayAmount)
```

Calculates the amount of that must be repaid to Uniswap. When the collateral is not the underlying, the formula used is:

$$
repayAmount = \frac{(collateralReserves * underlyingAmount) * 1000}{(underlyingReserves - underlyingAmount) * 997}
$$

Otherwise, the formula used is:

$$
repayAmount = \frac{underlyingAmount * 1000}{997}
$$

See "getAmountIn" and "getAmountOut" in `UniswapV2Library`. Flash swaps that are repaid via the corresponding pair token are akin to a normal swap, so the 0.3% LP fee applies.

#### Parameters

| Name               | Type                    | Description                              |
| :----------------- | :---------------------- | :--------------------------------------- |
| `pair`             | contract IUniswapV2Pair | The Uniswap V2 pair contract.            |
| `underlying`       | contract IErc20         | The address of the underlying contract.  |
| `underlyingAmount` | uint256                 | The amount of underlying flash borrowed. |

#### Return Values

| Name          | Type    | Description                             |
| :------------ | :------ | :-------------------------------------- |
| `repayAmount` | uint256 | The minimum amount that must be repaid. |

### uniV2Factory

```solidity
function uniV2Factory() external returns (address)
```

The address of the UniswapV2Factory contract.

### uniV2PairInitCodeHash

```solidity
function uniV2PairInitCodeHash() external returns (bytes32)
```

The init code hash of the UniswapV2Pair contract.

## Events

### FlashSwapAndLiquidateBorrow

```solidity
event FlashSwapAndLiquidateBorrow(
    address liquidator,
    address borrower,
    address bond,
    uint256 underlyingAmount,
    uint256 seizeAmount,
    uint256 repayAmount,
    uint256 subsidyAmount,
    uint256 profitAmount
)
```

Emitted when a flash swap is made and an account is liquidated.

#### Parameters

| Name               | Type    | Description                                                       |
| :----------------- | :------ | :---------------------------------------------------------------- |
| `liquidator`       | address | The address of the liquidator account.                            |
| `borrower`         | address | The address of the borrower account being liquidated.             |
| `bond`             | address | The address of the hToken contract.                               |
| `underlyingAmount` | uint256 | The amount of underlying flash borrowed.                          |
| `seizeAmount`      | uint256 | The amount of collateral seized.                                  |
| `repayAmount`      | uint256 | The amount of collateral that had to be repaid by the liquidator. |
| `subsidyAmount`    | uint256 | The amount of collateral subsidized by the liquidator.            |
| `profitAmount`     | uint256 | The amount of collateral pocketed as profit by the liquidator.    |

## Custom Errors

### FlashUniswapV2\_\_CallNotAuthorized

```solidity
error FlashUniswapV2__CallNotAuthorized(address caller)
```

Emitted when the caller is not the Uniswap V2 pair contract.

### FlashUniswapV2\_\_FlashBorrowCollateral

```solidity
error FlashUniswapV2__FlashBorrowCollateral(address collateral, address underlying)
```

Emitted when the flash borrowed asset is the collateral instead of the underlying.

### FlashUniswapV2\_\_LiquidateUnderlyingBackedVault

```solidity
error FlashUniswapV2__LiquidateUnderlyingBackedVault(address borrower, address underlying)
```

Emitted when liquidating a vault backed by underlying.

### FlashUniswapV2\_\_TurnoutNotSatisfied

```solidity
error FlashUniswapV2__TurnoutNotSatisfied(uint256 seizeAmount, uint256 repayAmount, int256 turnout)
```

Emitted when the liquidation either does not yield a sufficient profit or it costs more
than what the subsidizer is willing to pay.

### FlashUniswapV2\_\_UnderlyingNotInPool

```solidity
error FlashUniswapV2__UnderlyingNotInPool(contract IUniswapV2Pair pair, address token0, address token1, contract IErc20 underlying)
```

Emitted when neither the token0 nor the token1 is the underlying.
