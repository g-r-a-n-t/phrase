import { useEffect, useState } from 'react'

import { useRegistryContract } from './useContract'

export function useProfile(address) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()

  useEffect(() => {
    async function fetchContent() {
      if (registry != null) {
        const response = await registry.getProfile(address)
        console.log(response)

        setContent({
          format: response['0'],
          content: response['1'],
          phrases: response['2'],
          expressedSentiments: response['3']
        })
      }
    }

    fetchContent()
  }, [registry, address])

  return content
}
