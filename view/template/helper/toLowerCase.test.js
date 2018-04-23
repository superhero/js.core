const expect = require('chai').expect

describe('view/template/helper/toLowerCase', () =>
{
  const toLowerCase = require('./toLowerCase')

  it('should return an uppercase string', () =>
    expect(toLowerCase('FooBar')).to.be.equal('foobar'))
})
