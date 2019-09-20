import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'

import { useIpfsFilesUpload } from 'hooks/useIpfs'

export default function IpfsUploader ({ dir, onDone }) {
  const path = useIpfsFilesUpload(dir)

  if (path == null) {
    return (
      <>
        <p>Uploading content to IPFS.</p>
        <Spinner size="sm" color="secondary" />
      </>
    )
  }

  onDone(path)

  return null
}

IpfsUploader.propTypes = {
  files: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
}
