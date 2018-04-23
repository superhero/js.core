const expect = require('chai').expect

describe('error/index', () =>
{
  const
  Error = require('./index'),
  error = new Error()

  describe('setCode(code)', () =>
  {
    it('should be able to retrieve the error code set through `setCode`', () =>
    {
      const code = 'ERR_VALUE_OUT_OF_RANGE'
      error.setCode(code)
      expect(error.code).to.be.equal(code)
    })
  })
})
