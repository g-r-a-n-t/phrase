import { useMemo, useEffect, useState } from 'react'

import { useRegistryContract } from './useContract'

export function useProfileContent(address) {
  const [content, setContent] = useState(null)
  const registry = useRegistryContract()

  async function fetchContent() {
    if (registry != null) {
      const response = await registry.profiles(address)
      console.log(response)

      setContent({
        format: response.format,
        content: response.content
      })
    }
  }

  useEffect(() => {
    fetchContent()
  }, [registry])

  return content
}
