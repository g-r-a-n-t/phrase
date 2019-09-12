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

Subtle.propTypes = {
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
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired
}
