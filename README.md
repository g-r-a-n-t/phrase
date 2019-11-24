## Phrase

Phrase is a decentralized registry and fan-funding system for digital content that is built on Ethereum. It has two main objectives:

1. Make it easy to create and load digital content of conventional formats.
2. Make fan-funding more interesting.

Repository structure:

* [docs](docs): Registry contract specification and content formats.
* [js](js): Javascript libraries that interact with the registry and IPFS.
* [react-app](react-app): Reflects the state of the registry using the javascript libraries.
* [solidity-contracts](solidity-contracts): Implementation of the contract specification.

### Overview

A phrase is a discrete unit of digital content. The root address of the content and its format are stored in a registry contract. This means that you can view the content by referencing the phrase's key.

In React, a phrase can be rendered like so:
```html
<Phrase _key="ABC...123" />
```

![Windows96 Album](docs/images/phrase.gif)

_In this case, it's an [album](https://windows96.bandcamp.com/album/enchanted-instrumentals-and-whispers)._

It's also possible to support a phrase; there's a beneficiary Ethereum wallet address stored in the registry alongside the content address. By default, the creator of the phrase is the beneficiary.

If you would like, you can send money directly to the beneficiary, but that's pretty boring. Instead, you can pin a _value-backed sentiment_ to the phrase. A value-backed sentiment is something that represents how you feel about something else. To pin a sentiment, you must transfer a fixed amount of tokens to the phrase's beneficiary. Think of it as cryptographic sticker for your Ethereum address.

This value transfer is meant to accomplish two things:

1. Support the work required to create phrases.
2. Establish a public relationship between the phrase and person funding it.

This is what a sentiment looks like:

![That's Vape](docs/images/sentiment.gif)

In React, this is:
```html
<Sentiment _key="DEF...456" />
```

### Technical Details

The interactions discussed above are facilitated by a registry contract. Its responsibilities are as follows:

- Creation of phrases and sentiments.
- Pinning of sentiment from an address to a phrase.

For more information about the registry contract design, read [this](./docs/registry-contract-design.md).

Both phrases and sentiments have content associated with them, some formats can be found [here](./docs/content-formats.md).

### Running Locally

Development chain: `ganache-cli --networkId 5777 -p 7545`

IPFS: `ipfs daemon`

Contract deployment: `cd solidity-contracts && truffle deploy`

Webapp: `cd react-app && yarn start`
