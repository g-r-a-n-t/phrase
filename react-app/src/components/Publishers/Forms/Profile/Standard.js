import React, { useState } from 'react'
import { Form, FormGroup, FormText, Label, Input, Button } from 'reactstrap'

import ImageSelect from 'components/ImageSelect'

const NAME_LENGTH = [4, 32]
const BIO_LENGTH = [4, 128]

export default function StandardForm ({ onDone }) {
  const [name, setName] = useState(null)
  const [bio, setDescription] = useState(null)
  const [icon, setIcon] = useState(null)

  function valid () {
    return (
      name !== null                 &&
      name.length >= NAME_LENGTH[0] &&
      name.length <= NAME_LENGTH[1] &&
      bio !== null                 &&
      bio.length >= BIO_LENGTH[0] &&
      bio.length <= BIO_LENGTH[1] &&
      icon !== null
    )
  }

  function toDir () {
    return [
      {
        path: '/name.txt',
        content: Buffer.from(name)
      },
      {
        path: '/bio.txt',
        content: Buffer.from(bio)
      },
      {
        path: '/icon.jpg',
        content: icon
      }
    ]
  }

  return (
    <Form>
      <FormGroup>
        <Label><b>Name:</b></Label>
        <Input
          type="text"
          onChange={e => setName(e.target.value)}
          placeholder={ `e.g. Ringo Starr (${NAME_LENGTH.join('-')} characters)` }
        />
      </FormGroup>
      <FormGroup>
        <Label><b>Bio:</b></Label>
        <Input
          type="textarea"
          onChange={e => setDescription(e.target.value)}
          placeholder={ `Write about yourself. (${BIO_LENGTH.join('-')} characters)` }
        />
      </FormGroup>
      <FormGroup>
        <Label><b>Icon:</b></Label>
        <ImageSelect onReady={ image => { setIcon(image) } } />
        <FormText color="muted">
          Image will be resized to 180x180px.
        </FormText>
      </FormGroup>
      <Button
        className={ valid() ? '' : 'd-none' }
        onClick={ () => onDone({
            format: 'ipfs-standard-2019',
            dir: toDir()
        })}
      >Update</Button>
    </Form>
  )
}
