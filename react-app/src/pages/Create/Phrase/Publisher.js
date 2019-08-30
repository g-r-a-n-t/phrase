import React from 'react'
import PropTypes from 'prop-types'
import {
  Spinner
} from 'reactstrap'

import { usePhrasePublisher } from '../../../hooks/usePublisher'

export default function Publisher ({ format, content, beneficiary, onComplete }) {
  const receipt = usePhrasePublisher(format, content, beneficiary)

  if (receipt == null) {
    return (
      <>
        <p>Publishing phrase to Ethereum.</p>
        <Spinner size="sm" color="secondary" />
      </>
    )
  }

  onComplete(receipt)

  return null
}

Publisher.propTypes = {
  format: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  beneficiary: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired
}
