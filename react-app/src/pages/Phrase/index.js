import React from 'react'
import { ethers } from 'ethers'
import { IoIosHeart } from 'react-icons/io'
import { Container, Row, Col } from 'reactstrap'

import { PhraseExploded } from 'components/Phrase'
import ExpressedSentiments from './ExpressedSentiments'
import { Subtle } from 'components/Wrappers'

export default function PhraseView ({ match }) {
  const key = match.params.key

  return (
    <Container>
      <Row>
        <Col>
          <div className="border border-light rounded" style={{ padding: '5px' }}>
            <PhraseExploded _key={ key }/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <div className="border border-light rounded">
            <Subtle>
              -------- <IoIosHeart size={25}/> --------
            </Subtle>
            <ExpressedSentiments phrase={ key } />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
