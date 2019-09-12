import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, CardTitle, CardText, Row, Col } from 'reactstrap'
import { IoMdImage, IoMdFilm, IoMdDisc, IoMdSquare } from 'react-icons/io'

import { Thin } from 'components/Wrappers'

export default function FormatSelect ({ onReady }) {
  return (
    <Thin>
      <Row>
        <Col lg="6">
          <Card onClick={() => { onReady('ipfs-plaque-2019') }} style={{ cursor: 'pointer', height: '100%' }}>
            <CardHeader className="text-primary">
              <IoMdSquare size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Plaque</h5></CardTitle>
              <CardText>
                Representation of broad ranging activity that benefits the
                public: e.g. political action, open-source software, non-profits.
              </CardText>
              <b>Content:</b>
              <ul>
                <li>Cover Image</li>
                <li>Name</li>
                <li>Description</li>
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card onClick={() => { onReady('ipfs-album-2019') }} style={{ cursor: 'pointer', height: '100%' }}>
            <CardHeader className="text-primary">
              <IoMdDisc size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Album</h5></CardTitle>
              <CardText>
                Collection of songs with visual art.
              </CardText>
              <b>Content:</b>
              <ul>
                <li>Cover Image</li>
                <li>Back Image</li>
                <li>Name</li>
                <li>Audio</li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col lg="6">
          <Card onClick={() => { onReady('ipfs-video-2019') }} style={{ cursor: 'pointer', height: '100%' }}>
            <CardHeader className="text-primary">
              <IoMdFilm size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Video</h5></CardTitle>
              <CardText>
                Dynamic visual media. <i>Note: Videos are contained within collections.</i>
              </CardText>
              <b>Content:</b>
              <ul>
                <li>Cover Image</li>
                <li>Name</li>
                <li>Description</li>
                <li>Video</li>
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card onClick={() => { onReady('ipfs-image-2019') }} style={{ cursor: 'pointer', height: '100%' }}>
            <CardHeader className="text-primary">
              <IoMdImage size={32}/>
            </CardHeader>
            <CardBody>
              <CardTitle><h5>Image</h5></CardTitle>
              <CardText>
                Static visual media. <i>Note: Images are contained within collections.</i>
              </CardText>
              <b>Content:</b>
              <ul>
                <li>Image</li>
                <li>Name</li>
                <li>Description</li>
              </ul>
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
