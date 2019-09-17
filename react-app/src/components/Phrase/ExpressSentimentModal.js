import React, { useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import PropTypes from 'prop-types'
import { MdArrowForward, MdCheck } from 'react-icons/md'
import { Spinner, Button, Alert } from 'reactstrap'

import { useCreatedSentiments } from 'hooks/useEvents'
import { useExpressedSentimentPublisher } from 'hooks/usePublisher'
import { Sentiment } from 'components/Sentiment'
import { Phrase } from 'components/Phrase'
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
          keys={ sentimentKeys }
          onSelect={(key) => { setSentimentKey(key) }}
        />
        : <ExpressedSentimentPublisher
          phraseKey={ phraseKey }
          sentimentKey={ sentimentKey }
          onCancel={ () => { setSentimentKey(null) }}
        />
      }
    </SimpleModal>
  )
}

ExpressSentimentModal.propTypes = {
  phraseKey: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired
}

function ExpressedSentimentPublisher ({ phraseKey, sentimentKey, onCancel = () => {} }) {
  debug.componentRender('ExpressedSentimentPublisher', phraseKey, sentimentKey)

  const receipt = useExpressedSentimentPublisher(phraseKey, sentimentKey)

  const arrow = (
    <div className="d-flex align-items-center justify-content-around">
      <Sentiment _key={ sentimentKey }/>
      <MdArrowForward size={ 50 }/>
      <Phrase _key={ phraseKey }/>
    </div>
  )

  if (receipt == null) return (
    <>
      { arrow }
      <br/>
      <div className="text-center">
        <Spinner size="sm" color="primary"/> &nbsp; &nbsp; &nbsp;
        <Button className="btn-cancel" onClick={ onCancel }>cancel</Button>
      </div>
    </>
  )

  console.log('receipt', receipt)
  return (
    <Alert color="success">
      { arrow }
      <div className="text-center text-success">
        <MdCheck size={ 80 }/>
      </div>
    </Alert>
  )
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
          selectText={ <IoIosAdd size={19} /> }
          _key={ key }
          onSelect={() => { onSelect(key) }}
        />
      </div>
    )
  })

  return (
    <>
      <h6 className="border-bottom" style={{ paddingBottom: '5px' }}>
        Recently Created
      </h6>
      <div className="d-flex flex-wrap justify-content-left">
        { elements }
      </div>
    </>
  )
}

ExpressSentimentGrid.propTypes = {
  keys: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}
