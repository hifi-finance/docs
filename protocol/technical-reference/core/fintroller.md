---
id: fintroller
title: Fintroller
sidebar_position: 3
---

# Fintroller

Controls the financial permissions and risk parameters for the Hifi protocol.

## Constant Functions

### getBond

```solidity
function getBond(
    contract IHToken bond
) external returns (struct IFintroller.Bond)
```

Returns the Bond struct instance associated to the given address.

It is not an error to provide an invalid address.

#### Parameters

| Name  | Type                    | Description      |
| :---- | :---------------------- | :--------------- |
| `[0]` | struct IFintroller.Bond | The bond object. |

#### Return Values

| Type             | Description  |
| :--------------- | :----------- |
| contract IHToken | bond object. |

### getBorrowAllowed

```solidity
function getBorrowAllowed(
    contract IHToken bond
) external returns (bool)
```

Checks if the account should be allowed to borrow hTokens.

The bond must be listed.

#### Parameters

| Name   | Type             | Description                         |
| :----- | :--------------- | :---------------------------------- |
| `bond` | contract IHToken | The bond to make the check against. |

#### Return Values

| Name  | Type | Description                               |
| :---- | :--- | :---------------------------------------- |
| `[0]` | bool | bool true = allowed, false = not allowed. |

### getCollateral

```solidity
function getCollateral(
    contract IErc20 collateral
) external returns (struct IFintroller.Collateral)
```

Returns the Collateral struct instance associated to the given address.

It is not an error to provide an invalid address.

#### Parameters

| Name         | Type            | Description                             |
| :----------- | :-------------- | :-------------------------------------- |
| `collateral` | contract IErc20 | The address of the collateral contract. |

#### Return Values

| Name  | Type                          | Description            |
| :---- | :---------------------------- | :--------------------- |
| `[0]` | struct IFintroller.Collateral | The collateral object. |

### getCollateralCeiling

```solidity
function getCollateralCeiling(
    contract IErc20 collateral
) external returns (uint256)
```

Returns the collateral ceiling.

It is not an error to provide an invalid address.

#### Parameters

| Name         | Type            | Description                             |
| :----------- | :-------------- | :-------------------------------------- |
| `collateral` | contract IErc20 | The address of the collateral contract. |

#### Return Values

| Type            | Description                                                                  |
| :-------------- | :--------------------------------------------------------------------------- |
| contract IErc20 | collateral ceiling as a uint256, or zero if an invalid address was provided. |

### getCollateralRatio

```solidity
function getCollateralRatio(
    contract IErc20 collateral
) external returns (uint256)
```

Returns the collateral ratio.

It is not an error to provide an invalid address.

#### Parameters

| Name         | Type            | Description                             |
| :----------- | :-------------- | :-------------------------------------- |
| `collateral` | contract IErc20 | The address of the collateral contract. |

#### Return Values

| Type            | Description                                                   |
| :-------------- | :------------------------------------------------------------ |
| contract IErc20 | collateral ratio, or zero if an invalid address was provided. |

### getDebtCeiling

```solidity
function getDebtCeiling(
    contract IHToken bond
) external returns (uint256)
```

Returns the debt ceiling for the given bond.

It is not an error to provide an invalid address.

#### Parameters

| Name   | Type             | Description                       |
| :----- | :--------------- | :-------------------------------- |
| `bond` | contract IHToken | The address of the bond contract. |

#### Return Values

| Name  | Type    | Description                                                                |
| :---- | :------ | :------------------------------------------------------------------------- |
| `[0]` | uint256 | The debt ceiling as a uint256, or zero if an invalid address was provided. |

### getDepositCollateralAllowed

```solidity
function getDepositCollateralAllowed(
    contract IErc20 collateral
) external returns (bool)
```

Checks if collateral deposits are allowed.

The collateral must be listed.

#### Parameters

| Name         | Type            | Description                               |
| :----------- | :-------------- | :---------------------------------------- |
| `collateral` | contract IErc20 | The collateral to make the check against. |

#### Return Values

| Name  | Type | Description                               |
| :---- | :--- | :---------------------------------------- |
| `[0]` | bool | bool true = allowed, false = not allowed. |

### getDepositUnderlyingAllowed

```solidity
function getDepositUnderlyingAllowed(
    contract IHToken bond
) external returns (bool)
```

Checks if underlying deposits are allowed.
The bond must be listed.

#### Parameters

| Name   | Type             | Description                         |
| :----- | :--------------- | :---------------------------------- |
| `bond` | contract IHToken | The bond to make the check against. |

#### Return Values

