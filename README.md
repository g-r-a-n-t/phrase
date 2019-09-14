# Phrase

Phrase is a content publishing and distribution platform that uses value-backed sentiment as a means of support for public work.

In the context of Phrase, phrases represent things that a person may find meaningful. This could be anything ranging from political action to cultural production. Sentiments on the other hand, represent how a person may feel about phrases.

The creation of phrases and sentiments is open; meaning anyone can create a sentiment or phrase. Each sentiment is given a fixed value by the creator. For someone to express sentiment towards a phrase, they must purchase it for the specified value, with all proceeds going to the creator of the phrase. The expression of sentiment is public and used to create identities for both users and phrases.

## Technical Overview

The contract which handles the operations described above is quite simple. In short, it handles the following actions:

- Creation of phrases, sentiments, and profiles.
- Expression of sentiment from a profile to a phrase.

For more information about the contract design, read [this](./docs/registry-contract-design.md).

Each of the three entities discussed above has content associated with them in the form of an IPFS directory. Some formats can be found [here](./docs/content-formats.md).
