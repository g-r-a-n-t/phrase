import { createContext, useContext } from 'react'

import debug from '../tools/debug'

// # Usage
//
// const cache = useCacheContext()
// const id = cacheId(some, unique, details)
// cache.set(id, val, lifetime<seconds> = ONE_YEAR)
// cache.get(id, force = false) -> {val, expired} -- force indicates that the cache should be pulled even if it's expired.
// cache.evict(id)
//
// note: this implementation may not be conventional

export const CacheContext = createContext()

const ONE_YEAR = 60 * 60 * 24 * 365

export function useCacheContext () {
  return useContext(CacheContext)
}

export function cacheId (...vals) {
  return vals.join('-')
}

export function Cache () {
  const cache = {}

  const set = (id, val, lifetime = ONE_YEAR) => {
    debug.cacheSet(id, val)
    cache[id] = { val: val, expiration: now() + lifetime }
  }

  const get = (id, force = false) => {
    if (cache[id] === undefined || cache[id] === null) return null

    const expired = now() > cache[id].expiration

    if (expired && !force) return null

    debug.cacheGet(id, cache[id].val)

    return {
      val: cache[id].val,
      expired: expired
    }
  }

  const evict = (id) => {
    cache[id] = null
  }

  function now () {
    return Date.now() / 1000
  }

  return {
    set: set,
    get: get,
    evict: evict
  }
}
