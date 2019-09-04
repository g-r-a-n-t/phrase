import React from 'react'
import {
  Row, Col
} from 'reactstrap'

export function Nothing ({ children }) {
  return (
    <h5 className="text-secondary text-center">
      <br />
        { children }
      <br /><br />
    </h5>
  )
}

export function Thin ({ children }) {
  return (
    <Row>
      <Col lg={{ size: 6, offset: 3 }}>
        { children }
      </Col>
    </Row>
  )
}
