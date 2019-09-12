import React, { useState } from 'react'
import { ethers } from 'ethers'

import { PlaqueForm, AlbumForm } from './Forms'
import Publisher from './Publisher'
import FormatSelect from './FormatSelect'
import IpfsUploader from 'components/IpfsUploader'
import { Subtle, Thin } from 'components/Wrappers'

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

  switch (status) {
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
        case 'ipfs-album-2019':
          return (
            <Thin>
              <AlbumForm onReady={ (_files) => {
                setFiles(_files)
                setStatus('WAITING_TO_UPLOAD')
              }}/>
            </Thin>
          )
        default:
          return <Subtle>Sorry, this format actually isn't supported yet.</Subtle>
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
      console.log('receipt', receipt)
      return <p>Phrase created!</p>
  }
}
