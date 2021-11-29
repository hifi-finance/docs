---
id: data
title: Data
sidebar_position: 3
---

# Data

The Hifi protocol stores user data and emits events on the blockchain. Querying these data is not quick and easy by
default. There are two ways you can go about it:

1. Use [Multicall](https://github.com/joshstevens19/ethereum-multicall) to batch multiple constant function calls.
2. Source the data from our subgraphs.

We're using the first approach to feed data to the Hifi Interface. The second approach is documented below.

## Subgraphs

[The Graph](https://thegraph.com/en/) is a service that indexes events emitted on the blockchain and serves them via a high-throughput GraphQL
server. This server is called a "subgraph".

Hifi is deployed on two Ethereum-based networks, as documented in the previous section [Network
Addresses](./network-addresses.md). We are maintaining a subgraph for each network:

| Network | Link                                                                      |
| ------- | ------------------------------------------------------------------------- |
| Polygon | https://thegraph.com/hosted-service/subgraph/hifi-finance/hifi-v1-matic   |
| Rinkeby | https://thegraph.com/hosted-service/subgraph/hifi-finance/hifi-v1-rinkeby |

To see the schemas and some example GraphQL queries, head to this GitHub repo:

- https://github.com/hifi-finance/hifi-subgraph
