## Registry Contract Design

The registry contract is responsible for the creation of sentiments and phrases and the pinning of sentiments to phrases.

### Data Structures

#### Phrase

| value       | type                         |
|:------------|:-----------------------------|
| format      | `string`                     |
| content     | `string`                     |
| creator     | `address payable`            |
| beneficiary | `address payable` *optional* |
| pinned      | `bytes20 -> [address]`       |

#### Sentiment

| value   | type      |
|:--------|:----------|
| format  | `string`  |
| content | `string`  |
| token   | `address` |
| value   | `uint256` |

### Globals

| value      | type                   |
|:-----------|:-----------------------|
| phrases    | `bytes20 -> Phrase`    |
| sentiments | `bytes20 -> Sentiment` |

### Public Methods

- `createPhrase(format, content, beneficiary)`
- `createSentiment(format, content, token, value)`
- `pinSentiment(phrase, sentiment)`

### Hashing

There are hashing functions associated with the Sentiment and Phrase structs. In each one, we join the elements together with a dash and compute the `sha256` of the concatenation and trim it down to 20 bytes.
