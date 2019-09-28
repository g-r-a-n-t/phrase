import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'

import { PhraseExploded } from 'components/Phrase'
import ExpressedSentiments from './ExpressedSentiments'

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
            <ExpressedSentiments phrase={ key } />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

PhraseView.propTypes = {
  match: PropTypes.object.isRequired
}
