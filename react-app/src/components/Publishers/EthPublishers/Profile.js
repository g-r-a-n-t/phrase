import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, Alert } from 'reactstrap'

import { useProfilePublisher } from 'hooks/usePublisher'

export default function ProfileEthPublisher ({ formValues, ipfsPath, onDone = () => {} }) {
  const receipt = useProfilePublisher(formValues.format, ipfsPath)

  if (receipt == null) {
    return (
      <Alert color="info">
        <Spinner size="sm" color="secondary" /> &nbsp;
        Publishing profile to Ethereum.
      </Alert>
    )
  }

  onDone(receipt)

  return null
}

ProfileEthPublisher.propTypes = {
  formValues: PropTypes.object.isRequired,
  ipfsPath: PropTypes.string.isRequired,
  onDone: PropTypes.func
}
