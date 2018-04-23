const expect = require('chai').expect

describe('view/template/helper/jsonStringify', () =>
{
  const jsonStringify = require('./jsonStringify')

  it('should return a stringified json object', () =>
    expect(jsonStringify({foo:'bar'})).to.be.equal('{"foo":"bar"}'))
})
