import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'

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
      <>
        <p>Publishing sentiment to Ethereum.</p>
        <Spinner size="sm" color="secondary" />
      </>
    )
  }

  onDone(receipt)

  return null
}

SentimentEthPublisher.propTypes = {
  onDone: PropTypes.func.isRequired
}
