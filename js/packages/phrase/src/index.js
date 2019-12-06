const { Registry } = require('./network/registry.js')
const { Ipfs } = require('./network/ipfs.js')
const { phrases, sentiments } = require('./formats.js')
const assert = require('assert')

/** Ties together data from the phrase registry and IPFS. */
exports.Reader = class {
  constructor (ipfs, provider) {
    this.ipfs = new Ipfs(ipfs)
    this.registry = new Registry(provider)
  }

  /** Get a phrase using its key. */
  phrase (key) {
    return this.registry.getPhrase(key).then(phrase => {
      return fill(
        f => ({
          filename: f,
          fetch: () => this.ipfs.fetchExt(ext(f), path(phrase.content, f))
        }),
        fit(phrase.format, phrase.content, files)
      )
    })
  }

  /** Get a sentiment using its key. */
  sentiment (key) {
    return {
      format: 'content',
      content: {},
      token: 'address',
      amount: 'amount'
    }
  }
}

exports.Writer = class {
  /** Create a new phrase. */
  createPhrase (format, content, creator, beneficiary) {
    return 'key'
  }

  /** Create a new sentiment. */
  createSentiment (format, content, token, amount) {
    return 'key'
  }

  /** Pin a sentiment to a phrase. */
  pinSentiment (phraseKey, sentimentKey) {
    return 'key'
  }
}

function fit (format, files) {
  let fitted = {}

  for (let [k, v] of Object.entries(format)) {
    if (typeof(v) == 'string') {
      fitted[k] = v
    } else {
      fitted[k] = files.filter(f => f.match(v))
    }
  }

  return fitted
}

assert.deepEqual(fit(
  phrases['ipfs-album-2019'],
  ['name.txt', 'cover.jpg', '01 Song 1.mp3', '02 Song 2.mp3', 'Song 3.mp3']
), {
  name: 'name.txt',
  cover: 'cover.jpg',
  tracks: ['01 Song 1.mp3', '02 Song 2.mp3']
})

function fill (map, obj) {
  let filled = {}

  for (let [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      filled[k] = v.map(f => map(f))
    } else {
      filled[k] = map(v)
    }
  }

  return filled
}

assert.deepEqual(fill(s => s.length, {
  name: 'name.txt',
  cover: 'cover.jpg',
  tracks: ['01 Song 1.mp3', '02 Song 2.mp3']
}), {
  name: 8,
  cover: 9,
  tracks: [13, 13]
})

function ext (file) {
  const a = file.split('.')
  return a[a.length - 1]
}

assert.equal(ext('my-diary.txt'), 'txt')
assert.equal(ext('james-bond.mov'), 'mov')
assert.equal(ext('txt.mp3'), 'mp3')

function path (root, ...ss) {
  root = `/ipfs/${root.replace(/\//g, '').replace('ipfs', '')}`
  ss = ss.map(s => s.replace(/\//g, ''))
  return `${root}/${ss.join('/')}`
}

assert.equal(path('ipfs/asdf1234', 'file', 'path', 'info.txt'), '/ipfs/asdf1234/file/path/info.txt')
assert.equal(path('asdf1234', 'file/', 'path', 'info.txt'), '/ipfs/asdf1234/file/path/info.txt')
assert.equal(path('/ipfs/asdf1234/', '/info.txt/'), '/ipfs/asdf1234/info.txt')
