import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'

import { usePhrasePublisher } from 'hooks/usePublisher'

export default function PhraseEthPublisher ({ formValues, ipfsPath, onDone }) {
  const receipt = usePhrasePublisher(formValues.format, ipfsPath, formValues.beneficiary)

  if (receipt == null) {
    return (
      <>
        <p>Publishing phrase to Ethereum.</p>
        <Spinner size="sm" color="secondary" />
      </>
    )
  }

  onDone(receipt)

  return null
}

PhraseEthPublisher.propTypes = {
  onDone: PropTypes.func.isRequired
}
