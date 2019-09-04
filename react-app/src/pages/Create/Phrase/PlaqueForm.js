import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IoMdSquare } from 'react-icons/io'
import {
  Form, FormGroup, Label, Input, FormText,
  Row, Col,
  Button
} from 'reactstrap'

import ImageSelect from '../ImageSelect'

export default function PlaqueForm ({ onReady }) {
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [image, setImage] = useState(null)

  function toDir () {
    return [
      {
        path: '/name.txt',
        content: Buffer.from(name)
      },
      {
        path: '/description.txt',
        content: Buffer.from(description)
      },
      {
        path: '/image400x400.jpg',
        content: image
      }
    ]
  }

  return (
    <Form>
      <IoMdSquare size={32}/>
      <br/><br/>
      <FormGroup>
        <Input
          type="text"
          onChange={e => setName(e.target.value)}
          placeholder="Name: e.g. Local campaign fund"
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="textarea"
          onChange={e => setDescription(e.target.value)}
          placeholder="Description: Add more details here."
        />
      </FormGroup>
      <FormGroup>
        <ImageSelect onReady={ image => { setImage(image) } } />
        <FormText color="muted">
          This image will be displayed at 400 by 400px.
        </FormText>
      </FormGroup>
      <Button onClick={ () => { onReady(toDir()) } }>Create</Button>
    </Form>
  )
}

PlaqueForm.propTypes = {
  onReady: PropTypes.func.isRequired
}
