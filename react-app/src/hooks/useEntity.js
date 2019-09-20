import { useEffect, useState } from 'react'
import { useWeb3Context } from 'web3-react'

import { useCacheContext, cacheId } from 'contexts/cache'
import { useRegistryContract } from './useContract'

const PROFILE_CACHE_LIFETIME = 60 * 10

export function useProfile (key) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()
  const cache = useCacheContext()

  useEffect(() => {
    fetchProfile(cache, registry, key, setContent)
  }, [registry, key, cache])

  return content
}

export function useCurrentProfile () {
  const { account } = useWeb3Context()

  return useProfile(account)
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


async function fetchProfile (cache, registry, key, setContent) {
  if (registry == null) return null

  const id = cacheId('profileContent', key)

  // TODO: Evict user cache when profile-updating events occur
  // - Phrase created
  // - Sentiment expressed
  // - content/format changed
  //if (maybeUseCache(cache, id, setContent)) return null

  const response = await registry.getProfile(key)

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


function maybeUseCache (cache, id, setContent) {
  const result = cache.get(id)

  if (result !== null) {
    setContent(result.val)
    return true
  }

  return false
}