| Name  | Type | Description                               |
| :---- | :--- | :---------------------------------------- |
| `[0]` | bool | bool true = allowed, false = not allowed. |

### getLiquidationIncentive

```solidity
function getLiquidationIncentive(
    contract IErc20 collateral
) external returns (uint256)
```

Returns the liquidation incentive of the given collateral.

It is not an error to provide an invalid address.

#### Parameters

| Name         | Type            | Description                             |
| :----------- | :-------------- | :-------------------------------------- |
| `collateral` | contract IErc20 | The address of the collateral contract. |

#### Return Values

| Name  | Type    | Description                                                            |
| :---- | :------ | :--------------------------------------------------------------------- |
| `[0]` | uint256 | The liquidation incentive, or zero if an invalid address was provided. |

### getLiquidateBorrowAllowed

```solidity
function getLiquidateBorrowAllowed(
    contract IHToken bond
) external returns (bool)
```

Checks if the account should be allowed to liquidate hToken borrows.

The bond must be listed.

#### Parameters

| Name   | Type             | Description                         |
| :----- | :--------------- | :---------------------------------- |
| `bond` | contract IHToken | The bond to make the check against. |

#### Return Values

| Name  | Type | Description                               |
| :---- | :--- | :---------------------------------------- |
| `[0]` | bool | bool true = allowed, false = not allowed. |

### getRepayBorrowAllowed

```solidity
function getRepayBorrowAllowed(
    contract IHToken bond
) external returns (bool)
```

Checks if the account should be allowed to repay borrows.

The bond must be listed.

#### Parameters

| Name   | Type             | Description                         |
| :----- | :--------------- | :---------------------------------- |
| `bond` | contract IHToken | The bond to make the check against. |

#### Return Values

| Name  | Type | Description                               |
| :---- | :--- | :---------------------------------------- |
| `[0]` | bool | bool true = allowed, false = not allowed. |

### isBondListed

```solidity
function isBondListed(
    contract IHToken bond
) external returns (bool)
```

Checks if the bond is listed.

#### Parameters

| Name   | Type             | Description                         |
| :----- | :--------------- | :---------------------------------- |
| `bond` | contract IHToken | The bond to make the check against. |

#### Return Values

| Name  | Type | Description                        |
| :---- | :--- | :--------------------------------- |
| `[0]` | bool | bool true = listed, otherwise not. |

### isCollateralListed

```solidity
function isCollateralListed(
    contract IErc20 collateral
) external returns (bool)
```

Checks if the collateral is listed.

#### Parameters

| Name         | Type            | Description                               |
| :----------- | :-------------- | :---------------------------------------- |
| `collateral` | contract IErc20 | The collateral to make the check against. |

#### Return Values

| Name  | Type | Description                        |
| :---- | :--- | :--------------------------------- |
| `[0]` | bool | bool true = listed, otherwise not. |

### maxBonds

```solidity
function maxBonds(
) external returns (uint256)
```

Returns the maximum number of bond markets a single account can enter.

## Non-Constant Functions

### listBond

```solidity
function listBond(
    contract IHToken bond
) external
```

Marks the bond as listed in this registry.

It is not an error to list a bond twice. Emits a {ListBond} event.

Requirements:

- The caller must be the owner.

#### Parameters

| Name   | Type             | Description                  |
| :----- | :--------------- | :--------------------------- |
| `bond` | contract IHToken | The hToken contract to list. |

### listCollateral

```solidity
function listCollateral(
    contract IErc20 collateral
) external
```

Marks the collateral as listed in this registry.

Emits a {ListCollateral} event. It is not an error to list a bond twice.

Requirements:

- The caller must be the owner.
- The collateral must have between 1 and 18 decimals.

#### Parameters

| Name         | Type            | Description                      |
| :----------- | :-------------- | :------------------------------- |
| `collateral` | contract IErc20 | The collateral contract to list. |

### setBorrowAllowed

```solidity
function setBorrowAllowed(
    contract IHToken bond,
    bool state
) external
```

Updates the state of the permission accessed by the hToken before a borrow.

Emits a {SetBorrowAllowed} event.

Requirements:

- The caller must be the owner.
- The bond must be listed.

#### Parameters

| Name    | Type             | Description                            |
| :------ | :--------------- | :------------------------------------- |
| `bond`  | contract IHToken | The bond to update the permission for. |
| `state` | bool             | The new state to put in storage.       |

### setCollateralCeiling

```solidity
function setCollateralCeiling(
    contract IHToken collateral,
    uint256 newCollateralCeiling
) external
```

Updates the collateral ceiling.

Emits a {SetCollateralCeiling} event.

