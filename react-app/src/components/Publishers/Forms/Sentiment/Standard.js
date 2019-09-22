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
      <Alert color="info">
        <b>Note:</b> For a sentiment to appear on your profile, you must express
        it towards a phrase. To do this, flip a phrase over and click the blue
        heart. You can create new sentiments here, which you may express at a
        later time.
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
          token:  ethers.constants.AddressZero,
          value: ethers.utils.bigNumberify("10000000000000000"),
          dir: toDir()
        })}
      >Create</Button>
    </Form>
  )
}

StandardForm.propTypes = {
  onReady: PropTypes.func.isRequired
}
