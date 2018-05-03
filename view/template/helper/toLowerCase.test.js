describe('view/template/helper/toLowerCase', () =>
{
  const expect = require('chai').expect

  let toLowerCase

  before(() => toLowerCase = require('./toLowerCase'))

  it('should return an uppercase string',
  () => expect(toLowerCase('FooBar')).to.be.equal('foobar'))
})
