import { useEffect, useState } from 'react'
import { useWeb3Context } from 'web3-react'

import { useCacheContext, cacheId } from '../contexts/cache'
import { useRegistryContract } from './useContract'

const PROFILE_CACHE_LIFETIME = 60 * 10

export function useProfile (account) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()
  const web3 = useWeb3Context()
  const cache = useCacheContext()

  // TODO: move this out of the hook
  let address = account
  if (account === 'me') {
    address = web3.account
  }

  useEffect(() => {
    fetchProfile(cache, registry, address, setContent)
  }, [registry, address, cache])

  return content
}

// Throw this out after the above todo is completed
export function useCurrentProfile () {
  return useProfile('me')
}

export function usePhrase (key) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()
  const cache = useCacheContext()

  useEffect(() => {
    fetchPhrase(cache, registry, key, setContent)
  }, [key, registry, cache])

  return content
}

export function useSentiment (key) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()
  const cache = useCacheContext()

  useEffect(() => {
    fetchSentiment(cache, registry, key, setContent)
  }, [key, registry, cache])

  return content
}

export function useExpressedSentiment (key) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()
  const cache = useCacheContext()

  useEffect(() => {
    fetchExpressedSentiment(cache, registry, key, setContent)
  }, [key, registry, cache])

  return content
}

export function usePhrasePublisher (format, content, beneficiary) {
  const [receipt, setReceipt] = useState(null)
  const registry = useRegistryContract()

  useEffect(() => {
    publishPhrase(registry, format, content, beneficiary, setReceipt)
  }, [registry, format, content, beneficiary])

  return receipt
}

async function fetchProfile (cache, registry, address, setContent) {
  if (registry == null) return null

  const id = cacheId('profileContent', address)

  if (maybeUseCache(cache, id, setContent)) return null

  const response = await registry.getProfile(address)

  const profile = {
    format: response['0'],
    content: response['1'],
    phrases: response['2'],
    expressedSentiments: response['3']
  }

  cache.set(id, profile, PROFILE_CACHE_LIFETIME)

  setContent(profile)
}

async function fetchPhrase (cache, registry, key, setContent) {
  if (registry == null) return null

  const id = cacheId('phraseContent', key)

  if (maybeUseCache(cache, id, setContent)) return null

  const response = await registry.phrases(key)

  const phrase = {
    format: response.format,
    content: response.content,
    creator: response.creator,
    beneficiary: response.beneficiary
  }

  cache.set(id, phrase)

  setContent(phrase)
}

async function fetchSentiment (cache, registry, key, setContent) {
  if (registry == null) return null

  const id = cacheId('sentimentContent', key)

  if (maybeUseCache(cache, id, setContent)) return null

  const response = await registry.sentiments(key)

  const sentiment = {
    format: response.format,
    content: response.content,
    token: response.token,
    value: response.value
  }

  cache.set(id, sentiment)

  setContent(sentiment)
}

async function fetchExpressedSentiment (cache, registry, key, setContent) {
  if (registry == null) return null

  const id = cacheId('expressedSentimentContent', key)

  if (maybeUseCache(cache, id, setContent)) return null

  const response = await registry.expressedSentiments(key)

  const expressedSentiment = {
    phrase: response.phrase,
    sentiment: response.sentiment
  }

  cache.set(id, expressedSentiment)

  setContent(expressedSentiment)
}

function maybeUseCache (cache, id, setContent) {
  const result = cache.get(id)

  if (result !== null) {
    setContent(result.obj)
    return true
  }

  return false
}

async function publishPhrase (registry, format, content, beneficiary, setReceipt) {
  if (registry == null) return null

  const receipt = await registry.createPhrase(format, content, beneficiary)

  setReceipt(receipt)
}
