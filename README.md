# Phrase

Phrase is a sentiment expression layer for the Ethereum blockchain. Its purpose is to create an environment where the expression of sentiment towards meaningful activity has intrinsic value.

In the context of Phrase, *phrases* represent things that a person may find meaningful. This could be anything ranging from political action to cultural production. *Sentiments* on the other hand, represent how a person may feel about phrases.

The creation of phrases and sentiments is open; meaning anyone can create a sentiment or phrase. Each sentiment is given a fixed value by the creator. For someone to express sentiment towards a phrase, they must purchase it for the specified value, with all proceeds going to the creator of the phrase. The sentiments a person expresses are then used to create a digital identity for that person to share.

## Technical Overview and Example

The contract which handles the operations described above is quite simple. In short, it handles the following actions:

- Creation of phrases, sentiments, and profiles.
- Expression of sentiment from a profile to a phrase.

For more information about the contract design, read [this](docs/registry-contract-design.md).

Each of the three entities discussed above has content associated with them: e.g. and image with a name. Short strings, like the name of an entity, could be stored in the contract, however, media files like images, must be stored on a content addressable network, in this case, IPFS. The interpretation of content is left up to user interfaces with some basic standards to follow. The following is an example of what a phrase's content could look like:

```json
{
  name: "Bernie Sanders 2020",
  description: "Help raise money for the presidential campaign of Bernie Sanders.",
  image: "<replace this with a fake multiaddr>"
}
```

Furthermore, here is an example of a sentiment:

```json
{
  name: "End corporate greed!",
  image: "<replace this with a fake multiaddr>"
}
```

You could say the sentiment above is worth 5 DAI (5 USD), and every time someone expresses it towards the phrase given as an example, they transfer $5 to the campaign of Bernie Sanders. This expression of sentiment would be publicly displayed.

Information from the contract and media files from the content addressable network are then coalesced on a static website, allowing people to easily view the activity of others on the blockchain. There is no need for a dedicated server backend, nor should there be one out of principle.
