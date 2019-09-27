import React, { useState } from 'react'
import { Alert } from 'reactstrap'

import IpfsUploader from './IpfsUploader'

export default function Publisher ({ Form, EthPublisher, onDone }) {
  const [formValues, setFormValues] = useState(null)
  const [ipfsPath, setIpfsPath] = useState(null)
  const [ethReceipt, setEthReceipt] = useState(null)
  const [doneCalled, setDoneCalled] = useState(false)

  if (formValues === null) {
    return (
      <Form onDone={ values => setFormValues(values) }/>
    )
  }

  if (ipfsPath === null) {
    return (
      <IpfsUploader
        dir={ formValues.dir }
        onDone={ path => setIpfsPath(path) }
      />
    )
  }

  if (ethReceipt === null) {
    return (
      <EthPublisher
        formValues={ formValues }
        ipfsPath={ ipfsPath }
        onDone={ receipt => setEthReceipt(receipt) }
      />
    )
  }

  if (!doneCalled) {
    onDone(formValues, ipfsPath)
    setDoneCalled(true)
  }

  // TODO: verify that everything worked correctly.
  return (
    <Alert color="success">
      Success!
    </Alert>
  )
}
