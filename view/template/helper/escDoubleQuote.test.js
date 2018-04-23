const expect = require('chai').expect

describe('view/template/helper/escDoubleQuote', () =>
{
  const escDoubleQuote = require('./escDoubleQuote')

  it('should return a string with escaped double quotes', () =>
    expect(escDoubleQuote('foo "bar"')).to.be.equal('foo \\"bar\\"'))})
