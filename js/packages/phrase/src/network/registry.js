import { Cache, cacheId } from '../cache.js'

export class Registry {
  constructor (web3) {
    this.contract = null
    this.cache = new Cache()
  }

  fetchPhrase (key) {
    return this.cache.promise(
      cacheId('phraseContent', key),
      () => this.contract.phrases(key).then(val => ({
        format: val.format,
        content: val.content,
        creator: val.creator,
        beneficiary: val.beneficiary
      }))
    )
  }

  fetchSentiment (key) {
    return this.cache.promise(
      cacheId('sentimentContent', key),
      () => this.contract.sentiments(key).then(val => ({
        format: val.format,
        content: val.content,
        token: val.token,
        value: val.value
      }))
    )
  }
}
