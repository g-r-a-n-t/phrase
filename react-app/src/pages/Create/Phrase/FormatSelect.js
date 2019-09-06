import React from 'react'
import PropTypes from 'prop-types'
import {
  Card, CardBody, CardHeader, CardTitle,
  Row, Col
} from 'reactstrap'
import {
  IoIosImage,
  IoMdVideocam,
  IoIosMusicalNotes,
  IoMdSquare
} from 'react-icons/io'

import { Thin, Subtle } from '../../../components/Wrappers'

export default function FormatSelect ({ onReady }) {
  return (
    <Thin>
      <Subtle>Select a phrase format.</Subtle>
      <br />
      <Row>
        <Col lg="6">
          <Card onClick={() => { onReady('ipfs-plaque-2019') }} style={{ cursor: 'pointer' }}>
            <CardHeader>
              <IoMdVideocam size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Video</h5></CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card onClick={() => { onReady('ipfs-album-2019') }} style={{ cursor: 'pointer' }}>
            <CardHeader>
              <IoIosMusicalNotes size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Album</h5></CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col lg="6">
          <Card onClick={() => { onReady('ipfs-plaque-2019') }} style={{ cursor: 'pointer' }}>
            <CardHeader>
              <IoMdSquare size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Plaque</h5></CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card onClick={() => { onReady('ipfs-photo-2019') }} style={{ cursor: 'pointer' }}>
            <CardHeader>
              <IoIosImage size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Photo</h5></CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Thin>
  )
}

FormatSelect.propTypes = {
  onReady: PropTypes.func.isRequired
}
