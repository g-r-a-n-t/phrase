import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IoMdDisc } from 'react-icons/io'
import { Form, FormGroup, Input, FormText, Button } from 'reactstrap'

import ImageSelect from 'components/ImageSelect'

const NAME_LENGTH = [4, 48]

export default function AlbumForm ({ onReady }) {
  const [name, setName] = useState(null)
  const [cover, setImage] = useState(null)
  const [tracks, setTracks] = useState(null)

  function valid () {
    return (
      name !== null                 &&
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
      <IoMdDisc className="text-primary" size={32}/>
      <br/><br/>
      <FormGroup>
        <Input
          type="text"
          onChange={e => setName(e.target.value)}
          placeholder={ `Name: e.g. Magical Mystery Tour (${NAME_LENGTH.join('-')} characters)` }
        />
      </FormGroup>
      <FormGroup>
        <Input type="file" multiple onChange={ (e) => { setTracks(e.target.files) } } />
      </FormGroup>
      <FormGroup>
        <ImageSelect onReady={ image => { setImage(image) } } />
        <FormText color="muted">
          Image will be resized to 400x400p.
        </FormText>
      </FormGroup>
      <Button className={ valid() ? '' : 'd-none' } onClick={ () => { onReady(toDir()) } }>Create</Button>
    </Form>
  )
}

AlbumForm.propTypes = {
  onReady: PropTypes.func.isRequired
}
