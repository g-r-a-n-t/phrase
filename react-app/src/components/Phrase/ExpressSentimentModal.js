import React, {useState} from 'react'
import { IoIosAdd } from 'react-icons/io'
import {
  Spinner
} from 'reactstrap';

import { useCreatedSentiments } from '../../hooks/useEvents'
import { useExpressedSentimentPublisher } from '../../hooks/usePublisher'
import { Sentiment } from '../Sentiment'
import { SimpleModal } from '../Modal'
import debug from '../../tools/debug'

export default function ExpressSentimentModal ({ phraseKey, onDone }) {
  debug.componentRender('ExpressSentimentModal', phraseKey, onDone)

  const createdSentiments = useCreatedSentiments()
  const [sentimentKey, setSentimentKey] = useState(null)

  if (createdSentiments == null) return null

  const sentimentKeys = createdSentiments.map((createdSentiment) => { return createdSentiment.sentiment })

  return (
    <SimpleModal onDone={ onDone }>
      { sentimentKey == null ?
        <ExpressSentimentGrid
          keys={sentimentKeys}
          onSelect={(key) => { setSentimentKey(key) }}
        />
      :
        <ExpressedSentimentPublisher phraseKey={ phraseKey } sentimentKey={ sentimentKey } />
      }
    </SimpleModal>
  )
}


function ExpressedSentimentPublisher ({ phraseKey, sentimentKey }) {
  debug.componentRender('ExpressedSentimentPublisher', phraseKey, sentimentKey)

  const receipt = useExpressedSentimentPublisher(phraseKey, sentimentKey)

  if (receipt == null) return <Spinner type="grow" color="secondary" />

  return <div>Sentiment expressed!</div>
}

function ExpressSentimentGrid ({ keys, onSelect }) {
  const elements = keys.map((key) => {
    return (
      <Sentiment
        selectText={<IoIosAdd size={19} />}
        key={`sentiment-${key}`}
        _key={ key }
        onSelect={() => { onSelect(key) }}
      />
    )
  })

  return (
    <div className="d-flex flex-wrap justify-content-left">
      { elements }
    </div>
  )
}
