import React from 'react'

import { Thin } from '../components/Wrappers'

export default function About () {
  return (
    <Thin>
      <h2>About</h2>
      <br/>
      <p>
        Phrase is a content publishing and distribution platform that uses
        value-backed sentiment as a means of support for public work.
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
        of the phrase. The expression of sentiment is public and used to create
        identities for both users and phrases.
      </p>
    </Thin>
  )
}
