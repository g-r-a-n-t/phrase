


/** Ties together data from the phrase registry and IPFS. */
export function Phrase (ipfs, web3) {
  /** Get a phrase using its key. */
  const getPhrase = function (key) {
    return new Promise((resolve, reject) => {
      registry.getPhrase(key).then(val => {
      }, err => {
        reject(err)
      })
    }
  }

  /** Get a sentiment using its key. */
  const getSentiment = function (key) {
    return {
      format: 'content'.
      content: {},
      token: 'address',
      amount: 'amount'
    }
  }

  /** Create a new phrase. */
  const createPhrase = function (format, content, creator, beneficiary) {
    return 'key'
  }

  /** Create a new sentiment. */
  const createSentiment = function (format, content, token, amount) {
    return 'key'
  }

  /** Pin a sentiment to a phrase. */
  const pinSentiment = function (phraseKey, sentimentKey) {
    return 'key'
  }
}
