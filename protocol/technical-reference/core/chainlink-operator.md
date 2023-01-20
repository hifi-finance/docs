---
id: chainlink-operator
title: Chainlink Operator
sidebar_position: 2
---

# Chainlink Operator

Aggregates the price feeds provided by Chainlink.

## Constant Functions

### getFeed

```solidity
function getFeed(
    string symbol
) external returns (contract IErc20, contract IAggregatorV3, bool)
```

Gets the official feed for a symbol.

#### Parameters

| Name     | Type   | Description                        |
| :------- | :----- | :--------------------------------- |
| `symbol` | string | The symbol to return the feed for. |

#### Return Values

| Name  | Type                   | Description                              |
| :---- | :--------------------- | :--------------------------------------- |
| `[0]` | contract IErc20        | (address asset, address id, bool isSet). |
| `[1]` | contract IAggregatorV3 |                                          |
| `[2]` | bool                   |                                          |

### getNormalizedPrice

```solidity
function getNormalizedPrice(
    string symbol
) external returns (uint256)
```

Gets the official price for a symbol and adjusts it have 18 decimals instead of the
format used by Chainlink, which has 8 decimals.

Requirements:

- The normalized price cannot overflow.

#### Parameters

| Name     | Type   | Description                                                 |
| :------- | :----- | :---------------------------------------------------------- |
| `symbol` | string | The Erc20 symbol of the token for which to query the price. |

#### Return Values

| Name  | Type    | Description           |
| :---- | :------ | :-------------------- |
| `[0]` | uint256 | The normalized price. |

### getPrice

```solidity
function getPrice(
    string symbol
) external returns (uint256)
```

Gets the official price for a symbol in the default format used by Chainlink, which
has 8 decimals.

Requirements:

- The feed must be set.
- The price returned by the oracle cannot be zero.

#### Parameters

| Name     | Type   | Description                        |
| :------- | :----- | :--------------------------------- |
| `symbol` | string | The symbol to fetch the price for. |

#### Return Values

| Name  | Type    | Description                                    |
| :---- | :------ | :--------------------------------------------- |
| `[0]` | uint256 | The price denominated in USD, with 8 decimals. |

### pricePrecision

```solidity
function pricePrecision() external returns (uint256)
```

Chainlink price precision for USD-quoted data.

### pricePrecisionScalar

```solidity
function pricePrecisionScalar() external returns (uint256)
```

The ratio between normalized precision (1e18) and the Chainlink price precision (1e8).

### priceStalenessThreshold

```solidity
function priceStalenessThreshold() external returns (uint256)
```

The Chainlink price staleness threshold.

## Non-Constant Functions

### deleteFeed

```solidity
function deleteFeed(
    string symbol
) external
```

Deletes a previously set Chainlink price feed.

Emits a {DeleteFeed} event.

Requirements:

- The caller must be the owner.
- The feed must be set already.

#### Parameters

| Name     | Type   | Description                                           |
| :------- | :----- | :---------------------------------------------------- |
| `symbol` | string | The Erc20 symbol of the asset to delete the feed for. |

### setFeed

```solidity
function setFeed(
    contract IErc20 asset,
    contract IAggregatorV3 feed
) external
```

Sets a Chainlink price feed.

It is not an error to set a feed twice. Emits a {SetFeed} event.

Requirements:

- The caller must be the owner.
- The number of decimals of the feed must be 8.

#### Parameters

| Name    | Type                   | Description                                                   |
| :------ | :--------------------- | :------------------------------------------------------------ |
| `asset` | contract IErc20        | The address of the Erc20 contract for which to get the price. |
| `feed`  | contract IAggregatorV3 | The address of the Chainlink price feed contract.             |

### setPriceStalenessThreshold

```solidity
function setPriceStalenessThreshold(
    uint256 newPriceStalenessThreshold
) external
```

Sets the Chainlink price staleness threshold.

Emits a {SetPriceStalenessThreshold} event.

Requirements:

- The caller must be the owner.

#### Parameters

| Name                         | Type    | Description                                  |
| :--------------------------- | :------ | :------------------------------------------- |
| `newPriceStalenessThreshold` | uint256 | The new Chainlink price staleness threshold. |

## Events

### DeleteFeed

```solidity
event DeleteFeed(
    contract IErc20 asset,
    contract IAggregatorV3 feed
)
```

Emitted when a feed is deleted.

#### Parameters

| Name    | Type                   | Description        |
| :------ | :--------------------- | :----------------- |
| `asset` | contract IErc20        | The related asset. |
| `feed`  | contract IAggregatorV3 | The related feed.  |

### SetFeed

```solidity
event SetFeed(
    contract IErc20 asset,
    contract IAggregatorV3 feed
)
```

Emitted when a feed is set.

#### Parameters

| Name    | Type                   | Description        |
| :------ | :--------------------- | :----------------- |
| `asset` | contract IErc20        | The related asset. |
| `feed`  | contract IAggregatorV3 | The related feed.  |

### SetPriceStalenessThreshold

```solidity
event SetPriceStalenessThreshold(
    uint256 oldPriceStalenessThreshold,
    uint256 newPriceStalenessThreshold
)
```

Emitted when the Chainlink price staleness threshold is set.

#### Parameters

| Name                         | Type    | Description                                  |
| :--------------------------- | :------ | :------------------------------------------- |
| `oldPriceStalenessThreshold` | uint256 | The old Chainlink price staleness threshold. |
| `newPriceStalenessThreshold` | uint256 | The new Chainlink price staleness threshold. |

## Custom Errors

### ChainlinkOperator\_\_DecimalsMismatch

```solidity
error ChainlinkOperator__DecimalsMismatch(string symbol, uint256 decimals)
```

Emitted when the decimal precision of the feed is not the same as the expected number.

### ChainlinkOperator\_\_FeedNotSet

```solidity
error ChainlinkOperator__FeedNotSet(string symbol)
```

Emitted when trying to interact with a feed not set yet.

### ChainlinkOperator\_\_PriceLessThanOrEqualToZero

```solidity
error ChainlinkOperator__PriceLessThanOrEqualToZero(string symbol)
```

Emitted when the price returned by the oracle is less than or equal to zero.

### ChainlinkOperator\_\_PriceStale

```solidity
error ChainlinkOperator__PriceStale(string symbol)
```

Emitted when the latest price update timestamp returned by the oracle is too old.
