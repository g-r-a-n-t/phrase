import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Form, FormGroup, Label, Input, FormText,
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
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Local campaign fund"
        />
      </FormGroup>
      <FormGroup>
        <Label for="">Description</Label>
        <Input
          type="textarea"
          onChange={e => setDescription(e.target.value)}
          placeholder="Add more details here."
        />
      </FormGroup>
      <FormGroup>
        <Label for="image">Image</Label>
        <ImageSelect onReady={ image => { setImage(image) } } />
        <FormText color="muted">
          Please keep the image dimensions around 400x400.
        </FormText>
      </FormGroup>
      <Button onClick={ () => { onReady(toDir()) } }>Submit</Button>
    </Form>
  )
}

PlaqueForm.propTypes = {
  onReady: PropTypes.func.isRequired
}
