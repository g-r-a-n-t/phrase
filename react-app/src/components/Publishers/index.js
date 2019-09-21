import React from 'react'

import { SentimentForm, ProfileForm, PhraseForm } from './Forms'
import { SentimentEthPublisher, ProfileEthPublisher, PhraseEthPublisher } from './EthPublishers'
import Publisher from './Publisher'

export function SentimentPublisher ({ onDone = () => {} }) {
  return <Publisher
    Form={ SentimentForm }
    EthPublisher={ SentimentEthPublisher }
    onDone={ onDone }
  />
}

export function ProfilePublisher ({ onDone = () => {} }) {
  return <Publisher
    Form={ ProfileForm }
    EthPublisher={ ProfileEthPublisher }
    onDone={ onDone }
  />
}

export function PhrasePublisher ({ onDone = () => {} }) {
  return <Publisher
    Form={ PhraseForm }
    EthPublisher={ PhraseEthPublisher }
    onDone={ onDone }
  />
}
