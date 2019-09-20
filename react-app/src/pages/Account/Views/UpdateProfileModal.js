import React, { useState } from 'react'
import { Form, FormGroup, FormText, Button, Input, Label, Spinner } from 'reactstrap'

import { useProfilePublisher } from 'hooks/usePublisher'
import IpfsUploader from 'components/IpfsUploader'
import { SimpleModal } from 'components/Modal'
import ImageSelect from 'components/ImageSelect'

const NAME_LENGTH = [4, 32]
const BIO_LENGTH = [4, 128]

const Status = {
  ENTERING_VALUES: 'ENTERING_VALUES',
  WAITING_TO_UPLOAD: 'WAITING_TO_UPLOAD',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  WAITING_TO_PUBLISH: 'WAITING_TO_PUBLISH',
  PUBLISH_FAILED: 'PUBLISH_FAILED',
  COMPLETE: 'COMPLETE'
}

export function UpdateProfileModal ({ onDone }) {
  return (
    <SimpleModal onDone={ onDone }>
      <UpdateProfile />
    </SimpleModal>
  )
}

function UpdateProfile () {
  const [status, setStatus] = useState(Status.ENTERING_VALUES)
  const [files, setFiles] = useState(null)
  const [path, setPath] = useState(null)
  const [receipt, setReceipt] = useState(null)

  switch (status) {
    case Status.ENTERING_VALUES:
      return (
        <UpdateForm onReady={ (_files) => {
          setFiles(_files)
          setStatus(Status.WAITING_TO_UPLOAD)
        }}/>
      )
    case Status.WAITING_TO_UPLOAD:
      return (
        <IpfsUploader
          files={ files }
          onComplete={(_path) => {
            setPath(_path)
            setStatus(Status.WAITING_TO_PUBLISH)
          }}
        />
      )
    case Status.WAITING_TO_PUBLISH:
      return (
        <Publisher
          format={ 'ipfs-standard-2019' }
          content={ `/ipfs/${path}` }
          onComplete={(receipt) => {
            setReceipt(receipt)
            setStatus(Status.COMPLETE)
          }}
        />
      )
    case Status.COMPLETE:
      console.log('receipt', receipt)
      return <p>Profile updated!</p>
    default:
      return <p>Something went wrong.</p>
  }
}

function UpdateForm ({ onReady }) {
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
        onClick={ () => { onReady(toDir()) } }
      >Update</Button>
    </Form>
  )
}

function Publisher ({ format, content, onComplete }) {
  const receipt = useProfilePublisher(format, content)

  if (receipt == null) {
    return (
      <>
        <p>Publishing profile to Ethereum.</p>
        <Spinner size="sm" color="secondary" />
      </>
    )
  }

  onComplete(receipt)

  return null
}
