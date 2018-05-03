describe('view/template/helper/jsonStringify', () =>
{
  const expect = require('chai').expect

  let jsonStringify

  before(() => jsonStringify = require('./jsonStringify'))

  it('should return a stringified json object',
  () => expect(jsonStringify({foo:'bar'})).to.be.equal('{"foo":"bar"}'))
})
