import React from 'react'
import { Spinner } from 'reactstrap'

import { useCreatedPhrases } from 'hooks/useEvents'
import ProfileActivity from './ProfileActivity'
import { Subtle } from 'components/Wrappers'
import { creatorToPhrasesList } from 'tools/transformers'

export default function Landing () {
  const createdPhrases = useCreatedPhrases()

  if (createdPhrases == null) return <Spinner type="grow" color="secondary" />

  const feed = creatorToPhrasesList(createdPhrases).map(creatorAndPhrases => {
    return (
      <div key={ `profileActivity-${creatorAndPhrases.creator}` } style={{ marginBottom: '5px' }}>
        <ProfileActivity
          profile={ creatorAndPhrases.creator }
          createdPhrases={ creatorAndPhrases.phrases }
        />
      </div>
    )
  })

  return (
    <>
      <Subtle>----- Recent Activity -----</Subtle>
      { feed }
    </>
  )
}
