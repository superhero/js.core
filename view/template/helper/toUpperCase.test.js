describe('view/template/helper/toUpperCase', () =>
{
  const expect = require('chai').expect

  let toUpperCase

  before(() => toUpperCase = require('./toUpperCase'))

  it('should return an uppercase string',
  () => expect(toUpperCase('Foobar')).to.be.equal('FOOBAR'))
})
