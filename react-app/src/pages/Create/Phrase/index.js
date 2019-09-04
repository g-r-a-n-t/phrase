import React, { useState } from 'react'
import { ethers } from 'ethers'

import PlaqueForm from './PlaqueForm'
import Publisher from './Publisher'
import FormatSelect from './FormatSelect'
import IpfsUploader from '../IpfsUploader'
import { Thin } from '../../../components/Wrappers'

// TODO: might be worth taking a look at other reduction patterns.
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

  switch(status) {
    case 'SELECTING_FORMAT':
      return (
        <FormatSelect onReady={(_format) => {
          setStatus('ENTERING_VALUES')
          setFormat(_format)
        }}/>
      )
    case 'ENTERING_VALUES':
      switch (format) {
        case 'ipfs-plaque-2019':
          return (
            <Thin>
              <PlaqueForm onReady={ (_files) => {
                setFiles(_files)
                setStatus('WAITING_TO_UPLOAD')
              }}/>
            </Thin>
          )
          default:
            return <p>something went wrong</p>
      }
    case 'WAITING_TO_UPLOAD':
      return (
        <IpfsUploader
          files={files}
          onComplete={(_path) => {
            setPath(_path)
            setStatus('WAITING_TO_PUBLISH')
          }}
        />
      )
    case 'WAITING_TO_PUBLISH':
      return (
        <Publisher
          format={format}
          content={`/ipfs/${path}`}
          beneficiary={ethers.constants.AddressZero}
          onComplete={(receipt) => {
            setReceipt(receipt)
            setStatus('COMPLETE')
          }}
        />
      )
    default:
      return <p>Phrase created!</p>
  }
}
