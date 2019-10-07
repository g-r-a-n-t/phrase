import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ethers } from 'ethers'
import { Label, Form, FormGroup, Input, FormText, Button } from 'reactstrap'

import ImageSelect from 'components/ImageSelect'

const NAME_LENGTH = [4, 32]
const DESC_LENGTH = [32, 512]

export default function PlaqueForm ({ onDone = () => {} }) {
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [cover, setCover] = useState(null)

  function valid () {
    return (
      name !== null &&
      name.length >= NAME_LENGTH[0] &&
      name.length <= NAME_LENGTH[1] &&
      description !== null &&
      description.length >= DESC_LENGTH[0] &&
      description.length <= DESC_LENGTH[1] &&
      cover !== null
    )
  }

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
        path: '/cover.jpg',
        content: cover
      }
    ]
  }

  return (
    <Form>
      <FormGroup>
        <Label><b>Plaque Name:</b></Label>
        <Input
          type="text"
          onChange={e => setName(e.target.value)}
          placeholder={ `e.g. Local campaign fund (${NAME_LENGTH.join('-')} characters)` }
        />
      </FormGroup>
      <FormGroup>
        <Label><b>Description:</b></Label>
        <Input
          type="textarea"
          onChange={e => setDescription(e.target.value)}
          placeholder={ `Add more details here (${DESC_LENGTH.join('-')} characters)` }
        />
      </FormGroup>
      <FormGroup>
        <Label><b>Cover:</b></Label>
        <ImageSelect onReady={ image => { setCover(image) } } />
        <FormText color="muted">
          Image will be resized to 400x400px.
        </FormText>
      </FormGroup>
      <Button
        className={ valid() ? '' : 'd-none' }
        onClick={ () => onDone({
          format: 'ipfs-plaque-2019',
          dir: toDir(),
          beneficiary: ethers.constants.AddressZero
        })}
      >Create</Button>
    </Form>
  )
}

PlaqueForm.propTypes = {
  onDone: PropTypes.func
}
