import React, { useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'

import { useCreatedSentiments } from 'hooks/useEvents'
import { useExpressedSentimentPublisher } from 'hooks/usePublisher'
import { Sentiment } from 'components/Sentiment'
import { SimpleModal } from 'components/Modal'
import debug from 'tools/debug'

export default function ExpressSentimentModal ({ phraseKey, onDone }) {
  debug.componentRender('ExpressSentimentModal', phraseKey, onDone)

  const createdSentiments = useCreatedSentiments()
  const [sentimentKey, setSentimentKey] = useState(null)

  if (createdSentiments == null) return null

  const sentimentKeys = createdSentiments.map((createdSentiment) => { return createdSentiment.sentiment })

  return (
    <SimpleModal onDone={ onDone } width="720px">
      { sentimentKey == null
        ? <ExpressSentimentGrid
          keys={sentimentKeys}
          onSelect={(key) => { setSentimentKey(key) }}
        />
        : <ExpressedSentimentPublisher phraseKey={ phraseKey } sentimentKey={ sentimentKey } />
      }
    </SimpleModal>
  )
}

ExpressSentimentModal.propTypes = {
  phraseKey: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired
}

function ExpressedSentimentPublisher ({ phraseKey, sentimentKey }) {
  debug.componentRender('ExpressedSentimentPublisher', phraseKey, sentimentKey)

  const receipt = useExpressedSentimentPublisher(phraseKey, sentimentKey)

  if (receipt == null) return <Spinner type="grow" color="secondary" />

  return <div>Sentiment expressed!</div>
}

ExpressedSentimentPublisher.propTypes = {
  phraseKey: PropTypes.string.isRequired,
  sentimentKey: PropTypes.string.isRequired
}

function ExpressSentimentGrid ({ keys, onSelect }) {
  const elements = keys.map((key) => {
    return (
      <div key={`sentiment-${key}`} style={{ margin: '5px' }}>
        <Sentiment
          selectText={<IoIosAdd size={19} />}
          _key={ key }
          onSelect={() => { onSelect(key) }}
        />
      </div>
    )
  })

  return (
    <div className="d-flex flex-wrap justify-content-left">
      { elements }
    </div>
  )
}

ExpressSentimentGrid.propTypes = {
  keys: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}
