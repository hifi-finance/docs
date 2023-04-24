---
id: governor-bravo-delegate
title: Governor Bravo Delegate
sidebar_position: 4
---

# Governor Bravo

Governor Bravo Delegate is an advanced and flexible governance system. It is a key component of the decentralized governance infrastructure, which allows token holders to participate in the decision-making process for the management and future direction of a Hifi protocol.

Governor Bravo Delegate serves as the implementation for the Governor Bravo Delegator. It is responsible for handling proposal creation, voting, and execution of governance actions. It is designed with upgradeability in mind, which means that its logic can be modified or extended without affecting the existing proposals and voting data.

The core features of the Governor Bravo Delegate include:

- `Proposals`: Users with sufficient voting power can create proposals, which consist of a set of actions, such as modifying system parameters or upgrading smart contracts. Proposals are subject to a voting period during which token holders can cast their votes.
- `Voting`: Token holders can vote on proposals by delegating their tokens to express their support, opposition, or abstention. The voting process takes place within a specified voting period, and the outcome is determined by the aggregated voting power of the participating users.
- `Execution`: If a proposal receives the required number of votes to pass, it is queued for execution after a predefined delay. This delay provides a window for token holders to review the proposal and potentially withdraw their support if they disagree with the changes.
- `Upgradeability`: The Governor Bravo Delegate has been designed with a clear separation of concerns between the storage and the implementation. This allows for seamless upgrades of the governance logic without affecting the existing proposals and voting data.

## Variables

### BALLOT_TYPEHASH

- Type: `bytes32`
- Visibility: `public constant`

Returns the EIP-712 typehash for the ballot struct used by the contract.

### DOMAIN_TYPEHASH

- Type: `bytes32`
- Visibility: `public constant`

Returns the EIP-712 typehash for the contract's domain.

### MAX_PROPOSAL_THRESHOLD()

- Type: `uint256`
- Visibility: `public view`

The maximum proposal threshold, which is calculated as 1% of the total Hifi token supply.

### MAX_VOTING_DELAY

- Type: `uint256`
- Visibility: `public constant`

The maximum delay period allowed for the timelock (in seconds).

### MAX_VOTING_PERIOD

- Type: `uint256`
- Visibility: `public constant`

The maximum voting period for a proposal, which is about 2 weeks.

### MIN_PROPOSAL_THRESHOLD()

- Type: `uint256`
- Visibility: `public view`

The minimum proposal threshold, which is calculated as 0.01% of the total Hifi token supply.

### MIN_VOTING_DELAY

- Type: `uint256`
- Visibility: `public constant`

The minimum delay period allowed for the timelock (in seconds).

### MIN_VOTING_PERIOD

- Type: `uint256`
- Visibility: `public constant`

The minimum voting period for a proposal, which is about 24 hours.

### hifi

- Type: `HifiInterface`
- Visibility: `public`

The address of the Hifi governance token.

### latestProposalIds

- Type: `mapping(address => uint256)`
- Visibility: `public`

The latest proposal for each proposer.

### name

```solidity
string name
```

The name of this contract

### proposalCount

- Type: `uint256`
- Visibility: `public`

The total number of proposals.

### proposalMaxOperations

```solidity
uint256 proposalMaxOperations
```

The maximum number of actions that can be included in a proposal. Currently, for the Hifi Protocol, it is set to 10 actions.

### proposalThreshold

- Type: `uint256`
- Visibility: `public`

The number of votes required in order for a voter to become a proposer.

### proposals

- Type: `mapping(uint256 => Proposal)`
- Visibility: `public`

The official record of all proposals ever proposed.

#### Proposal Struct

The `Proposal` struct represents a governance proposal and contains the following fields:

- `id`: A unique identifier for the proposal.
- `proposer`: The address of the account that created the proposal.
- `eta`: The timestamp when the proposal can be executed if it is approved.
- `targets`: An ordered list of contract addresses that will be called if the proposal is approved.
- `values`: An ordered list of values to be sent along with each corresponding `targets` address call.
- `signatures`: An ordered list of function signatures to be called on each corresponding `targets` address call.
- `calldatas`: An ordered list of function arguments to be passed with each corresponding `targets` address call.
- `startBlock`: The block number when voting begins. Holders must delegate their votes prior to this block.
- `endBlock`: The block number when voting ends. Votes must be cast prior to this block.
- `forVotes`: The current number of votes in favor of the proposal.
- `againstVotes`: The current number of votes against the proposal.
- `abstainVotes`: The current number of abstain votes for the proposal.
- `canceled`: A flag marking whether the proposal has been canceled.
- `executed`: A flag marking whether the proposal has been executed.
- `receipts`: A mapping of ballot receipts for the proposal. Each voter's `Receipt` is stored here.

