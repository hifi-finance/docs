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
function balanceSheet() external view returns (IBalanceSheetV2);
```

The `BalanceSheet` contract

### getRepayAmount

```solidity
function getRepayAmount(
    IUniswapV2Pair pair,
    IErc20 underlying,
    uint256 underlyingAmount
) external view returns (uint256 repayAmount);
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

| Name               | Type                    | Description                             |
| :----------------- | :---------------------- | :-------------------------------------- |
| `pair`             | contract IUniswapV2Pair | The Uniswap V2 pair contract            |
| `underlying`       | contract IErc20         | The address of the underlying contract  |
| `underlyingAmount` | uint256                 | The amount of underlying flash borrowed |

#### Return Values

| Name          | Type    | Description                            |
| :------------ | :------ | :------------------------------------- |
| `repayAmount` | uint256 | The minimum amount that must be repaid |

### uniV2Factory

```solidity
function uniV2Factory() external view returns (address);
```

The address of the UniswapV2Factory contract.

### uniV2PairInitCodeHash

```solidity
function uniV2PairInitCodeHash() external view returns (bytes32);
```

The init code hash of the UniswapV2Pair contract.

## Events

### FlashSwapAndLiquidateBorrow

```solidity
event FlashSwapAndLiquidateBorrow(
    address indexed liquidator,
    address indexed borrower,
    address indexed bond,
    uint256 underlyingAmount,
    uint256 seizeAmount,
    uint256 repayAmount,
    uint256 subsidyAmount,
    uint256 profitAmount
);
```

Emitted when a flash swap is made and an account is liquidated.

#### Parameters

| Name               | Type    | Description                                                       |
| :----------------- | :------ | :---------------------------------------------------------------- |
| `liquidator`       | address | The address of the liquidator account.                            |
| `borrower`         | address | The address of the borrower account being liquidated.             |
| `bond`             | address | The address of the hToken contract.                               |
| `underlyingAmount` | uint256 | The amount of underlying flash borrowed.                          |
| `repayAmount`      | uint256 | The amount of collateral that had to be repaid by the liquidator. |
| `subsidyAmount`    | uint256 | The amount of collateral subsidized by the liquidator.            |
| `profitAmount`     | uint256 | The amount of collateral pocketed as profit by the liquidator.    |
