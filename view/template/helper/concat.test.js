describe('view/template/helper/concat', () =>
{
  const expect = require('chai').expect

  let concat

  before(() => concat = require('./concat'))

  it('should return a concatted string',
  () => expect(concat('foo','bar','baz')).to.be.equal('foobarbaz'))

  it('should ignore objects or undefined arguments when concatting',
  () => expect(concat('foo', undefined, {}, 'bar')).to.be.equal('foobar'))
})
