---
id: balance-sheet
title: Balance Sheet
sidebar_position: 1
---

# Balance Sheet

The `BalanceSheet` is the global debt registry for Hifi. It tracks the collateral deposits and the debt taken on by all
users.

When a user borrow hTokens, a vault is opened for them in the `BalanceSheet`. All vaults are recorded and managed in
this contract.

This is the only upgradeable contract in the Hifi protocol. The most up to date version is the [BalanceSheetV2](https://github.com/hifi-finance/hifi/blob/%40hifi/protocol%401.9.0/packages/protocol/contracts/core/balance-sheet/BalanceSheetV2.sol).

## Constant Functions

### getBondList

```solidity
function getBondList(
    address account
) external returns (contract IHToken[])
```

Returns the list of bond markets the given account entered.

It is not an error to provide an invalid address.

#### Parameters

| Name      | Type    | Description                                     |
| :-------- | :------ | :---------------------------------------------- |
| `account` | address | The borrower account to make the query against. |

### getCollateralAmount

```solidity
function getCollateralAmount(
    address account,
    contract IErc20 collateral
) external returns (uint256 collateralAmount)
```

Returns the amount of collateral deposited by the given account for the given collateral type.

It is not an error to provide an invalid address.

#### Parameters

| Name         | Type            | Description                                     |
| :----------- | :-------------- | :---------------------------------------------- |
| `account`    | address         | The borrower account to make the query against. |
| `collateral` | contract IErc20 | The collateral to make the query against.       |

### getCollateralList

```solidity
function getCollateralList(
    address account
) external returns (contract IErc20[])
```

Returns the list of collaterals the given account deposited.

It is not an error to provide an invalid address.

#### Parameters

| Name      | Type    | Description                                     |
| :-------- | :------ | :---------------------------------------------- |
| `account` | address | The borrower account to make the query against. |

### getCurrentAccountLiquidity

```solidity
function getCurrentAccountLiquidity(
    address account
) external returns (uint256 excessLiquidity, uint256 shortfallLiquidity)
```

Calculates the current account liquidity.

#### Parameters

| Name      | Type    | Description                            |
| :-------- | :------ | :------------------------------------- |
| `account` | address | The account to make the query against. |

#### Return Values

| Name                 | Type    | Description                                             |
| :------------------- | :------ | :------------------------------------------------------ |
| `excessLiquidity`    | address | account liquidity in excess of collateral requirements. |
| `shortfallLiquidity` |         | account shortfall below collateral requirements         |

### getDebtAmount

```solidity
function getDebtAmount(
    address account,
    contract IHToken bond
) external returns (uint256 debtAmount)
```

Returns the amount of debt accrued by the given account in the given bond market.

It is not an error to provide an invalid address.

#### Parameters

| Name      | Type             | Description                                     |
| :-------- | :--------------- | :---------------------------------------------- |
| `account` | address          | The borrower account to make the query against. |
| `bond`    | contract IHToken | The bond to make the query against.             |

### getHypotheticalAccountLiquidity

```solidity
function getHypotheticalAccountLiquidity(
    address account,
    contract IErc20 collateralModify,
    uint256 collateralAmountModify,
    contract IHToken bondModify,
    uint256 debtAmountModify
) external returns (uint256 excessLiquidity, uint256 shortfallLiquidity)
```

Calculates the account liquidity given a modified collateral, collateral amount, bond and debt amount,
using the current prices provided by the oracle.

Works by summing up each collateral amount multiplied by the USD value of each unit and divided by its
respective collateral ratio, then dividing the sum by the total amount of debt drawn by the user.

Caveats:

- This function expects that the "collateralList" and the "bondList" are each modified in advance to include
  the collateral and bond due to be modified.

#### Parameters

| Name                     | Type             | Description                                       |
| :----------------------- | :--------------- | :------------------------------------------------ |
| `account`                | address          | The account to make the query against.            |
| `collateralModify`       | contract IErc20  | The collateral to make the check against.         |
| `collateralAmountModify` | uint256          | The hypothetical normalized amount of collateral. |
| `bondModify`             | contract IHToken | The bond to make the check against.               |
| `debtAmountModify`       | uint256          | The hypothetical amount of debt.                  |

#### Return Values

| Name                 | Type            | Description                                                          |
| :------------------- | :-------------- | :------------------------------------------------------------------- |
| `excessLiquidity`    | address         | hypothetical account liquidity in excess of collateral requirements. |
| `shortfallLiquidity` | contract IErc20 | hypothetical account shortfall below collateral requirements         |

### getRepayAmount

```solidity
function getRepayAmount(
    contract IErc20 collateral,
    uint256 seizableCollateralAmount,
    contract IHToken bond
) external returns (uint256 repayAmount)
```

Calculates the amount of hTokens that should be repaid in order to seize a given amount of collateral.
Note that this is for informational purposes only, it doesn't say anything about whether the user can be
liquidated.

The formula applied:

$$
repayAmount = \frac{seizableCollateralAmount * collateralPrice}{liquidationIncentive * underlyingPrice}
$$

#### Parameters

| Name                       | Type             | Description                               |
| :------------------------- | :--------------- | :---------------------------------------- |
| `collateral`               | contract IErc20  | The collateral to make the query against. |
| `seizableCollateralAmount` | uint256          | The amount of collateral to seize.        |
| `bond`                     | contract IHToken | The bond to make the query against.       |

#### Return Values

| Name          | Type            | Description                                  |
| :------------ | :-------------- | :------------------------------------------- |
| `repayAmount` | contract IErc20 | The amount of hTokens that should be repaid. |

### getSeizableCollateralAmount

```solidity
function getSeizableCollateralAmount(
    contract IHToken bond,
    uint256 repayAmount,
    contract IErc20 collateral
) external returns (uint256 seizableCollateralAmount)
```

Calculates the amount of collateral that can be seized when liquidating a borrow. Note that this
is for informational purposes only, it doesn't say anything about whether the user can be liquidated.

The formula applied:

$$
seizableCollateralAmount = \frac{repayAmount * liquidationIncentive * underlyingPrice}{collateralPrice}
$$

#### Parameters

| Name          | Type             | Description                               |
| :------------ | :--------------- | :---------------------------------------- |
| `bond`        | contract IHToken | The bond to make the query against.       |
| `repayAmount` | uint256          | The amount of hTokens to repay.           |
| `collateral`  | contract IErc20  | The collateral to make the query against. |

#### Return Values

| Name                       | Type             | Description                        |
| :------------------------- | :--------------- | :--------------------------------- |
| `seizableCollateralAmount` | contract IHToken | The amount of seizable collateral. |

## Non-Constant Functions

### borrow

```solidity
function borrow(
    contract IHToken bond,
    uint256 borrowAmount
) external
```

Increases the debt of the caller and mints new hTokens.

Emits a {Borrow} event.

Requirements:

- The Fintroller must allow this action to be performed.
- The maturity of the bond must be in the future.
- The amount to borrow cannot be zero.
- The new length of the bond list must be below the max bonds limit.
- The new total amount of debt cannot exceed the debt ceiling.
- The caller must not end up having a shortfall of liquidity.

#### Parameters

| Name           | Type             | Description                                               |
| :------------- | :--------------- | :-------------------------------------------------------- |
| `bond`         | contract IHToken | The address of the bond contract.                         |
| `borrowAmount` | uint256          | The amount of hTokens to borrow and print into existence. |

### depositCollateral

```solidity
function depositCollateral(
    contract IErc20 collateral,
    uint256 depositAmount
) external
```

Deposits collateral in the caller's account.

Emits a {DepositCollateral} event.

Requirements:

- The Fintroller must allow this action to be performed.
- The amount to deposit cannot be zero.
- The caller must have allowed this contract to spend `collateralAmount` tokens.
- The new collateral amount cannot exceed the collateral ceiling.

#### Parameters

| Name            | Type            | Description                             |
| :-------------- | :-------------- | :-------------------------------------- |
| `collateral`    | contract IErc20 | The address of the collateral contract. |
| `depositAmount` | uint256         | The amount of collateral to deposit.    |

### liquidateBorrow

```solidity
function liquidateBorrow(
    address bond,
    contract IHToken borrower,
    uint256 repayAmount,
    contract IErc20 collateral
) external
```

Repays the debt of the borrower and rewards the caller with a surplus of collateral.

Emits a {LiquidateBorrow} event.

Requirements:

- All from "repayBorrow".
- The caller cannot be the same with the borrower.
- The Fintroller must allow this action to be performed.
- The borrower must have a shortfall of liquidity if the bond didn't mature.
- The amount of seized collateral cannot be more than what the borrower has in the vault.

#### Parameters

| Name          | Type             | Description                             |
| :------------ | :--------------- | :-------------------------------------- |
| `bond`        | address          | The address of the bond contract.       |
| `borrower`    | contract IHToken | The account to liquidate.               |
| `repayAmount` | uint256          | The amount of hTokens to repay.         |
| `collateral`  | contract IErc20  | The address of the collateral contract. |

### repayBorrow

```solidity
function repayBorrow(
    contract IHToken bond,
    uint256 repayAmount
) external
```

Erases the borrower's debt and takes the hTokens out of circulation.

Emits a {RepayBorrow} event.

Requirements:

- The amount to repay cannot be zero.
- The Fintroller must allow this action to be performed.
- The caller must have at least `repayAmount` hTokens.
- The caller must have at least `repayAmount` debt.

#### Parameters

| Name          | Type             | Description                       |
| :------------ | :--------------- | :-------------------------------- |
| `bond`        | contract IHToken | The address of the bond contract. |
| `repayAmount` | uint256          | The amount of hTokens to repay.   |

### repayBorrowBehalf

```solidity
function repayBorrowBehalf(
    address borrower,
    contract IHToken bond,
    uint256 repayAmount
) external
```

Erases the borrower's debt and takes the hTokens out of circulation.

Emits a {RepayBorrow} event.

Requirements:

- Same as the `repayBorrow` function, but here `borrower` is the account that must have at least
  `repayAmount` hTokens to repay the borrow.

#### Parameters

| Name          | Type             | Description                                         |
| :------------ | :--------------- | :-------------------------------------------------- |
| `borrower`    | address          | The borrower account for which to repay the borrow. |
| `bond`        | contract IHToken | The address of the bond contract                    |
| `repayAmount` | uint256          | The amount of hTokens to repay.                     |

### setFintroller

```solidity
function setFintroller(
    contract IFintroller newFintroller
) external
```

Updates the Fintroller contract this BalanceSheet is connected to.

Emits a {SetFintroller} event.

Requirements:

- The caller must be the owner.
- The new address cannot be the zero address.

#### Parameters

| Name            | Type                 | Description                  |
| :-------------- | :------------------- | :--------------------------- |
| `newFintroller` | contract IFintroller | The new Fintroller contract. |

### setOracle

```solidity
function setOracle(
    contract IChainlinkOperator newOracle
) external
```

Updates the oracle contract.

Emits a {SetOracle} event.

Requirements:

- The caller must be the owner.
- The new address cannot be the zero address.

#### Parameters

| Name        | Type                        | Description              |
| :---------- | :-------------------------- | :----------------------- |
| `newOracle` | contract IChainlinkOperator | The new oracle contract. |

### withdrawCollateral

```solidity
function withdrawCollateral(
    contract IErc20 collateral,
    uint256 withdrawAmount
) external
```

Withdraws a portion or all of the collateral.

Emits a {WithdrawCollateral} event.

Requirements:

- The amount to withdraw cannot be zero.
- There must be enough collateral in the vault.
- The caller's account cannot fall below the collateral ratio.

#### Parameters

| Name             | Type            | Description                             |
| :--------------- | :-------------- | :-------------------------------------- |
| `collateral`     | contract IErc20 | The address of the collateral contract. |
| `withdrawAmount` | uint256         | The amount of collateral to withdraw.   |

## Events

### Borrow

```solidity
event Borrow(
    address account,
    contract IHToken bond,
    uint256 borrowAmount
)
```

Emitted when a borrow is made.

#### Parameters

| Name           | Type             | Description                       |
| :------------- | :--------------- | :-------------------------------- |
| `account`      | address          | The address of the borrower.      |
| `bond`         | contract IHToken | The address of the bond contract. |
| `borrowAmount` | uint256          | The amount of hTokens borrowed.   |

### DepositCollateral

```solidity
event DepositCollateral(
    address account,
    contract IErc20 collateral,
    uint256 collateralAmount
)
```

Emitted when collateral is deposited.

#### Parameters

| Name               | Type            | Description                         |
| :----------------- | :-------------- | :---------------------------------- |
| `account`          | address         | The address of the borrower.        |
| `collateral`       | contract IErc20 | The related collateral.             |
| `collateralAmount` | uint256         | The amount of deposited collateral. |

### LiquidateBorrow

```solidity
event LiquidateBorrow(
    address liquidator,
    address borrower,
    contract IHToken bond,
    uint256 repayAmount,
    contract IErc20 collateral,
    uint256 seizedCollateralAmount
)
```

Emitted when a borrow is liquidated.

#### Parameters

| Name                     | Type             | Description                             |
| :----------------------- | :--------------- | :-------------------------------------- |
| `liquidator`             | address          | The address of the liquidator.          |
| `borrower`               | address          | The address of the borrower.            |
| `bond`                   | contract IHToken | The address of the bond contract.       |
| `repayAmount`            | uint256          | The amount of repaid funds.             |
| `collateral`             | contract IErc20  | The address of the collateral contract. |
| `seizedCollateralAmount` | uint256          | The amount of seized collateral.        |

### RepayBorrow

```solidity
event RepayBorrow(
    address payer,
    address borrower,
    contract IHToken bond,
    uint256 repayAmount,
    uint256 newDebtAmount
)
```

Emitted when a borrow is repaid.

#### Parameters

| Name            | Type             | Description                       |
| :-------------- | :--------------- | :-------------------------------- |
| `payer`         | address          | The address of the payer.         |
| `borrower`      | address          | The address of the borrower.      |
| `bond`          | contract IHToken | The address of the bond contract. |
| `repayAmount`   | uint256          | The amount of repaid funds.       |
| `newDebtAmount` | uint256          | The amount of the new debt.       |

### SetFintroller

```solidity
event SetFintroller(
    address owner,
    address oldFintroller,
    address newFintroller
)
```

Emitted when a new Fintroller contract is set.

#### Parameters

| Name            | Type    | Description                                 |
| :-------------- | :------ | :------------------------------------------ |
| `owner`         | address | The address of the owner.                   |
| `oldFintroller` | address | The address of the old Fintroller contract. |
| `newFintroller` | address | The address of the new Fintroller contract. |

### SetOracle

```solidity
event SetOracle(
    address owner,
    address oldOracle,
    address newOracle
)
```

Emitted when a new oracle contract is set.

#### Parameters

| Name        | Type    | Description                             |
| :---------- | :------ | :-------------------------------------- |
| `owner`     | address | The address of the owner.               |
| `oldOracle` | address | The address of the old oracle contract. |
| `newOracle` | address | The address of the new oracle contract. |

### WithdrawCollateral

```solidity
event WithdrawCollateral(
    address account,
    contract IErc20 collateral,
    uint256 collateralAmount
)
```

Emitted when collateral is withdrawn.

#### Parameters

| Name               | Type            | Description                         |
| :----------------- | :-------------- | :---------------------------------- |
| `account`          | address         | The address of the borrower.        |
| `collateral`       | contract IErc20 | The related collateral.             |
| `collateralAmount` | uint256         | The amount of withdrawn collateral. |
