import React, { useState } from 'react'
import { ethers } from 'ethers'
import PropTypes from 'prop-types'
import { Label, Form, FormGroup, Input, FormText, Button, Alert } from 'reactstrap'

import ImageSelect from 'components/ImageSelect'

const NAME_LENGTH = [4, 32]

export default function StandardForm ({ onDone }) {
  const [name, setName] = useState(null)
  const [cover, setCover] = useState(null)

  function valid () {
    return (
      name !== null &&
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
      <Alert color="info">
        Here you may create a sentiment. A sentiment can be likened to a sticker
        that one would place on a belonging. To create a sentiment, fill out the
        form below. Once you have created a sentiment, you can express it
        towards any phrase by sending the creator the value set below. Once you
        have done so, the sentiment will be displayed on your profile in
        association with the phrase.
      </Alert>
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
        onClick={ () => onDone({
          format: 'ipfs-standard-2019',
          token: ethers.constants.AddressZero,
          value: ethers.utils.bigNumberify('10000000000000000'),
          dir: toDir()
        })}
      >Create</Button>
    </Form>
  )
}

StandardForm.propTypes = {
  onReady: PropTypes.func.isRequired
}
