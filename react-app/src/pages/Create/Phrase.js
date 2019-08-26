import React, { useState } from 'react'
import { Buffer } from 'ipfs'
import { ethers } from 'ethers'
import PropTypes from 'prop-types'
import {
  Form, FormGroup, Label, Input, FormText,
  Button,
  Spinner
} from 'reactstrap'

import { useIpfsFilesUpload } from '../../hooks/useIpfs'
import { usePhrasePublisher } from '../../hooks/useEntity'
import ImageSelect from './ImageSelect'

function PhraseUploader ({ files, onComplete }) {
  const path = useIpfsFilesUpload(files)

  if (path == null) {
    return (
      <>
        <p>Uploading content to IPFS.</p>
        <Spinner size="sm" color="secondary" />
      </>
    )
  }

  onComplete(path)

  return null
}

PhraseUploader.propTypes = {
  files: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
}

function PhrasePublisher ({ format, content, beneficiary, onComplete }) {
  const receipt = usePhrasePublisher(format, content, beneficiary)

  if (receipt == null) {
    return (
      <>
        <p>Publishing phrase to Ethereum.</p>
        <Spinner size="sm" color="secondary" />
      </>
    )
  }

  onComplete(receipt)

  return null
}

PhrasePublisher.propTypes = {
  format: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  beneficiary: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired
}

function PlaqueForm ({ onReady }) {
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

export default function CreatePhrase () {
  const [status, setStatus] = useState('SELECTING_FORMAT')
  // SELECTING_FORMAT
  // ENTERING_VALUES,
  // WAITING_TO_UPLOAD,
  // UPLOAD_FAILED,
  // WAITING_TO_PUBLISH,
  // PUBLISH_FAILED
  // Complete
  const [format, setFormat] = useState(null)
  const [files, setFiles] = useState(null)
  const [path, setPath] = useState(null)
  const [receipt, setReceipt] = useState(null)

  if (status === 'SELECTING_FORMAT') {
    return (
      <Button onClick={() => {
        setStatus('ENTERING_VALUES')
        setFormat('ipfs-plaque-2019')
      }} >
        Plaque
      </Button>
    )
  } else if (status === 'ENTERING_VALUES') {
    return (
      <PlaqueForm onReady={ (_files) => {
        setFiles(_files)
        setStatus('WAITING_TO_UPLOAD')
      }}/>
    )
  } else if (status === 'WAITING_TO_UPLOAD') {
    return (
      <PhraseUploader
        files={files}
        onComplete={(_path) => {
          setPath(_path)
          setStatus('WAITING_TO_PUBLISH')
        }}
      />
    )
  } else if (status === 'WAITING_TO_PUBLISH') {
    return (
      <PhrasePublisher
        format={format}
        content={`/ipfs/${path}`}
        beneficiary={ethers.constants.AddressZero}
        onComplete={(receipt) => {
          setReceipt(receipt)
          setStatus('COMPLETE')
        }}
      />
    )
  }

  console.log('transaction receipt', receipt)
  return <p>Your phrase has been published!</p>
}