Requirements:

- The caller must be the owner.
- The collateral must be listed.

#### Parameters

| Name                   | Type             | Description                               |
| :--------------------- | :--------------- | :---------------------------------------- |
| `collateral`           | contract IHToken | The collateral to update the ceiling for. |
| `newCollateralCeiling` | uint256          | The new collateral ceiling.               |

### setCollateralRatio

```solidity
function setCollateralRatio(
    contract IErc20 collateral,
    uint256 newCollateralRatio
) external
```

Updates the collateral ratio.

Emits a {SetCollateralRatio} event.

Requirements:

- The caller must be the owner.
- The collateral must be listed.
- The new collateral ratio cannot be higher than the maximum collateral ratio.
- The new collateral ratio cannot be lower than the minimum collateral ratio.

#### Parameters

| Name                 | Type            | Description                                        |
| :------------------- | :-------------- | :------------------------------------------------- |
| `collateral`         | contract IErc20 | The collateral to update the collateral ratio for. |
| `newCollateralRatio` | uint256         | The new collateral ratio.                          |

### setDebtCeiling

```solidity
function setDebtCeiling(
    contract IHToken bond,
    uint256 newDebtCeiling
) external
```

Updates the debt ceiling for the given bond.

Emits a {SetDebtCeiling} event.

Requirements:

- The caller must be the owner.
- The bond must be listed.
- The debt ceiling cannot fall below the current total supply of hTokens.

#### Parameters

| Name             | Type             | Description                              |
| :--------------- | :--------------- | :--------------------------------------- |
| `bond`           | contract IHToken | The bond to update the debt ceiling for. |
| `newDebtCeiling` | uint256          | The new debt ceiling.                    |

### setDepositCollateralAllowed

```solidity
function setDepositCollateralAllowed(
    contract IErc20 collateral,
    bool state
) external
```

Updates the state of the permission accessed by the BalanceSheet before a collateral deposit.

Emits a {SetDepositCollateralAllowed} event.

Requirements:

- The caller must be the owner.

#### Parameters

| Name         | Type            | Description                                  |
| :----------- | :-------------- | :------------------------------------------- |
| `collateral` | contract IErc20 | The collateral to update the permission for. |
| `state`      | bool            | The new state to put in storage.             |

### setDepositUnderlyingAllowed

```solidity
function setDepositUnderlyingAllowed(
    contract IHToken bond,
    bool state
) external
```

Updates the state of the permission accessed by the hToken before an underlying deposit.

Emits a {SetDepositUnderlyingAllowed} event.

Requirements:

- The caller must be the owner.

#### Parameters

| Name    | Type             | Description                            |
| :------ | :--------------- | :------------------------------------- |
| `bond`  | contract IHToken | The bond to update the permission for. |
| `state` | bool             | The new state to put in storage.       |

### setLiquidationIncentive

```solidity
function setLiquidationIncentive(
    contract IErc20 collateral,
    uint256 newLiquidationIncentive
) external
```

Updates the collateral liquidation incentive.

Emits a {SetLiquidationIncentive} event.

Requirements:

- The caller must be the owner.
- The collateral must be listed.
- The new liquidation incentive cannot be higher than the maximum liquidation incentive.
- The new liquidation incentive cannot be lower than the minimum liquidation incentive.

#### Parameters

| Name                      | Type            | Description                                             |
| :------------------------ | :-------------- | :------------------------------------------------------ |
| `collateral`              | contract IErc20 | The collateral to update the liquidation incentive for. |
| `newLiquidationIncentive` | uint256         | The new liquidation incentive.                          |

### setLiquidateBorrowAllowed

```solidity
function setLiquidateBorrowAllowed(
    contract IHToken bond,
    bool state
) external
```

Updates the state of the permission accessed by the hToken before a liquidate borrow.

Emits a {SetLiquidateBorrowAllowed} event.

Requirements:

- The caller must be the owner.
- The bond must be listed.

#### Parameters

| Name    | Type             | Description                                       |
| :------ | :--------------- | :------------------------------------------------ |
| `bond`  | contract IHToken | The hToken contract to update the permission for. |
| `state` | bool             | The new state to put in storage.                  |

### setMaxBonds

```solidity
function setMaxBonds(
    uint256 newMaxBonds
) external
```

Sets max bonds value, which controls how many bond markets a single account can enter.

Emits a {SetMaxBonds} event.

Requirements:

- The caller must be the owner.

#### Parameters

| Name          | Type    | Description          |
| :------------ | :------ | :------------------- |
| `newMaxBonds` | uint256 | New max bonds value. |

### setRepayBorrowAllowed

