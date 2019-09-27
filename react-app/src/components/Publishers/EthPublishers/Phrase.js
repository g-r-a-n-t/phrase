import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, Alert } from 'reactstrap'

import { usePhrasePublisher } from 'hooks/usePublisher'

export default function PhraseEthPublisher ({ formValues, ipfsPath, onDone = () => {} }) {
  const receipt = usePhrasePublisher(formValues.format, ipfsPath, formValues.beneficiary)

  if (receipt === null) {
    return (
      <Alert color="info">
        <Spinner size="sm" color="secondary" /> &nbsp;
        Publishing phrase to Ethereum.
      </Alert>
    )
  }

  onDone(receipt)

  return null
}

PhraseEthPublisher.propTypes = {
  formValues: PropTypes.object.isRequired,
  ipfsPath: PropTypes.string.isRequired,
  onDone: PropTypes.func
}
