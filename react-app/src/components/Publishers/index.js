import React from 'react'
import PropTypes from 'prop-types'

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

SentimentPublisher.propTypes = {
  onDone: PropTypes.func
}

export function ProfilePublisher ({ onDone = () => {} }) {
  return <Publisher
    Form={ ProfileForm }
    EthPublisher={ ProfileEthPublisher }
    onDone={ onDone }
  />
}

ProfilePublisher.propTypes = {
  onDone: PropTypes.func
}

export function PhrasePublisher ({ onDone = () => {} }) {
  return <Publisher
    Form={ PhraseForm }
    EthPublisher={ PhraseEthPublisher }
    onDone={ onDone }
  />
}

PhrasePublisher.propTypes = {
  onDone: PropTypes.func
}
