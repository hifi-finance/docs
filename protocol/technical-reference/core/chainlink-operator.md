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

| Name      | Type   | Description                     |
| :-------- | :----- | :------------------------------ |
| `address` | string | asset, address id, bool isSet). |

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

| Type   | Description       |
| :----- | :---------------- |
| string | normalized price. |

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

| Type   | Description                          |
| :----- | :----------------------------------- |
| string | denominated in USD, with 8 decimals. |

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
