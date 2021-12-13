---
id: adding-liquidity
title: Adding Liquidity
sidebar_position: 3
---

# Adding Liquidity

<iframe width="560" height="315" src="https://www.youtube.com/embed/5NU6dIAoJyE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To provide liquidity, access the "Pool" tab in the [Hifi Interface](https://app.hifi.finance).

The first step is to make sure you have ported over your assets from Ethereum over to the Polygon network.

1. First, head over to the pool page in our interface and select the market you want to provide liquidity to.
2. Select the amount of liquidity you are looking to provide and choose your pooling strategy

:::tip
"Buy & pool" is typically best for small amounts of money, and "Borrow & pool" is best for large amounts of money.
:::

3. Hit "Add liquidity" and confirm the transaction in your wallet

:::info
Right now, being a liquidity provider gives you a portion of the fees for every single borrow or lending action that happens in this particular market. Adding liquidity to the Hifi lending markets is a great way to put your assets to work for you.
:::

To improve the liquidity of hTokens, Hifi has implemented a custom liquidity provider that is designed to enable
efficient trading between hTokens and their underlying assets. You can read more about this design in the [Yield
Space](https://yield.is/YieldSpace.pdf) whitepaper to get a deeper understanding of the calculations
and the overall mechanism. The Hifi Interface integrates the AMM seamlessly into the user experience.

:::info
The Hifi Protocol relies on users called liquidity providers to provide essentially liquidity for borrowers and lenders.
Pooling liquidity earns fees from borrowers and lenders.
:::

## Comparison with Uniswap

Hifi pools improve on existing solutions by providing markets that quote at consistent interest rates over time, in the
absence of trades. By quoting at a consistent interest rate, Hifi pools minimize losses from arbitrage.

Whereas in Uniswap, arbitrage trades are expected whenever prices change, arbitrage trades in the YieldSpace Pool are expected to
occur only when interest rates change. This should tend to reduce the "impermanent loss" suffered by market makers.

Like other automated liquidity providers, users may choose to provide liquidity to Hifi pools to earn fees from future trades. Hifi uses a custom fee model that is optimized for hTokens. Rather than charge a fee that is a percentage of the amount of the asset bought or sold, Hifi charges a fee that is proportional to both interest rate and time to maturity. This fee model ensures that fees never result in the unreasonable amount on interest rates paid by borrowers (hToken sellers) and earned by lenders (hToken buyers).

Similar to Uniswap v2, providing liquidity to YieldSpace will grant you Liquidity Provider shares. If you are providing liquidity for hUSDCMar22, you get hUSDCMar22LP
tokens which represent your share of the pool. These tokens are ERC-20 tokens and may further be composed in the DeFi ecosystem.

Each hToken has an associated Hifi pool that permits trading between that hToken and its underlying asset. Swapping hTokens with different maturities needs to be done manually.

## Market Impact

The Yield Space formula reduces the market impact suffered by traders of hTokens, especially for hTokens that are close to maturity. The chart below illustrates the market impact that trades of equivalent size would cause on Uniswap versus the Hifi Pool, assuming both are initialized with reserves of 1,000 USDC and 1,000 hUSDC.

The x-axis is the amount of hUSDC sold. The y-axis is the implicit interest rate achieved by a borrower who is selling
that amount of hUSDC at one year to maturity. Borrowers obtain considerably better hUSDC/USDC quotes (with better
implied interest rates) by using the Hifi Pool.

![Market impact](/img/guides/market-impact.png)

The Hifi Pool consistently outperforms Uniswap on both interest rates and market quotes.
