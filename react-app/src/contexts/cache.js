import { createContext, useContext } from 'react'

import debug from 'tools/debug'

// # Usage
//
// const cache = useCacheContext()
// const id = cacheId(some, unique, details)
// cache.set(id, val, lifetime<seconds> = ONE_YEAR)
// cache.get(id, force = false) -> {val, expired} -- force indicates that the cache should be pulled even if it's expired.
// cache.merge(id, getVal<Promise>, setVal<func(result)>, lifetime) -- merges mutliple sets and gets so that the promise is only called once for a given id
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

  // id => [setVals]
  const pending = {}

  const merge = (id, getVal, setVal, lifetime = ONE_YEAR) => {
    if (get(id) !== null) { // cache is already set
      setVal(get(id).val)
    } else if (pending[id] === null || pending[id] === undefined) { // cache not set or pending
      pending[id] = [setVal]

      getVal(val => {
        pending[id].forEach(_setVal => _setVal(val))
        set(id, val, lifetime)
        pending[id] = null
      })
    } else { // cache is pending
      pending[id].push(setVal)
    }
  }

  function now () {
    return Date.now() / 1000
  }

  return {
    set: set,
    get: get,
    evict: evict,
    merge: merge
  }
}
