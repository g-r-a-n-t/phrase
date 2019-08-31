import React, {useState} from 'react'
import {
  Modal, ModalBody, ModalFooter,
  Button, Spinner
} from 'reactstrap';

import { useCreatedSentiments } from '../../hooks/useEvents'
import { useExpressedSentimentPublisher } from '../../hooks/usePublisher'
import { SentimentGrid } from '../Sentiment'
import debug from '../../tools/debug'

export default function ExpressSentimentModal ({ phraseKey, onDone }) {
  debug.componentRender('ExpressSentimentModal', phraseKey, onDone)

  const createdSentiments = useCreatedSentiments()
  const [sentimentKey, setSentimentKey] = useState(null)

  if (createdSentiments == null) return null

  const sentimentKeys = createdSentiments.map((createdSentiment) => { return createdSentiment.sentiment })

  return (
    <Modal isOpen={true} size="lg">
      <ModalBody>
        { sentimentKey == null ?
          <SentimentGrid
            keys={sentimentKeys}
            onSelect={(key) => {
              setSentimentKey(key)
          }}/>
        :
          <ExpressedSentimentPublisher phraseKey={ phraseKey } sentimentKey={ sentimentKey } />
        }
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => { onDone() }}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}


function ExpressedSentimentPublisher ({ phraseKey, sentimentKey }) {
  debug.componentRender('ExpressedSentimentPublisher', phraseKey, sentimentKey)

  const receipt = useExpressedSentimentPublisher(phraseKey, sentimentKey)

  if (receipt == null) return <Spinner type="grow" color="secondary" />

  return <div>Sentiment expressed!</div>
}
