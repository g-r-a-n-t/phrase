import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  ListGroup, ListGroupItem,
  Row, Col,
  Spinner
} from 'reactstrap'

import { usePhrase } from '../../hooks/useEntity'
import { useRegistryContract } from '../../hooks/useContract'
import { IpfsImage, IpfsText } from '../../components/IpfsMedia'

const EmptyList = styled.h5`
  width: 100%;
  text-align: center;
  margin: 10px;
  color: grey;
`

const ExpressSentiment = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
`

export function Phrase ({ _key }) {
  console.log('Rendering Phrase (key): ', _key)

  const phrase = usePhrase(_key)
  const registry = useRegistryContract()

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  // standard format
  return (
    <div>
      <Row>
        <Col xs="auto">
          <IpfsImage width="400px" height="400px" path={`${phrase.content}/image500x500.jpg`} type="image/jpeg" /><br/><br/>
        </Col>
        <Col>
          <h3><IpfsText path={`${phrase.content}/name.txt`} /></h3>
          <IpfsText path={`${phrase.content}/description.txt`} />
        </Col>
      </Row>
      <ExpressSentiment>
        <img src="heart.svg" alt="heart" width="30px" onClick={() => {
          registry.expressSentiment(
            _key, '0x5ed586189eab1d4320c38bf1ff35b1dd3985f2aee2864d51a7e8e2a504d68299',
            { value: '0xde0b6b3a7640000' }
          )
        }}/>
      </ExpressSentiment>
    </div>
  )
}

Phrase.propTypes = {
  _key: PropTypes.string.isRequired
}

export function PhraseList ({ keys }) {
  console.log('Rendering PhraseList (keys): ', keys)

  if (keys.length === 0) return <EmptyList>Nothing to show</EmptyList>

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
