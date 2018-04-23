const expect = require('chai').expect

describe('view/template/helper/toFixed', () =>
{
  const toFixed = require('./toFixed')

  it('should return a padded number', () =>
    expect(toFixed(5, 3)).to.be.equal('5.000'))
})
