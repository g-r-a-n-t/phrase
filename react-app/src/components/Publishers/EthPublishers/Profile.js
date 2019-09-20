import React from 'react'
import { Spinner } from 'reactstrap'

import { useProfilePublisher } from 'hooks/usePublisher'

export default function ProfileEthPublisher ({ formValues, ipfsPath, onDone }) {
  const receipt = useProfilePublisher(formValues.format, ipfsPath)

  if (receipt == null) {
    return (
      <>
        <p>Publishing profile to Ethereum.</p>
        <Spinner size="sm" color="secondary" />
      </>
    )
  }

  onDone(receipt)

  return null
}
