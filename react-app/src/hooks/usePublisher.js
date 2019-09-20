// TODO: pull in the publish phrase hook in useEntity and create publishing
// hooks for sentiments, profiles, and expressed sentiments

import { useState, useEffect } from 'react'

import { useRegistryContract } from './useContract'
import { useSentiment } from './useEntity'

export function usePhrasePublisher (format, content, beneficiary) {
  const [receipt, setReceipt] = useState(null)
  const registry = useRegistryContract()

  useEffect(() => {
    publishPhrase(registry, format, content, beneficiary, setReceipt)
  }, [registry, format, content, beneficiary])

  return receipt
}

export function useSentimentPublisher (format, content, token, value) {
  const [receipt, setReceipt] = useState(null)
  const registry = useRegistryContract()

  useEffect(() => {
    publishSentiment(registry, format, content, token, value, setReceipt)
  }, [registry, format, content, token, value])

  return receipt
}

export function useExpressedSentimentPublisher (phraseKey, sentimentKey) {
  const [receipt, setReceipt] = useState(null)
  const registry = useRegistryContract()
  const sentiment = useSentiment(sentimentKey)

  useEffect(() => {
    publishExpressedSentiment(registry, phraseKey, sentimentKey, sentiment, setReceipt)
  }, [registry, sentimentKey, phraseKey, sentiment])

  return receipt
}

export function useProfilePublisher (format, content) {
  const [receipt, setReceipt] = useState(null)
  const registry = useRegistryContract()

  useEffect(() => {
    publishProfile(registry, format, content, setReceipt)
  }, [registry, format, content])

  return receipt
}

async function publishPhrase (registry, format, content, beneficiary, setReceipt) {
  if (registry == null) return null

  const receipt = await registry.createPhrase(format, content, beneficiary)

  setReceipt(receipt)
}

async function publishSentiment (registry, format, content, token, value, setReceipt) {
  if (registry == null) return null

  const receipt = await registry.createSentiment(format, content, token, value)

  setReceipt(receipt)
}

// TODO: this will need to be modifier to handle ERC20 tokens
async function publishExpressedSentiment (registry, phraseKey, sentimentKey, sentiment, setReceipt) {
  if (registry == null || sentiment == null) return null

  const receipt = await registry.expressSentiment(phraseKey, sentimentKey, { value: sentiment.value })

  setReceipt(receipt)
}

async function publishProfile (registry, format, content, setReceipt) {
  if (registry == null) return null

  const receipt = await registry.updateProfile(format, content)

  setReceipt(receipt)
}
