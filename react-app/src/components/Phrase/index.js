import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IoIosHeart } from 'react-icons/io'
import {
  ListGroup, ListGroupItem,
  Row, Col,
  Spinner
} from 'reactstrap'

import { usePhrase } from '../../hooks/useEntity'
import { useRegistryContract } from '../../hooks/useContract'
import { IpfsImage, IpfsText } from '../../components/IpfsMedia'
import { AbsoluteBottomRight, Clickable } from '../../styles'
import ExpressSentimentModal from './ExpressSentimentModal'
import debug from '../../tools/debug'

export function Phrase ({ _key }) {
  debug.componentRender('Phrase', _key)

  const [expressingSentiment, setExpressingSentiment] = useState(false)
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  // TODO: Load format specific content
  // standard format
  return (
    <div>
      <Row>
        <Col xs="auto">
          <IpfsImage width="400px" height="400px" path={`${phrase.content}/image400x400.jpg`} type="image/jpeg" /><br/><br/>
        </Col>
        <Col>
          <h3><IpfsText path={`${phrase.content}/name.txt`} /></h3>
          <IpfsText path={`${phrase.content}/description.txt`} />
        </Col>
      </Row>
      <AbsoluteBottomRight>
        <Clickable>
          <IoIosHeart size={32} onClick={() => {
            setExpressingSentiment(true)
          }}/>
          { expressingSentiment &&
            <ExpressSentimentModal phraseKey={_key} onDone={() => {
              setExpressingSentiment(false)
            }}/>
          }
        </Clickable>
      </AbsoluteBottomRight>
    </div>
  )
}

Phrase.propTypes = {
  _key: PropTypes.string.isRequired
}

export function PhraseList ({ keys }) {
  debug.componentRender('PhraseList', keys)

  if (keys.length === 0) {
    return (
      <h5 className="text-secondary text-center">
        <br />
          No phrases have been created.
        <br /><br />
      </h5>
    )
  }

  const items = []
  keys.forEach((key) => {
    items.push(
      <ListGroupItem key={key}>
        <Phrase _key={key} />
      </ListGroupItem>
    )
  })

  return <ListGroup>{items}</ListGroup>
}

PhraseList.propTypes = {
  keys: PropTypes.array
}
