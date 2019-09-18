import React, { useState } from 'react'
import { ethers } from 'ethers'

import { StandardForm } from './Forms'
import Publisher from './Publisher'
import IpfsUploader from 'components/IpfsUploader'
import { Thin } from 'components/Wrappers'

const Defaults = {
  format: 'ipfs-standard-2019',
  token: ethers.constants.AddressZero,
  value: ethers.utils.bigNumberify('10000000000000000')
}

const Status = {
  ENTERING_VALUES: 'ENTERING_VALUES',
  WAITING_TO_UPLOAD: 'WAITING_TO_UPLOAD',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  WAITING_TO_PUBLISH: 'WAITING_TO_PUBLISH',
  PUBLISH_FAILED: 'PUBLISH_FAILED',
  COMPLETE: 'COMPLETE'
}

export default function CreateSentiment () {
  const [status, setStatus] = useState(Status.ENTERING_VALUES)
  const [files, setFiles] = useState(null)
  const [path, setPath] = useState(null)
  const [receipt, setReceipt] = useState(null)

  switch (status) {
    case Status.ENTERING_VALUES:
      return (
        <Thin>
          <StandardForm onReady={ (_files) => {
            setFiles(_files)
            setStatus(Status.WAITING_TO_UPLOAD)
          }}/>
        </Thin>
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
          format={ Defaults.format }
          content={ `/ipfs/${path}` }
          token={ Defaults.token }
          value={ Defaults.value }
          onComplete={(receipt) => {
            setReceipt(receipt)
            setStatus(Status.COMPLETE)
          }}
        />
      )
    case Status.COMPLETE:
      console.log('receipt', receipt)
      return <p>Sentiment created!</p>
    default:
      return <p>Something went wrong.</p>
  }
}
