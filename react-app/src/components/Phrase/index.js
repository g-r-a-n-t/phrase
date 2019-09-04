import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IoIosHeart } from 'react-icons/io'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'
import {
  ListGroup, ListGroupItem,
  Container, Row, Col,
  Card, CardBody,
  Spinner
} from 'reactstrap'

import { usePhrase } from '../../hooks/useEntity'
import { IpfsImage, IpfsText } from '../../components/IpfsMedia'
import { Nothing } from '../../components/Wrappers'
import { AbsoluteBottomRight, Clickable } from '../../styles'
import ExpressSentimentModal from './ExpressSentimentModal'
import debug from '../../tools/debug'

const Wrapper = styled.div`
  margin: 5px;
  cursor: pointer;
`

const CardSide = styled.div`
  width: 400px;
  height: 400px;
  overflow: hidden;
`

const BackContainer = styled.div`
  margin: 8px;
`

export function Phrase ({ _key }) {
  debug.componentRender('Phrase', _key)

  const [flipped, setFlipped] = useState(false)
  const [expressingSentiment, setExpressingSentiment] = useState(false)

  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <Wrapper onClick={() => { setFlipped(!flipped) }}>
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <CardSide className="border rounded" key="front">
          <IpfsImage width="400px" height="400px" path={`${phrase.content}/image400x400.jpg`} type="image/jpeg" /><br/><br/>
        </CardSide>
        <CardSide className="border rounded bg-light" key="back">
          <BackContainer>
            <h3 className="fluid"><IpfsText path={`${phrase.content}/name.txt`} /></h3>
            <IpfsText path={`${phrase.content}/description.txt`} />
            <IoIosHeart size={32} onClick={() => {
              setExpressingSentiment(true)
            }}/>
            { expressingSentiment &&
              <ExpressSentimentModal phraseKey={_key} onDone={() => {
                setExpressingSentiment(false)
              }}/>
            }
          </BackContainer>
        </CardSide>
      </ReactCardFlip>
    </Wrapper>
  )
}


Phrase.propTypes = {
  _key: PropTypes.string.isRequired
}

export function PhraseList ({ keys }) {
  debug.componentRender('PhraseGrid', keys)

  if (keys.length === 0) return <Nothing>No phrases have been created.</Nothing>

  const elements = keys.map((key) => {
    return <Phrase _key={key} />
  })

  return (
    <div className="d-flex flex-wrap justify-content-left">
      { elements }
    </div>
  )
}

PhraseList.propTypes = {
  keys: PropTypes.array
}
