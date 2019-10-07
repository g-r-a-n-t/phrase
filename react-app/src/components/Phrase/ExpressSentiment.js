import React, { useState } from 'react'
import { useWeb3Context } from 'web3-react'
import { IoIosAdd } from 'react-icons/io'
import PropTypes from 'prop-types'
import { MdArrowForward, MdCheck } from 'react-icons/md'
import { Spinner, Button } from 'reactstrap'

import { useCreatedSentiments, useExtExpressedSentiments } from 'hooks/useEvents'
import { useExpressedSentimentPublisher } from 'hooks/usePublisher'
import { Sentiment } from 'components/Sentiment'
import { Phrase } from 'components/Phrase'
import { Subtle } from 'components/Wrappers'
import debug from 'tools/debug'

export default function ExpressSentiment ({ phraseKey }) {
  const createdSentiments = useCreatedSentiments()
  const expressedSentiments = useExtExpressedSentiments()
  const { account } = useWeb3Context()
  const [sentimentKey, setSentimentKey] = useState(null)

  if (createdSentiments == null || expressedSentiments == null) return null

  const personalSentimentKeys = createdSentiments
    .filter(createdSentiment => createdSentiment.creator === account)
    .map(createdSentiment => createdSentiment.sentiment )

  const otherSentimentKeys = createdSentiments
    .filter(createdSentiment => createdSentiment.creator !== account)
    .map(createdSentiment => createdSentiment.sentiment )

  const expressedSentimentKeys = expressedSentiments
    .filter(expressedSentiment => expressedSentiment.phrase === phraseKey)
    .map(expressedSentiment => expressedSentiment.sentiment )

  if (sentimentKey === null) {
    return <>
      <h6 className="border-bottom" style={{ paddingBottom: '5px' }}>
        Expressed by others
      </h6>
      <ExpressSentimentGrid
        keys={ expressedSentimentKeys }
        onSelect={(key) => { setSentimentKey(key) }}
      /><br/>
      <h6 className="border-bottom" style={{ paddingBottom: '5px' }}>
        Created by you
      </h6>
      <ExpressSentimentGrid
        keys={ personalSentimentKeys }
        onSelect={(key) => { setSentimentKey(key) }}
      /><br/>
      <h6 className="border-bottom" style={{ paddingBottom: '5px' }}>
        Created by others
      </h6>
      <ExpressSentimentGrid
        keys={ otherSentimentKeys }
        onSelect={(key) => { setSentimentKey(key) }}
      />
    </>
  }

  return <ExpressedSentimentPublisher
    phraseKey={ phraseKey }
    sentimentKey={ sentimentKey }
    onCancel={ () => { setSentimentKey(null) }}
  />
}

ExpressSentiment.propTypes = {
  phraseKey: PropTypes.string.isRequired
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

  if (receipt == null) {
    return (
    <>
      { arrow }
      <br/>
      <div className="text-center">
        <Spinner size="sm" color="primary"/> &nbsp; &nbsp; &nbsp;
        <Button className="btn-cancel" onClick={ onCancel }>cancel</Button>
      </div>
    </>
    )
  }

  console.log('receipt', receipt)
  return (
    <>
      { arrow }
      <div className="text-center text-success">
        <MdCheck size={ 80 }/>
      </div>
    </>
  )
}

ExpressedSentimentPublisher.propTypes = {
  phraseKey: PropTypes.string.isRequired,
  sentimentKey: PropTypes.string.isRequired,
  onCancel: PropTypes.func
}

function ExpressSentimentGrid ({ keys, onSelect }) {
  if (keys.length === 0) return <Subtle>Nothing to show</Subtle>

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
    <div className="d-flex flex-wrap justify-content-left">
      { elements }
    </div>
  )
}

ExpressSentimentGrid.propTypes = {
  keys: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}
