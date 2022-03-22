---
id: hifi-pool-registry
title: Hifi Pool Registry
sidebar_position: 2
---

# Hifi Pool Registry

## Constant Functions

### pools

```solidity
function pools(
    address pool
) external returns (bool)
```

Whether AMM pool is being tracked or not.

#### Parameters

| Name   | Type    | Description                           |
| :----- | :------ | :------------------------------------ |
| `pool` | address | The pool for which to make the query. |

#### Return Values

| Name  | Type | Description                                 |
| :---- | :--- | :------------------------------------------ |
| `[0]` | bool | bool true = pool is tracked, otherwise not. |

## Non-Constant Functions

### trackPool

```solidity
function trackPool(
    contract IHifiPool pool
) external
```

Tracks a new pool.

Emits a {TrackPool} event.

Requirements:

- The pool shouldn't be tracked.

#### Parameters

| Name   | Type               | Description                       |
| :----- | :----------------- | :-------------------------------- |
| `pool` | contract IHifiPool | The address of the pool to track. |

### untrackPool

```solidity
function untrackPool(
    contract IHifiPool pool
) external
```

Untracks a pool.

Emits an {UntrackPool} event.

Requirements:

- The pool should be tracked.

#### Parameters

| Name   | Type               | Description                        |
| :----- | :----------------- | :--------------------------------- |
| `pool` | contract IHifiPool | The address of the pool to untrack |

## Events

### TrackPool

```solidity
event TrackPool(
    contract IHifiPool pool
)
```

#### Parameters

| Name   | Type               |
| :----- | :----------------- |
| `pool` | contract IHifiPool |

### UntrackPool

```solidity
event UntrackPool(
    contract IHifiPool pool
)
```

#### Parameters

| Name   | Type               |
| :----- | :----------------- |
| `pool` | contract IHifiPool |

## Custom Errors

### HifiPoolRegistry\_\_PoolAlreadyTracked

```solidity
error HifiPoolRegistry__PoolAlreadyTracked(contract IHifiPool pool)
```

Emitted when the pool to be tracked is already tracked.

### HifiPoolRegistry\_\_PoolNotTracked

```solidity
error HifiPoolRegistry__PoolNotTracked(contract IHifiPool pool)
```

Emitted when the pool to be untracked is not tracked.
