import React from 'react'
import { ethers } from 'ethers'
import { Container, Row, Col } from 'reactstrap'

import { Phrase } from 'components/Phrase'
import ExpressedSentiments from './ExpressedSentiments'

export default function PhraseView ({ match }) {
  const key = match.params.key

  return (
    <Container>
      <Row>
        <Phrase _key={ key }/>
      </Row>
      <Row>
        <ExpressedSentiments phrase={ key } />
      </Row>
    </Container>
  )
}
