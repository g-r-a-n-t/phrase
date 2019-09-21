import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, Alert } from 'reactstrap'

import { useSentimentPublisher } from 'hooks/usePublisher'

export default function SentimentEthPublisher ({ formValues, ipfsPath, onDone }) {
  const receipt = useSentimentPublisher(
    formValues.format,
    ipfsPath,
    formValues.token,
    formValues.value
  )

  if (receipt === null) {
    return (
      <Alert color="info">
        <Spinner size="sm" color="secondary" /> &nbsp;
        Publishing sentiment to Ethereum.
      </Alert>
    )
  }

  onDone(receipt)

  return null
}

SentimentEthPublisher.propTypes = {
  onDone: PropTypes.func.isRequired
}
