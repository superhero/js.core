describe('view/template/helper/escSingelQuote', () =>
{
  const expect = require('chai').expect

  let escSingelQuote
    
  before(() => escSingelQuote = require('./escSingelQuote'))

  it('should return a string with escaped singel quotes',
  () => expect(escSingelQuote("foo 'bar'")).to.be.equal("foo \\'bar\\'"))
})
