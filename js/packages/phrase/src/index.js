import { Registry } from './network/registry.js'
import { Ipfs } from './network/ipfs.js'
import { phrases, sentiments } from './formats.js'

/** Ties together data from the phrase registry and IPFS. */
export default class Phrase {
  constructor (ipfs, web3) {
    this.ipfs = new Ipfs(ipfs)
    this.registry = new Registry(web3)
  }

  /** Get a phrase using its key. */
  phrase (key) {
    this.registry.getPhrase(key).then(phrase => {
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
  let expanded = {}

  for (let [k, v] of Object.entries(format)) {
    if (typeof(v) == 'string') {
      expanded[k] = v
    } else {
      expanded[k] = files.filter(f => f.match(v))
    }
  }

  return expanded
}

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

function ext (file) {
  const a = file.split('.')
  return a[a.length - 1]
}

function path (root, ...ss) {
  root = `/ipfs/${root.replace(/\//g, '').replace('ipfs', '')}`
  ss = ss.map(s => s.replace(/\//g, ''))
  return `${root}/${ss.join('/')}`
}

import chai from 'chai'
const expect = chai.expect

// ext
expect(ext('my-diary.txt')).to.equal('txt')
expect(ext('james-bond.mov')).to.equal('mov')
expect(ext('txt.mp3')).to.equal('mp3')

// path
expect(path('ipfs/asdf1234', 'file', 'path', 'info.txt')).to.equal('/ipfs/asdf1234/file/path/info.txt')
expect(path('asdf1234', 'file/', 'path', 'info.txt')).to.equal('/ipfs/asdf1234/file/path/info.txt')
expect(path('/ipfs/asdf1234/', '/info.txt/')).to.equal('/ipfs/asdf1234/info.txt')

// fit
expect(fit(
  phrases['ipfs-album-2019'],
  ['name.txt', 'cover.jpg', '01 Song 1.mp3', '02 Song 2.mp3', 'Song 3.mp3']
)).to.deep.equal({
  name: 'name.txt',
  cover: 'cover.jpg',
  tracks: ['01 Song 1.mp3', '02 Song 2.mp3']
})

// fill
expect(fill(s => s.length, {
  name: 'name.txt',
  cover: 'cover.jpg',
  tracks: ['01 Song 1.mp3', '02 Song 2.mp3']
})).to.deep.equal({
  name: 8,
  cover: 9,
  tracks: [13, 13]
})