#### Receipt Struct

The `Receipt` struct represents a ballot receipt for a given voter and contains the following fields:

- `hasVoted`: A flag indicating whether or not the voter has cast their vote.
- `support`: An integer indicating the voter's support for the proposal: `0` if the voter is against the proposal, `1` if the voter is in favor of the proposal, and `2` if the voter abstains from voting.
- `votes`: The number of votes the voter has cast in favor of the proposal.

### timelock

- Type: `TimelockInterface`
- Visibility: `public`

The address of the Hifi Protocol Timelock.

### votingDelay

- Type: `uint256`
- Visibility: `public`

The delay before voting on a proposal may take place, once proposed, in blocks.

### votingPeriod

- Type: `uint256`
- Visibility: `public`

The duration of voting on a proposal, in blocks.

## Constant Functions

### getActions

```solidity
function getActions(uint256 proposalId) external view returns (address[] targets, uint256[] values, string[] signatures, bytes[] calldatas)
```

Gets actions of a proposal

#### Parameters

| Name       | Type    | Description            |
| ---------- | ------- | ---------------------- |
| proposalId | uint256 | the id of the proposal |

#### Return Values

| Name       | Type      | Description         |
| ---------- | --------- | ------------------- |
| targets    | address[] | proposal targets    |
| values     | uint256[] | proposal values     |
| signatures | string[]  | proposal signatures |
| calldatas  | bytes[]   | proposal calldatas  |

### getReceipt

```solidity
function getReceipt(uint256 proposalId, address voter) external view returns (struct GovernorBravoDelegateStorageV1.Receipt)
```

Gets the receipt for a voter on a given proposal.

#### Parameters

| Name       | Type    | Description              |
| ---------- | ------- | ------------------------ |
| proposalId | uint256 | the id of proposal       |
| voter      | address | The address of the voter |

#### Return Values

| Name | Type                                          | Description        |
| ---- | --------------------------------------------- | ------------------ |
| [0]  | struct GovernorBravoDelegateStorageV1.Receipt | The voting receipt |

### quorumVotes

```solidity
function quorumVotes() public view returns (uint256)
```

The number of votes in support of a proposal required in order for a quorum to be reached and for a vote to succeed. For hifi protocol it is set to be 2% of Hifi total supply.

### state

```solidity
function state(uint256 proposalId) public view returns (enum GovernorBravoDelegateStorageV1.ProposalState)
```

Gets the state of a proposal.

#### Parameters

| Name       | Type    | Description            |
| ---------- | ------- | ---------------------- |
| proposalId | uint256 | The id of the proposal |

#### Return Values

| Name | Type                                              | Description    |
| ---- | ------------------------------------------------- | -------------- |
| [0]  | enum GovernorBravoDelegateStorageV1.ProposalState | Proposal state |

#### ProposalState

```solidity
enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed
}
```

## Non-Constant Functions

### \_acceptAdmin

```solidity
function _acceptAdmin() external
```

This function is used to accept the transfer of admin rights. The message sender (i.e., msg.sender) must be the pending admin.

### \_setPendingAdmin

```solidity
function _setPendingAdmin(address newPendingAdmin) external
```

Begins transfer of admin rights. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.

_Admin function to begin change of admin. The `newPendingAdmin` must call `_acceptAdmin` to finalize the transfer._

#### Parameters

| Name            | Type    | Description        |
| --------------- | ------- | ------------------ |
| newPendingAdmin | address | New pending admin. |

### \_setProposalThreshold

```solidity
function _setProposalThreshold(uint256 newProposalThreshold) external
```

Admin function for setting the proposal threshold.

`newProposalThreshold` must be greater than the hardcoded `MIN_PROPOSAL_THRESHOLD`

#### Parameters

| Name                 | Type    | Description            |
| -------------------- | ------- | ---------------------- |
| newProposalThreshold | uint256 | new proposal threshold |

### \_setVotingDelay

```solidity
function _setVotingDelay(uint256 newVotingDelay) external
```

Admin function for setting the voting delay.

### \_setVotingPeriod

```solidity
function _setVotingPeriod(uint256 newVotingPeriod) external
```

Admin function for setting the voting period.

### cancel

```solidity
function cancel(uint256 proposalId) external
```

Cancels a proposal only if sender is the proposer, or proposer delegates dropped below proposal threshold.

#### Parameters

| Name       | Type    | Description                      |
| ---------- | ------- | -------------------------------- |
| proposalId | uint256 | The id of the proposal to cancel |

