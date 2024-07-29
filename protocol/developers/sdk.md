---
id: sdk
title: SDK
sidebar_position: 1
---

# Hifi SDK

The Hifi SDK is structured as a collection of small and medium-sized node packages. These packages contain both
Solidity and JavaScript code. The former is the smart contracts themselves; the latter, the smart contract ABIs and the
TypeChain bindings.

There are a couple of things you need to keep in mind regarding the Hifi SDK:

1. The Solidity contracts can be compiled only with Solidity v0.8.4 and above, because we are reverting with [custom
   errors](https://blog.soliditylang.org/2021/04/21/custom-errors/) instead of reason strings.
2. It depends upon [ethers.js](https://github.com/ethers-io/ethers.js). You cannot use the SDK with another JavaScript library
   like web3.js.

:::caution
The latest version of the SDK is used in production in the Hifi Interface, but it is considered alpha software and may contain bugs or change significantly between patch versions. If you have questions about how to use the SDK, please reach out in the #development channel of the Discord. Pull requests welcome!
:::

## Protocol

The core Hifi fixed-rate, fixed-term lending protocol.

### Installation

```bash
$ yarn add @hifi/protocol
```

### Usage

#### Solidity

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "@hifi/protocol/contracts/core/balanceSheet/IBalanceSheetV1.sol";

contract YourContract {
    // Find the address on https://docs.hifi.finance
    IBalanceSheetV1 balanceSheet = IBalanceSheetV1(0x...);

    function queryAccountLiquidity(address user) external view returns (uint256 excessLiquidity, shortfallLiquidity) {
        (excessLiquidity, shortfallLiquidity) = balanceSheet.getCurrentAccountLiquidity(user);
    }

    function queryCollateralAmount(address user, IErc20 collateral) external view returns (uint256 collateralAmount) {
        debtAmount = balanceSheet.getCollateralAmount(user, collateral);
    }

    function queryDebtAmount(address user, IHToken hToken) external view returns (uint256 debtAmount) {
        debtAmount = balanceSheet.getDebtAmount(user, hToken);
    }
}
```

#### JavaScript

```javascript
import { getDefaultProvider } from "@ethersproject/providers";
import { BalanceSheetV1__factory } from "@hifi/protocol/dist/types/factories/BalanceSheet__factory";

async function queryAccountLiquidity() {
  const balanceSheetABI = BalanceSheetV1__factory.abi;
  const defaultProvider = getDefaultProvider();
  const balanceSheet = new BalanceSheetV1__factory("0x...", defaultProvider); // Find the address on https://docs.hifi.finance
  const user = "0x...";
  const accountLiquidity = await balanceSheet.getCurrentAccountLiquidity(user);
}
```

## AMM

Dedicated AMM for market-making hTokens, based on the [Yield Space](https://yield.is/YieldSpace.pdf) design.

### Installation

```bash
$ yarn add @hifi/amm
```

### Usage

#### Solidity

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "@hifi/amm/contracts/IHifiPool.sol";

contract YourContract {
    // Find the address on https://docs.hifi.finance
    IHifiPool hifiPool = IHifiPool(0x...);

    function getQuote(uint256 hTokenIn) external view returns (uint256 underlyingOut) {
        underlyingOut = hifiPool.getQuoteForSellingHToken(hTokenIn);
    }
}
```

#### JavaScript

```javascript
import { parseUnits } from "@ethersproject/units";
import { getDefaultProvider } from "@ethersproject/providers";
import { HifiPool__factory } from "@hifi/amm/dist/types/factories/HifiPool__factory";

async function getQuote() {
  const hifiPoolABI = HifiPool__factory.abi;
  const defaultProvider = getDefaultProvider();
  const hifiPool = new HifiPool__factory("0x...", defaultProvider); // Find the address on https://docs.hifi.finance
  const hTokenIn = parseUnits("100", 18);
  const underlyingOut = await hifiPool.getQuoteForSellingHToken(hTokenIn);
}
```

## Proxy Target

DSProxy target contract with stateless scripts. Refer to the [technical reference](../technical-reference/periphery.md) for more details about DSProxy.

### Installation

```bash
$ yarn add @hifi/proxy-target
```

### Usage

#### Solidity

You will likely never need to interact with the smart contracts from Solidity. Though for the sake of completeness, here is a code snippet for how to do that:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "@hifi/proxy-target/contracts/IHifiProxyTarget.sol";

contract YourContract {
    // Find the address on https://docs.hifi.finance
    IHifiPool hifiProxyTarget = IHifiProxyTarget(0x...);

    function depositCollateral(IBalanceSheetV1 balanceSheet, IErc20 collateral, uint256 depositAmount)
      external
      view
      returns (uint256 underlyingOut)
    {
        hifiProxyTarget.depositCollateral(balanceSheet, collateral, depositAmount);
    }
}
```

#### JavaScript

This code snippet shows how to interact with a DSProxy contract that is already deployed. For guidance on how to
deploy the DSProxy itself, refer to Maker's guide [Working with
DSProxy](https://github.com/makerdao/developerguides/blob/master/devtools/working-with-dsproxy/working-with-dsproxy.md).

```javascript
import { parseUnits } from "@ethersproject/units";
import { HifiProxyTarget__factory } from "@hifi/protocol/dist/types/factories/HifiProxyTarget__factory";

async function depositCollateral() {
  const hifiProxyTargetABI = HifiProxyTarget__factory.abi;
  const signer = "..."; // Get hold of an ethers.js Signer
  const hifiProxyTarget = new HifiProxyTarget__factory("0x...", signer); // Find the address on https://docs.hifi.finance
  const balanceSheet = "0x...";
  const collateral = "0x...";
  const depositAmount = parseUnits("100", 18);
  const accountLiquidity = await hifiProxyTarget.depositCollateral(balanceSheet, collateral, depositAmount);
}
```

## Flash Swap

Flash swap implementations for liquidating underwater accounts. We can currently source liquidity only from Uniswap V2
and its forks.

### Installation

```bash
$ yarn add @hifi/flash-swap
```

### Usage

#### Solidity

You are not supposed to import the smart contracts. Instead, you should interact with the Uniswap pool
directly. For example, with the [UniswapV2Pair](https://github.com/Uniswap/v2-core/blob/v1.0.1/contracts/UniswapV2Pair.sol)
contract you would call the `swap` function, and then Uniswap will forward the call to the `FlashUniswapV2`
contract. You can read more about flash swaps work in Uniswap on
[docs.uniswap.org](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/flash-swaps).

#### JavaScript

Example for Uniswap V2:

```javascript
import { defaultAbiCoder } from "@ethersproject/abi";
import { getDefaultProvider } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { UniswapV2Pair__factory } from "@hifi/flash-swap/dist/types/factories/UniswapV2Pair__factory";

async function flashSwap() {
  const defaultProvider = getDefaultProvider();
  const pair = new UniswapV2Pair__factory("0x...", defaultProvider);

  const token0Amount = parseUnits("100", 18);
  const token1Amount = parseUnits("0", 18);
  const to = "0x..."; // Address of FlashUniswapV2, get it from https://docs.hifi.finance

  const borrower = "0x...";
  const hToken = "0x...";
  const turnout = parseUnits("1", 18);
  const data = defaultAbiCoder.encode(["address", "address", "uint256"], [borrower, hToken, turnout]);

  await pair.swap(token0Amount, token1Amount, to, data);
}
```