```solidity
function setRepayBorrowAllowed(
    contract IHToken bond,
    bool state
) external
```

Updates the state of the permission accessed by the hToken before a repay borrow.

Emits a {SetRepayBorrowAllowed} event.

Requirements:

- The caller must be the owner.
- The bond must be listed.

#### Parameters

| Name    | Type             | Description                                       |
| :------ | :--------------- | :------------------------------------------------ |
| `bond`  | contract IHToken | The hToken contract to update the permission for. |
| `state` | bool             | The new state to put in storage.                  |

## Events

### ListBond

```solidity
event ListBond(
    address owner,
    contract IHToken bond
)
```

Emitted when a new bond is listed.

#### Parameters

| Name    | Type             | Description                        |
| :------ | :--------------- | :--------------------------------- |
| `owner` | address          | The address of the contract owner. |
| `bond`  | contract IHToken | The newly listed bond.             |

### ListCollateral

```solidity
event ListCollateral(
    address owner,
    contract IErc20 collateral
)
```

Emitted when a new collateral is listed.

#### Parameters

| Name         | Type            | Description                        |
| :----------- | :-------------- | :--------------------------------- |
| `owner`      | address         | The address of the contract owner. |
| `collateral` | contract IErc20 | The newly listed collateral.       |

### SetBorrowAllowed

```solidity
event SetBorrowAllowed(
    address owner,
    contract IHToken bond,
    bool state
)
```

Emitted when the borrow permission is updated.

#### Parameters

| Name    | Type             | Description                        |
| :------ | :--------------- | :--------------------------------- |
| `owner` | address          | The address of the contract owner. |
| `bond`  | contract IHToken | The related HToken.                |
| `state` | bool             | True if borrowing is allowed.      |

### SetCollateralCeiling

```solidity
event SetCollateralCeiling(
    address owner,
    contract IErc20 collateral,
    uint256 oldCollateralCeiling,
    uint256 newCollateralCeiling
)
```

Emitted when the collateral ceiling is updated.

#### Parameters

| Name                   | Type            | Description                        |
| :--------------------- | :-------------- | :--------------------------------- |
| `owner`                | address         | The address of the contract owner. |
| `collateral`           | contract IErc20 | The related collateral.            |
| `oldCollateralCeiling` | uint256         | The old collateral ceiling.        |
| `newCollateralCeiling` | uint256         | The new collateral ceiling.        |

### SetCollateralRatio

```solidity
event SetCollateralRatio(
    address owner,
    contract IErc20 collateral,
    uint256 oldCollateralRatio,
    uint256 newCollateralRatio
)
```

Emitted when the collateral ratio is updated.

#### Parameters

| Name                 | Type            | Description                        |
| :------------------- | :-------------- | :--------------------------------- |
| `owner`              | address         | The address of the contract owner. |
| `collateral`         | contract IErc20 | The related HToken.                |
| `oldCollateralRatio` | uint256         | The old collateral ratio.          |
| `newCollateralRatio` | uint256         | the new collateral ratio.          |

### SetDebtCeiling

```solidity
event SetDebtCeiling(
    address owner,
    contract IHToken bond,
    uint256 oldDebtCeiling,
    uint256 newDebtCeiling
)
```

Emitted when the debt ceiling for a bond is updated.

#### Parameters

| Name             | Type             | Description                        |
| :--------------- | :--------------- | :--------------------------------- |
| `owner`          | address          | The address of the contract owner. |
| `bond`           | contract IHToken | The related HToken.                |
| `oldDebtCeiling` | uint256          | The old debt ceiling.              |
| `newDebtCeiling` | uint256          | The new debt ceiling.              |

### SetDepositCollateralAllowed

```solidity
event SetDepositCollateralAllowed(
    address owner,
    contract IErc20 collateral,
    bool state
)
```

Emitted when the deposit collateral permission is updated.

#### Parameters

| Name         | Type            | Description                               |
| :----------- | :-------------- | :---------------------------------------- |
| `owner`      | address         | The address of the contract owner.        |
| `collateral` | contract IErc20 |                                           |
| `state`      | bool            | True if depositing collateral is allowed. |

### SetDepositUnderlyingAllowed

```solidity
event SetDepositUnderlyingAllowed(
    address owner,
    contract IHToken bond,
    bool state
)
```

Emitted when the deposit underlying permission is set.

#### Parameters

| Name    | Type             | Description                            |
| :------ | :--------------- | :------------------------------------- |
| `owner` | address          | The address of the contract owner.     |
| `bond`  | contract IHToken | The related HToken.                    |
| `state` | bool             | True if deposit underlying is allowed. |