### castVote

```solidity
function castVote(uint256 proposalId, uint8 support) external
```

Cast a vote for a proposal.

#### Parameters

| Name       | Type    | Description                                                 |
| ---------- | ------- | ----------------------------------------------------------- |
| proposalId | uint256 | The id of the proposal to vote on                           |
| support    | uint8   | The support value for the vote. 0=against, 1=for, 2=abstain |

### castVoteBySig

```solidity
function castVoteBySig(uint256 proposalId, uint8 support, uint8 v, bytes32 r, bytes32 s) external
```

Cast a vote for a proposal by signature.

_External function that accepts EIP-712 signatures for voting on proposals._

### castVoteWithReason

```solidity
function castVoteWithReason(uint256 proposalId, uint8 support, string reason) external
```

Cast a vote for a proposal with a reason.

#### Parameters

| Name       | Type    | Description                                                 |
| ---------- | ------- | ----------------------------------------------------------- |
| proposalId | uint256 | The id of the proposal to vote on                           |
| support    | uint8   | The support value for the vote. 0=against, 1=for, 2=abstain |
| reason     | string  | The reason given for the vote by the voter                  |

### execute

```solidity
function execute(uint256 proposalId) external payable
```

Executes a queued proposal if eta has passed.

#### Parameters

| Name       | Type    | Description                       |
| ---------- | ------- | --------------------------------- |
| proposalId | uint256 | The id of the proposal to execute |

### initialize

```solidity
function initialize(address timelock_, address hifi_, uint256 votingPeriod_, uint256 votingDelay_, uint256 proposalThreshold_) public
```

Used to initialize the contract during delegator constructor.

#### Parameters

| Name                | Type    | Description                    |
| ------------------- | ------- | ------------------------------ |
| timelock\_          | address | The address of the Timelock    |
| hifi\_              | address | The address of the Hifi token  |
| votingPeriod\_      | uint256 | The initial voting period      |
| votingDelay\_       | uint256 | The initial voting delay       |
| proposalThreshold\_ | uint256 | The initial proposal threshold |

### propose

```solidity
function propose(address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, string description) public returns (uint256)
```

Function used to propose a new proposal. Sender must have delegates above the proposal threshold.

#### Parameters

| Name        | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| targets     | address[] | Target addresses for proposal calls    |
| values      | uint256[] | Eth values for proposal calls          |
| signatures  | string[]  | Function signatures for proposal calls |
| calldatas   | bytes[]   | Calldatas for proposal calls           |
| description | string    | String description of the proposal     |

#### Return Values

| Name | Type    | Description                 |
| ---- | ------- | --------------------------- |
| [0]  | uint256 | Proposal id of new proposal |

### queue

```solidity
function queue(uint256 proposalId) external
```

Queues a proposal of state succeeded.

#### Parameters

| Name       | Type    | Description                     |
| ---------- | ------- | ------------------------------- |
| proposalId | uint256 | The id of the proposal to queue |

## Events

### NewAdmin

```solidity
event NewAdmin(address oldAdmin, address newAdmin)
```

Emitted when pendingAdmin is accepted, which means admin is updated.

### NewPendingAdmin

```solidity
event NewPendingAdmin(address oldPendingAdmin, address newPendingAdmin)
```

Emitted when pendingAdmin is changed.

### ProposalCanceled

```solidity
event ProposalCanceled(uint256 id)
```

An event emitted when a proposal has been canceled.

### ProposalCreated

```solidity
event ProposalCreated(uint256 id, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 startBlock, uint256 endBlock, string description)
```

An event emitted when a new proposal is created.

### ProposalExecuted

```solidity
event ProposalExecuted(uint256 id)
```

An event emitted when a proposal has been executed in the Timelock.

### ProposalQueued

```solidity
event ProposalQueued(uint256 id, uint256 eta)
```

An event emitted when a proposal has been queued in the Timelock.

### ProposalThresholdSet

```solidity
event ProposalThresholdSet(uint256 oldProposalThreshold, uint256 newProposalThreshold)
```

Emitted when proposal threshold is set.

### VotingDelaySet

```solidity
event VotingDelaySet(uint256 oldVotingDelay, uint256 newVotingDelay)
```

An event emitted when the voting delay is set.

### VotingPeriodSet

```solidity
event VotingPeriodSet(uint256 oldVotingPeriod, uint256 newVotingPeriod)
```

An event emitted when the voting period is set.

### VoteCast

```solidity
event VoteCast(address voter, uint256 proposalId, uint8 support, uint256 votes, string reason)
```

An event emitted when a vote has been cast on a proposal.
