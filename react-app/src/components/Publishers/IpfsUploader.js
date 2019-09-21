import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, Alert } from 'reactstrap'

import { useIpfsFilesUpload } from 'hooks/useIpfs'

export default function IpfsUploader ({ dir, onDone }) {
  const path = useIpfsFilesUpload(dir)

  if (path == null) {
    return (
      <Alert color="info">
        <Spinner size="sm" color="secondary" /> &nbsp;
        Creating an IPFS block.
      </Alert>
    )
  }

  onDone(path)

  return null
}

IpfsUploader.propTypes = {
  files: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
}
