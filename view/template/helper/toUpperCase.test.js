const expect = require('chai').expect

describe('view/template/helper/toUpperCase', () =>
{
  const toUpperCase = require('./toUpperCase')

  it('should return an uppercase string', () =>
    expect(toUpperCase('Foobar')).to.be.equal('FOOBAR'))
})
