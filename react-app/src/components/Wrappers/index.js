import React from 'react'
import {
  Row, Col
} from 'reactstrap'

export function Subtle ({ children }) {
  return (
    <div className="text-secondary text-center" style={{margin: '10px'}}>
      { children }
    </div>
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
