const { Cache, cacheId } = require('../cache.js')
const ethers = require('ethers')
const DEP = require('../Registry.json')

exports.Registry = class {
  constructor (provider) {
    const address = null
    this.contract = new ethers.Contract(DEP.networks[5777].address, DEP.abi, provider)
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
