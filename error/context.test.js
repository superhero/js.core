const expect = require('chai').expect

describe('error/context', () =>
{
  let error

  before(() =>
  {
    const Error = require('./context')
    error = new Error()
  })

  describe('setCode(code)', () =>
  {
    it('should be able to retrieve the error code set through `setCode`', () =>
    {
      const code = 'ERR_VALUE_OUT_OF_RANGE'
      error.setCode(code)
      expect(error.code).to.be.equal(code)
    })
  })

  describe('setContext(ctx)', () =>
  {
    it('should be able to retrieve the context set through `setContext`', () =>
    {
      const ctx = { foo:'bar' }
      error.setContext(ctx)
      expect(error.context).to.deep.equal(ctx)
    })
  })
})
