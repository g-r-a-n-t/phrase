## Phrase

Phrase is a decentralized registry for digital content. It establishes formats for content residing on content-addressable networks and provides a novel funding scheme for creators of content that does not depend on advertising or subscriptions.

Why phrase? The term _phrase_ generally means a collection of symbols or patterns that form meaning. You can have phrases in virtually every type of expression, whether it be language, music, or painting. Use of the term phrase here is just and extension of its meaning over files.

### Overview

A phrase is a discrete unit of digital content that is also payable. The root of its content and its format is stored in a registry contract along with its payable address. This means that you can render the content by referencing the phrase's key.

For example, in React's terms:

```html
<Content address="/phrase/ABC...123" />
```

resolves to:

![Windows96 Album](images/phrase.gif)

Additionally, this content is payable. All this means is that there is a beneficiary address stored in the registry along with the content. By default the creator is the beneficiary.

You can send money directly to the beneficiary if you would like, but it's honestly pretty lame to do that. Instead, you can purchase something called _value-backed sentiment_. A value backed sentiment is something that represents how you feel about something and once you've purchased it, everybody can see it. When you purchase a sentiment, all of the proceeds go directly to the phrase's beneficiary. Think of it like a cryptographic sticker.

The interactions discussed above are facilitated by the registry contract. Its responsibilities are as follows:

- Creation of phrases, sentiments, and profiles.
- Expression of sentiment from a profile to a phrase.

For more information about the registry contract design, read [this](./docs/registry-contract-design.md).

Each of the three entities discussed above has content associated with them, some formats can be found [here](./docs/content-formats.md).

For the sake of tangibility, there is react app in this repository that connects to the registry contract and loads data from IPFS.

### Running Locally

_coming soon_
