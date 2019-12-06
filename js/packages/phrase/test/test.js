const assert = require('assert')
const { Reader, Writer } = require('../')

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
      let reader = new Reader(null, null)
      console.log(reader)
    });
  });
});
