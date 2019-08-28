import React from 'react'
import PropTypes from 'prop-types'
import {
  Spinner
} from 'reactstrap'

import { useIpfsFilesUpload } from '../../hooks/useIpfs'

export default function IpfsUploader ({ files, onComplete }) {
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

IpfsUploader.propTypes = {
  files: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
}
