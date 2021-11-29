---
id: governance
title: Governance
sidebar_position: 2
---

# Governance

## Multisig

The developers of the Hifi protocol are in control of the following multi-signature wallet, which is the current
administrator of the protocol (by virtue of being the owner of the [Fintroller](../technical-reference/core/fintroller.md) contract):

- https://polygonscan.com/address/0xA4340b4Ce5c09a86c29eD2E11501A4a49580C21f

With time, we will transition to a system whereby any user of the protocol can cast their opinion in the governance of Hifi.

## Modus Operandi

We believe that the best way to scale a decentralized finance protocol is via progressive decentralization. Hifi is ultimately a startup, and we have to deal with uncertainty when it comes to:

1. Product/ market fit
2. Smart contract security.

Because achieving both is no easy feat, we will not focus on decentralizing governance in the initial phase of the protocol.

### Product/ Market Fit

Being able to unilaterally make decisions about the smart contract code speeds up the development process and enables us to get to a point where users love our fixed-rate lending product.
The ephemeral nature of the hTokens permits us to make changes to their source code on the fly.

### Precautions

Smart contracts are powerful technology, but the fact that they are immutable once deployed brings risks. We hedge against these risks in the following ways:

1. We made two of our smart contracts upgradeable (the [BalanceSheet](../technical-reference/core/balance-sheet.md) and the [Fintroller](../technical-reference/core/fintroller.md)).
2. We enforced caps on how much debt can be taken on by borrowers.
3. We gave ourselves the ability to pause most operations (except for collateral withdrawals).

With time, the protocol will become more resilient and safe to use. We will subsequently change and remove these
precautions.
