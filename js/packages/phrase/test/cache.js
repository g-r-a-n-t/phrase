const assert = require('assert')
const { cacheId, Cache } = require('../src/cache.js')

describe('Cache', function() {
  it('should set and get cache.', function() {
    const cache = new Cache()
    const id = cacheId('food', 'barge')

    cache.set(id, 'hi')

    assert.equal('hi', cache.get(id).val)
  });

  it('cached promise should execute `f` once.', async function() {
    const cache = new Cache()
    const id = cacheId('food', 'barge')

    let c = 0
    const f = async r => {
      c++
      await sleep(100)
      r(c)
    }

    const p1 = cache.promise(id, () => new Promise(r => f(r)))
    const p2 = cache.promise(id, () => new Promise(r => f(r)))
    const p3 = cache.promise(id, () => new Promise(r => f(r)))

    assert.equal(1, await p1)
    assert.equal(1, await p2)
    assert.equal(1, await p3)
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
