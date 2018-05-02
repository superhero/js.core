const expect = require('chai').expect

describe('view/template/helper/toFixed', () =>
{
  const toFixed = require('./toFixed')

  it('should return a padded number',
  () => expect(toFixed(5, 2)).to.be.equal('5.00'))

  it('should be able to handle "null"',
  () => expect(toFixed(null, 2)).to.be.equal('0.00'))

  it('should return NaN if "undefined" is spcified',
  () => expect(toFixed(undefined, 2)).to.be.equal('NaN'))

  it('should be able to handle negative numbers',
  () => expect(toFixed(-5, 2)).to.be.equal('-5.00'))

  it('should be able to handle strings',
  () => expect(toFixed('5', 2)).to.be.equal('5.00'))

  it('should be able to handle strings that is not formatted as a number',
  () => expect(toFixed('foobar', 2)).to.be.equal('NaN'))
})
