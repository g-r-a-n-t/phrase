// # Usage
//
// const cache = Cache()
// const id = cacheId([stringable]...)
// cache.set(id, val, lifetime<seconds> = ONE_YEAR)
// cache.get(id, force = false) -> {val, expired} -- force indicates that the cache should be pulled even if it's expired.
// cache.merge(id, getVal<func(done)>, setVal<func(result)>, lifetime) -- merges mutliple sets and gets so that the promise is only called once for a given id
// cache.evict(id)

const ONE_YEAR = 60 * 60 * 24 * 365

/** Creates an id for some item with the given stringable parameters. */
export function cacheId (...vals) {
  return vals.join('-')
}

/** The current time in seconds. */
function now () {
  return Date.now() / 1000
}

/** A general cache. */
export class Cache {
  constructor () {
    /** An object that holds cached values. id => value, expiration */
    cache = {}
    /** Collection of promise resolves and rejects that are pending the result of some id. */
    pending = {}
  }

  /** Set a cached value for some id. */
  set (id, val, lifetime = ONE_YEAR) {
    cache[id] = { val: val, expiration: now() + lifetime }
  }

  /** Get a cached value with an id. */
  get (id, force = false) {
    if (cache[id] === undefined || cache[id] === null) return null

    const expired = now() > cache[id].expiration

    if (expired && !force) return null

    return {
      val: cache[id].val,
      expired: expired
    }
  }

  /** Evict some cached item. */
  evict (id) {
    cache[id] = null
  }

  /**
    * Returns a promise that merges multiple calls under one id.
    * This prevents multiple requests for the same resource being made.
    */
  promise (id, getPromise, lifetime = ONE_YEAR) {
    return new Promise(function(resolve, reject) {
      if (get(id) !== null) {
        // cache is already set
        resolve(get(id).val)
      } else if (pending[id] === null || pending[id] === undefined) {
        // cache not set or pending
        pending[id] = [{ resolve: resolve, reject: reject }]

        getPromise().then(val => {
          pending[id].forEach(p => p.resolve(val))
          set(id, val, lifetime)
          pending[id] = null
        }, err => {
          pending[id].forEach(p => p.reject(err))
          pending[id] = null
        })
      } else {
        // cache is pending
        pending[id].push({ resolve: resolve, reject: reject })
      }
    })
  }
}
