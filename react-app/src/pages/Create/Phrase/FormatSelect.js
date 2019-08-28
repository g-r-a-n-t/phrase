import React from 'react'
import PropTypes from 'prop-types'
import {
  Card, CardBody, CardHeader, CardTitle, CardText,
  Row, Col,
  Button
} from 'reactstrap'
import {
  IoIosImage,
  IoMdVideocam,
  IoIosMusicalNotes,
  IoMdSquare
} from 'react-icons/io'

export default function FormatSelect ({ onReady }) {
  return (
    <>
      <Row>
        <Col sm="6">
          <Card>
            <CardHeader>
              <IoMdVideocam size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Video</h5></CardTitle>
              <CardText>Consists of a video, name, and description.</CardText>
              <Button onClick={() => { onReady('ipfs-plaque-2019') }}>Create</Button>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card>
            <CardHeader>
              <IoIosMusicalNotes size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Album</h5></CardTitle>
              <CardText>Consists of music.</CardText>
              <Button onClick={() => { onReady('ipfs-photo-2019') }}>Create</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col sm="6">
          <Card>
            <CardHeader>
              <IoMdSquare size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Plaque</h5></CardTitle>
              <CardText>Consists of an image, name, and description.</CardText>
              <Button onClick={() => { onReady('ipfs-plaque-2019') }}>Create</Button>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card>
            <CardHeader>
              <IoIosImage size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Photo</h5></CardTitle>
              <CardText>Consists of a variable size image, name, and description.</CardText>
              <Button onClick={() => { onReady('ipfs-photo-2019') }}>Create</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

FormatSelect.propTypes = {
  onReady: PropTypes.func.isRequired
}
