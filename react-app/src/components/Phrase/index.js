import React from 'react'
import styled from 'styled-components'
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

export function Phrase ({ _key }) {
  console.log('Rendering Phrase (key): ', _key)

  const phrase = usePhrase(_key)
  const registry = useRegistryContract()

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
            registry.expressSentiment(
              _key, '0x440a38d43b6e4c46ccdd3f527f340ca5938d4e73101e82dc90a5d023f29d32e9',
              { value: '0xde0b6b3a7640000' }
            )
          }}/>
        </Clickable>
      </AbsoluteBottomRight>
    </div>
  )
}

Phrase.propTypes = {
  _key: PropTypes.string.isRequired
}

export function PhraseList ({ keys }) {
  console.log('Rendering PhraseList (keys): ', keys)

  if (keys.length === 0) {
    return (
      <h5 className="text-secondary text-center">
        <br />
          No phrases to display.
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
