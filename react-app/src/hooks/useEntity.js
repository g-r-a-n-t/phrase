import { useEffect, useState } from 'react'
import { useWeb3Context } from 'web3-react'

import { useRegistryContract } from './useContract'

export function useProfile (account) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()
  const web3 = useWeb3Context()

  let address = account
  if (account === 'me') {
    address = web3.account
  }

  useEffect(() => {
    fetchProfile(registry, address, setContent)
  }, [registry, address])

  return content
}

export function useCurrentProfile () {
  return useProfile('me')
}

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
