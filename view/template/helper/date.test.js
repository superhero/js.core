const expect = require('chai').expect

describe('view/template/helper/date', () =>
{
  const date = require('./date')

  it('should return a formated date string', () =>
    expect(date(new Date(1524493378898), 'yyyy')).to.be.equal('2018'))
})
