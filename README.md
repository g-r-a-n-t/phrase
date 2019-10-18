# Phrase

Phrase is a decentralized registry for digital content. It establishes formats for content residing on content-addressable networks and provides a novel funding scheme for creators of content that does not depend on advertising or subscriptions.

## Overview

In the context of Phrase, phrases represent things that a person may find meaningful. This could be anything ranging from political action to cultural production. Sentiments on the other hand, represent how a person may feel about phrases.

The creation of phrases and sentiments is open; meaning anyone can create a sentiment or phrase. Each sentiment is given a fixed value by the creator. For someone to express sentiment towards a phrase, they must purchase it for the specified value, with all proceeds going to the creator of the phrase. The expression of sentiment is public and used to create identities for both users and phrases.

The interactions discussed above are facilitated by a registry contract. Its responsibilities are listed below:

- Creation of phrases, sentiments, and profiles.
- Expression of sentiment from a profile to a phrase.

For more information about the registry contract design, read [this](./docs/registry-contract-design.md).

Each of the three entities discussed above has content associated with them, some formats can be found [here](./docs/content-formats.md).

For the sake of tangibility, there is react app in this repository that connects to the registry contract and loads data from IPFS.

## Running Locally

_coming soon_
