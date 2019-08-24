import { useEffect, useState } from 'react'

import { useRegistryContract } from './useContract'

// TODO: fix missing dependency warning
export function useProfile (address) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()

  useEffect(() => {
    fetchProfile(registry, address, setContent)
  }, [registry, address])

  return content
}


// TODO: fix missing dependency warning
export function usePhrase (key) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()

  useEffect(() => {
    fetchPhrase(registry, key, setContent)
  }, [key, registry])

  return content
}

async function fetchProfile (registry, address, setContent) {
  if (registry == null) return null

  const response = await registry.getProfile(address)

  setContent({
    format: response['0'],
    content: response['1'],
    phrases: response['2'],
    expressedSentiments: response['3']
  })
}

async function fetchPhrase (registry, key, setContent) {
  if (registry == null) return null
  
  const response = await registry.phrases(key)

  setContent({
    format: response.format,
    content: response.content,
    creator: response.creator,
    beneficiary: response.beneficiary
  })
}