### SetLiquidateBorrowAllowed

```solidity
event SetLiquidateBorrowAllowed(
    address owner,
    contract IHToken bond,
    bool state
)
```

Emitted when the liquidate borrow permission is updated.

#### Parameters

| Name    | Type             | Description                            |
| :------ | :--------------- | :------------------------------------- |
| `owner` | address          | The address of the contract owner.     |
| `bond`  | contract IHToken | The related HToken.                    |
| `state` | bool             | True if liquidating borrow is allowed. |

### SetLiquidationIncentive

```solidity
event SetLiquidationIncentive(
    address owner,
    contract IErc20 collateral,
    uint256 oldLiquidationIncentive,
    uint256 newLiquidationIncentive
)
```

Emitted when the collateral liquidation incentive is set.

#### Parameters

| Name                      | Type            | Description                        |
| :------------------------ | :-------------- | :--------------------------------- |
| `owner`                   | address         | The address of the contract owner. |
| `collateral`              | contract IErc20 | The related collateral.            |
| `oldLiquidationIncentive` | uint256         | The old liquidation incentive.     |
| `newLiquidationIncentive` | uint256         | The new liquidation incentive.     |

### SetMaxBonds

```solidity
event SetMaxBonds(
    address owner,
    uint256 oldMaxBonds,
    uint256 newMaxBonds
)
```

Emitted when a new max bonds value is set.

#### Parameters

| Name          | Type    | Description                             |
| :------------ | :------ | :-------------------------------------- |
| `owner`       | address | The address indexed owner.              |
| `oldMaxBonds` | uint256 | The address of the old max bonds value. |
| `newMaxBonds` | uint256 | The address of the new max bonds value. |

### SetRedeemAllowed

```solidity
event SetRedeemAllowed(
    address owner,
    contract IHToken bond,
    bool state
)
```

Emitted when the redeem permission is updated.

#### Parameters

| Name    | Type             | Description                        |
| :------ | :--------------- | :--------------------------------- |
| `owner` | address          | The address of the contract owner. |
| `bond`  | contract IHToken | The related HToken.                |
| `state` | bool             | True if redeeming is allowed.      |

### SetRepayBorrowAllowed

```solidity
event SetRepayBorrowAllowed(
    address owner,
    contract IHToken bond,
    bool state
)
```

Emitted when the repay borrow permission is updated.

#### Parameters

| Name    | Type             | Description                         |
| :------ | :--------------- | :---------------------------------- |
| `owner` | address          | The address of the contract owner.  |
| `bond`  | contract IHToken | The related HToken.                 |
| `state` | bool             | True if repaying borrow is allowed. |

## Custom Errors

### Fintroller\_\_BondNotListed

```solidity
error Fintroller__BondNotListed(contract IHToken bond)
```

Emitted when interacting with a bond that is not listed.

### Fintroller\_\_CollateralDecimalsOverflow

```solidity
error Fintroller__CollateralDecimalsOverflow(uint256 decimals)
```

Emitted when listing a collateral that has more than 18 decimals.

### Fintroller\_\_CollateralDecimalsZero

```solidity
error Fintroller__CollateralDecimalsZero()
```

Emitted when listing a collateral that has zero decimals.

### Fintroller\_\_CollateralNotListed

```solidity
error Fintroller__CollateralNotListed(contract IErc20 collateral)
```

Emitted when interacting with a collateral that is not listed.

### Fintroller\_\_CollateralRatioOverflow

```solidity
error Fintroller__CollateralRatioOverflow(uint256 newCollateralRatio)
```

Emitted when setting a new collateral ratio that is above the upper bound.

### Fintroller\_\_CollateralRatioUnderflow

```solidity
error Fintroller__CollateralRatioUnderflow(uint256 newCollateralRatio)
```

Emitted when setting a new collateral ratio that is below the lower bound.

### Fintroller\_\_DebtCeilingUnderflow

```solidity
error Fintroller__DebtCeilingUnderflow(uint256 newDebtCeiling, uint256 totalSupply)
```

Emitted when setting a new debt ceiling that is below the total supply of hTokens.

### Fintroller\_\_LiquidationIncentiveOverflow

```solidity
error Fintroller__LiquidationIncentiveOverflow(uint256 newLiquidationIncentive)
```

Emitted when setting a new liquidation incentive that is above the upper bound.

### Fintroller\_\_LiquidationIncentiveUnderflow

```solidity
error Fintroller__LiquidationIncentiveUnderflow(uint256 newLiquidationIncentive)
```

Emitted when setting a new liquidation incentive that is below the lower bound.
