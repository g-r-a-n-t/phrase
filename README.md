## Phrase

Phrase is a decentralized registry for digital content. It establishes formats for content residing on content-addressable networks and provides a novel funding scheme for creators of content that does not depend on advertising or subscriptions.

Why phrase? The term _phrase_ generally means a collection of symbols or patterns that form meaning. You can have phrases in virtually every type of expression, whether it be speech, music, or visuals. Use of the term here is just and extension of its meaning over files.

### Overview

A phrase is a discrete unit of digital content that is also payable. The root of its content and its format is stored in a registry contract along with a payable address. This means that you can render the content by referencing the phrase's key.

For example, with a phrase key and a React component:

```html
<Phrase _key="ABC...123" />
```

You can render the content of the phrase:

![Windows96 Album](images/phrase.gif)

In this case, it's an [album](https://windows96.bandcamp.com/album/enchanted-instrumentals-and-whispers).

This content is also payable, as mentioned above. All this means is that there is a beneficiary address stored in the registry along with the content. By default the creator is the beneficiary.

You can send money directly to the beneficiary, if you would like, but that's pretty boring. Instead, you can purchase something called _value-backed sentiment_. A value-backed sentiment is something that represents how you feel about something else, and when you purchase it, you are funding the phrase's beneficiary. Think of it as cryptographic sticker for your Ethereum address.

This is what a sentiment looks like:

```html
<Sentiment _key="ABC...123" />
```

![That's Vape](images/sentiment.gif)

The interactions discussed above are facilitated by a registry contract. Its responsibilities are as follows:

- Creation of phrases, sentiments, and profiles.
- Expression of sentiment from a profile to a phrase.

For more information about the registry contract design, read [this](./docs/registry-contract-design.md).

Each of the three entities discussed above has content associated with them, some formats can be found [here](./docs/content-formats.md).

For the sake of tangibility, there is react app in this repository that connects to the registry contract and loads data from IPFS.

### Running Locally

Development chain: `ganache-cli --networkId 5777 -p 7545`

IPFS: `ipfs daemon`

Contract deployment: `cd solidity-contracts && truffle deploy`

Webapp: `cd react-app && yarn start`
