const expect = require('chai').expect

describe('view/template/helper/dateformat', () =>
{
  const dateformat = require('./dateformat')

  it('should return a formated date string', () =>
    expect(dateformat(new Date(1524493378898), 'yyyy')).to.be.equal('2018'))
})
