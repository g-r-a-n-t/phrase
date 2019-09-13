import React from 'react'
import PropTypes from 'prop-types'
import {
  Spinner
} from 'reactstrap'

import { useSentimentPublisher } from 'hooks/usePublisher'

export default function Publisher ({ format, content, token, value, onComplete }) {
  const receipt = useSentimentPublisher(format, content, token, value)

  if (receipt == null) {
    return (
      <>
        <p>Publishing sentiment to Ethereum.</p>
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
  token: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired
}
