# Registry Contract Design

The registry contract is responsible for the creation of entities and pinning of sentiment.

## Data Structures

### Phrase

| value       | type                         |
|:------------|:-----------------------------|
| format      | `string`                     |
| content     | `string`                     |
| creator     | `address payable`            |
| beneficiary | `address payable` *optional* |

### Sentiment

| value   | type      |
|:--------|:----------|
| format  | `string`  |
| content | `string`  |
| token   | `address` |
| value   | `uint256` |

### PinnedSentiment

| value     | type      |
|:----------|:----------|
| phrase    | `bytes32` |
| sentiment | `bytes32` |

### Profile

| value            | type        |
|:-----------------|:------------|
| format           | `string`    |
| content          | `string`    |
| phrases          | `bytes32[]` |
| pinnedSentiments | `bytes32[]` |

## Globals

| value            | type                            |
|:-----------------|:--------------------------------|
| profiles         | `address -> Profile`            |
| phrases          | `bytes32 -> Phrase`             |
| sentiments       | `bytes32 -> Sentiment`          |
| pinnedSentiments | `bytes32 -> PinnedSentiment` |

## Public Methods

- `updateProfile(format, content)`
- `createPhrase(format, content, beneficiary)`
- `createSentiment(format, content, token, value)`
- `pinSentiment(phrase, sentiment)`

## Hashing

Each of the structs discussed above, with exception to `Profile`, has a hashing function. In each one, we join the elements together with a dash and compute the `sha256` of the concatenation.
