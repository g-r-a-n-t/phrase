import React, { useState } from 'react'

import { useExtExpressedSentiments } from 'hooks/useEvents'
import { SentimentGrid } from 'components/Sentiment'
import { ProfileThumb } from 'components/Profile'
import { sentimentToExpressorsMap } from 'tools/transformers'

export default function ExpressedSentiments ({ phrase }) {
  const [keys, setKeys] = useState([])
  const events = useExtExpressedSentiments()

  if (events == null) return null

  const sentimentToExpressors = sentimentToExpressorsMap(
    events.filter(e => e.phrase == phrase)
  )

  return (
    <>
      <SentimentGrid
        keys={ Object.keys(sentimentToExpressors) }
        onFlip={(keys) => {
          console.log(keys)
        }}
      />
      { keys.length() !== 0 &&
        <>asd</>
      }
    </>
  )
}
