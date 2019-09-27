import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Alert, Spinner } from 'reactstrap'

export default function Loading ({ children }) {
  return (
    <Row>
      <Col lg={{ offset: 3, size: 6 }}>
        <br /><br /><br /><br /><br />
        <Alert color="info" className="text-center">
          <h5>{ children }</h5>
          <br />
          <Spinner size="lg" color="secondary" />
        </Alert>
      </Col>
    </Row>
  )
}

Loading.propTypes = {
  children: PropTypes.node.isRequired
}
