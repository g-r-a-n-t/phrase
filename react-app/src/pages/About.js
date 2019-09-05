import React from 'react'

export default function About () {
  return (
    <div>
      <h2>About</h2>
      <br/>
      <p>
        Phrase is a content publishing platform powered by value-backed sentiment
        expression. It's built on the <a href="https://en.wikipedia.org/wiki/Ethereum">Ethereum</a> blockchain.
        Its purpose is to create an environment where public initiatives can
        source subsidy from many people based on their sentiment.
      </p>
      <p>
        In the context of Phrase, <i>phrases</i> represent things that a person
        may find meaningful. This could be anything ranging from political action
        to cultural production. <i>Sentiments</i> on the other hand, represent
        how a person may feel about phrases.
      </p>
      <p>
        The creation of phrases and sentiments is open; meaning anyone can create
        a sentiment or phrase. Each sentiment is given a fixed value by the
        creator. For someone to express sentiment towards a phrase, they must
        purchase it for the specified value, with all proceeds going to the creator
        of the phrase. The sentiments a person expresses are then displayed on their
        profile for all to see.
      </p>
    </div>
  )
}
