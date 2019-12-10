const assert = require('assert')
const IPFS = require('ipfs')
const ethers = require('ethers')
const { Reader, Writer } = require('../')

const ipfs = IPFS.create()

async function createReader () {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545")
  await provider.ready

  return new Reader(await ipfs, provider)
}

async function createWriter () {
  const signer = new ethers.providers.JsonRpcProvider("http://localhost:7545")
  await signer.ready

  return new Writer(await ipfs, signer)
}

describe('Phrase', function() {
  it('should write phrase and read phrase.', async function() {
    const writer = await createWriter()
    const reader = await createReader()

    writer.writePhrase()
    reader.readPhrase()
  });
});
