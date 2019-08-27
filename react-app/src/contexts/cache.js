import { createContext, useContext } from 'react'

// # Usage
//
// const cache = useCacheContext()
// const id = cacheId(some, unique, details)
// cache.set(id, obj, lifetime<seconds>)
// cache.get(id, force) -> {obj, expired} -- force indicates that the cache should be pulled even if it's expired.
// cache.evict(id)
//
// note: this implementation may not be conventional

export const CacheContext = createContext()

const ONE_YEAR = 60 * 60 * 24 * 365

export function useCacheContext () {
  return useContext(CacheContext)
}

export function cacheId(...vals) {
  return vals.join('-')
}

export function initCache() {
  const cache = {}

  const set = (id, obj, lifetime = ONE_YEAR) => {
    cache[id] = {'obj': obj, 'expiration': now() + lifetime}
  }

  const get = (id, force = false) => {
    if (cache[id] === undefined || cache[id] === null) return null

    const expired = now() > cache[id].expired

    if (expired && !force) return null

    return {
      'obj': cache[id].obj,
      'expired': expired
    }
  }

  const evict = (id) => {
    cache[id] = null
  }

  function now() {
    return Date.now() / 1000
  }

  return {
    'set': set,
    'get': get,
    'evict': evict
  }
}
