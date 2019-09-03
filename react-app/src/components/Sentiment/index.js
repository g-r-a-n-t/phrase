import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'
import {
  Spinner, Button
} from 'reactstrap'

import { useSentiment } from '../../hooks/useEntity'
import { IpfsImage, IpfsText } from '../IpfsMedia'
import { TokenAmount } from '../Tokens'
import debug from '../../tools/debug'

const Wrapper = styled.div`
  margin: 5px;
  cursor: pointer;
`

const CardSide = styled.div`
  width: 120px;
  height: 120px;
  overflow: hidden;
`

const BackContainer = styled.div`
  margin: 3px;
`

export function Sentiment ({ _key, onSelect = null, selectText}) {
  debug.componentRender('Sentiment', _key)

  const [flipped, setFlipped] = useState(false)
  const sentiment = useSentiment(_key)

  if (sentiment == null) return <Spinner type="grow" color="secondary" />

  return (
    <Wrapper onClick={() => { setFlipped(!flipped) }}>
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <CardSide className="border rounded" key="front">
          <IpfsImage width="120px" height="120px" path={`${sentiment.content}/image120x120.jpg`} type="image/jpeg" />
        </CardSide>
        <CardSide className="border rounded bg-light" key="back">
          <BackContainer>
            <div className="small font-weight-bold"><IpfsText path={`${sentiment.content}/name.txt`} /></div>
            <div className="small">
              <TokenAmount address={ sentiment.token } amount={ sentiment.value } />
            </div>
            { onSelect != null &&
              <Button className="btn-sm fixed-bottom" onClick={ (e) => {
                e.stopPropagation()
                onSelect()
              }}>{ selectText }</Button>
            }
          </BackContainer>
        </CardSide>
      </ReactCardFlip>
    </Wrapper>
  )
}

Sentiment.propTypes = {
  _key: PropTypes.string.isRequired
}
