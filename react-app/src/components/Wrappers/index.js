import React from 'react'
import PropTypes from 'prop-types'
import {
  Row, Col
} from 'reactstrap'

export function Subtle ({ children }) {
  return (
    <div className="text-secondary text-center" style={{ margin: '10px' }}>
      { children }
    </div>
  )
}

Subtle.propTypes = {
  children: PropTypes.node.isRequired
}

export function Bright ({ children }) {
  return (
    <div className="text-primary text-center" style={{ margin: '10px' }}>
      { children }
    </div>
  )
}

Bright.propTypes = {
  children: PropTypes.node.isRequired
}

export function Medium ({ children }) {
  return (
    <Row>
      <Col lg={{ size: 8, offset: 2 }}>
        { children }
      </Col>
    </Row>
  )
}

Medium.propTypes = {
  children: PropTypes.node.isRequired
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

Thin.propTypes = {
  children: PropTypes.node.isRequired
}
