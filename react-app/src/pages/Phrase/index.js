import React from 'react'
import { ethers } from 'ethers'
import { IoIosHeart } from 'react-icons/io'
import { Container, Row, Col } from 'reactstrap'

import { Phrase } from 'components/Phrase'
import ExpressedSentiments from './ExpressedSentiments'
import { Subtle } from 'components/Wrappers'

export default function PhraseView ({ match }) {
  const key = match.params.key

  return (
    <Container>
      <Row>
        <Col>
          <div style={{ margin: '5px' }}>
            <Phrase _key={ key }/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Subtle>
            -------- <IoIosHeart size={25}/> --------
          </Subtle>
          <ExpressedSentiments phrase={ key } />
        </Col>
      </Row>
    </Container>
  )
}
