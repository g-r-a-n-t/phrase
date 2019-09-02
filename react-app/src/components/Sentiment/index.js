import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'
import {
  Spinner, Button
} from 'reactstrap'

import { useSentiment } from '../../hooks/useEntity'
import { IpfsImage, IpfsText } from '../IpfsMedia'
import debug from '../../tools/debug'

const Wrapper = styled.div`
  margin: 5px;
  cursor: pointer;
  overflow: hidden;
`

const CardFront = styled.div`
  width: 120px;
  height: 120px;
`

const CardBack = styled.div`
  background: grey;
  width: 120px;
  height: 120px;
`

// TODO: Clicking the sentiment should flip it like a card and display the name and value details
export function Sentiment ({ _key, selectText = 'select', onSelect = null}) {
  debug.componentRender('Sentiment', _key)

  const [flipped, setFlipped] = useState(false)
  const sentiment = useSentiment(_key)

  if (sentiment == null) return <Spinner type="grow" color="secondary" />

  return (
    <Wrapper onClick={() => { setFlipped(!flipped) }}>
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <CardFront key="front">
          <IpfsImage width="120px" height="120px" path={`${sentiment.content}/image120x120.jpg`} type="image/jpeg" />
        </CardFront>
        <CardBack key="back">
          <IpfsText path={`${sentiment.content}/name.txt`} />
          <div>{ sentiment.value.toString() }</div>
          <div>{ sentiment.token }</div>
          { onSelect != null &&
            <Button onClick={ () => { onSelect() }}>{ selectText }</Button>
          }
        </CardBack>
      </ReactCardFlip>
    </Wrapper>
  )
}

Sentiment.propTypes = {
  _key: PropTypes.string.isRequired
}

export function SentimentGrid ({ keys, onSelect }) {
  const elements = []

  for (let i = 0; i < keys.length; i++) {
    elements.push(
      <Sentiment
        key={`sentiment-${i}`}
        _key={ keys[i] }
        onSelect={() => { onSelect(keys[i]) }}
      />
    )
  }

  return (
    <div className="d-flex flex-wrap justify-content-around">
      { elements }
    </div>
  )
}
