import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IoIosHeart } from 'react-icons/io'
import { Label, Form, FormGroup, Input, FormText, Button } from 'reactstrap'

import ImageSelect from 'components/ImageSelect'

const NAME_LENGTH = [4, 32]

export default function StandardForm ({ onReady }) {
  const [name, setName] = useState(null)
  const [cover, setCover] = useState(null)

  function valid () {
    return (
      name !== null                 &&
      name.length >= NAME_LENGTH[0] &&
      name.length <= NAME_LENGTH[1] &&
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
        path: '/cover.jpg',
        content: cover
      }
    ]
  }

  return (
    <Form>
      <IoIosHeart className="text-primary" size={32}/>
      <br/><br/>
      <FormGroup>
        <Label><b>Sentiment Name:</b></Label>
        <Input
          type="text"
          onChange={e => setName(e.target.value)}
          placeholder={ `e.g. Great Job! (${NAME_LENGTH.join('-')} characters)` }
        />
      </FormGroup>
      <FormGroup>
        <Label><b>Value:</b> .01 ETH</Label>
        <FormText color="muted">
          The value of new sentiments is fixed for the time being.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label><b>Cover:</b></Label>
        <br/>
        <ImageSelect onReady={ image => { setCover(image) } } />
        <FormText color="muted">
          Image will be resized to 120x120px.
        </FormText>
      </FormGroup>
      <Button
        className={ valid() ? '' : 'd-none' }
        onClick={ () => { onReady(toDir()) } }
      >Create</Button>
    </Form>
  )
}

StandardForm.propTypes = {
  onReady: PropTypes.func.isRequired
}
