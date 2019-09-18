import { useEffect, useState } from 'react'

import { useRegistryContract } from './useContract'
import { useCacheContext, cacheId } from 'contexts/cache'

export function useExpressedSentiments (keys) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()
  const cache = useCacheContext()

  useEffect(() => {
    fetchExpressedSentiments(cache, registry, keys, setContent)
  }, [keys, registry, cache])

  return content
}

// TODO cleanup maybe - this hurts my eyes
async function fetchExpressedSentiments (cache, registry, keys, setContent) {
  if (registry == null) return null

  const content = {}
  const requests = []

  keys.forEach((key) => {
    requests.push(
      new Promise((resolve) => {
        const id = cacheId('expressedSentiment', key)

        if (cache.get(id) != null) {
          content[key] = cache.get(id).val
          resolve()
          return
        }

        registry.expressedSentiments(key).then((response) => {
          const expressedSentiment = {
            phrase: response.phrase,
            sentiment: response.sentiment
          }

          cache.set(id, expressedSentiment)
          content[key] = expressedSentiment
          resolve()
        })
      })
    )
  })

  await Promise.all(requests)

  setContent(content)
}
