import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ethers } from 'ethers'
import { Label, Form, FormGroup, Input, FormText, Button } from 'reactstrap'

import ImageSelect from 'components/ImageSelect'

const NAME_LENGTH = [4, 64]

export default function AlbumForm ({ onDone }) {
  const [name, setName] = useState(null)
  const [cover, setCover] = useState(null)
  const [tracks, setTracks] = useState(null)

  function valid () {
    return (
      name !== null &&
      name.length >= NAME_LENGTH[0] &&
      name.length <= NAME_LENGTH[1] &&
      cover !== null &&
      tracks !== null
    )
  }

  function toDir () {
    const files = [
      {
        path: '/name.txt',
        content: Buffer.from(name)
      },
      {
        path: '/cover.jpg',
        content: cover
      }
    ]

    Array.from(tracks).forEach(track => {
      files.push({
        path: `/${track.name}`,
        content: track
      })
    })

    return files
  }

  return (
    <Form>
      <FormGroup>
        <Label><b>Album Name:</b></Label>
        <Input
          type="text"
          onChange={e => setName(e.target.value)}
          placeholder={ `e.g. Magical Mystery Tour (${NAME_LENGTH.join('-')} characters)` }
        />
      </FormGroup>
      <FormGroup>
        <Label><b>Tracks:</b></Label>
        <Input type="file" multiple onChange={ (e) => { setTracks(e.target.files) } } />
        <FormText color="muted">
          The name of each track being uploaded should follow this pattern:
          "<b>[Number] [Name].mp3</b>" e.g. "<b>06 I Am the Walrus.mp3</b>",
          "<b>05 Your Mother Should Know.mp3</b>".
        </FormText>
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
          format: 'ipfs-album-2019',
          dir: toDir(),
          beneficiary: ethers.constants.AddressZero
        })}
      >
        Create
      </Button>
    </Form>
  )
}

AlbumForm.propTypes = {
  onReady: PropTypes.func.isRequired
}
