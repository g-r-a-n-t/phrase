import React from 'react'
import {
  Modal, ModalBody, ModalFooter,
  Button, Spinner
} from 'reactstrap';

import { useCreatedSentiments } from '../../hooks/useEvents'
import  { SentimentGrid } from '../Sentiment'

export default function ExpressSentimentModal ({ phraseKey, onDone }) {
  const createdSentiments = useCreatedSentiments()

  if (createdSentiments == null) return null

  console.log(createdSentiments)
  const sentimentKeys = createdSentiments.map((createdSentiment) => { return createdSentiment.sentiment })

  return (
    <Modal isOpen={true} size="lg">
      <ModalBody>
        <SentimentGrid keys={sentimentKeys} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => { onDone() }}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}
