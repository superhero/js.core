const expect = require('chai').expect

describe('view/template/helper/escSingelQuote', () =>
{
  const escSingelQuote = require('./escSingelQuote')

  it('should return a string with escaped singel quotes', () =>
    expect(escSingelQuote("foo 'bar'")).to.be.equal("foo \\'bar\\'"))
})
