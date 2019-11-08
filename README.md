## Phrase

Phrase is a decentralized registry for discrete digital content. It establishes formats for content residing on content-addressable networks and provides a novel funding scheme for creators of content.

_Why phrase? The term phrase generally means a collection of symbols or patterns that form a distinct meaning. You can have phrases in virtually every type of expression, whether it be speech, music, or visuals. Use of the term here is just and extension of its meaning over files._

### Overview

A phrase is a discrete unit of digital content. The root of its content and its format is stored in a registry contract. This means that you can render the content by referencing the phrase's key.

For example, you can render a phrase in React like so:

```html
<Phrase _key="ABC...123" />
```

![Windows96 Album](images/phrase.gif)

_In this case, it's an [album](https://windows96.bandcamp.com/album/enchanted-instrumentals-and-whispers)._

The phrase is discrete in the sense that everything you need to interact with it is stored behind a registry key. This design is advantageous in an internet where many applications share the same state and data context.

This content is also payable. All this means is that there is a beneficiary address stored in the registry along with the content. By default, the creator is the beneficiary.

If you would like, you can send money directly to the beneficiary, but that's pretty boring. Instead, you can pin a _value-backed sentiment_ to the phrase. A value-backed sentiment is something that represents how you feel about something else. To pin a sentiment, you must transfer a fixed amount of tokens to the phrase's beneficiary. Think of it as cryptographic sticker for your Ethereum address.

This value transfer is meant to accomplish two things:

1. Subsidize the work required to create phrases.
2. Establish a public relationship between the phrase and person funding it.

This is what a sentiment looks like:

```html
<Sentiment _key="ABC...123" />
```

![That's Vape](images/sentiment.gif)

### Technical Details

The interactions discussed above are facilitated by a registry contract. Its responsibilities are as follows:

- Creation of phrases, sentiments, and profiles.
- Pinning of sentiment from an address to a phrase.

For more information about the registry contract design, read [this](./docs/registry-contract-design.md).

Each of the three entities discussed above has content associated with them, some formats can be found [here](./docs/content-formats.md).

For the sake of tangibility, there is react app in this repository that connects to the registry contract and loads data from IPFS.

### Running Locally

Development chain: `ganache-cli --networkId 5777 -p 7545`

IPFS: `ipfs daemon`

Contract deployment: `cd solidity-contracts && truffle deploy`

Webapp: `cd react-app && yarn start`
