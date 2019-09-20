import React from 'react'

import { SentimentForm, ProfileForm } from './Forms'
import { SentimentEthPublisher, ProfileEthPublisher } from './EthPublishers'
import Publisher from './Publisher'

export function SentimentPublisher () {
  return <Publisher
    Form={ SentimentForm }
    EthPublisher={ SentimentEthPublisher }
    onDone={ () => {} }
  />
}

export function ProfilePublisher () {
  return <Publisher
    Form={ ProfileForm }
    EthPublisher={ ProfileEthPublisher }
    onDone={ () => {} }
  />
}
