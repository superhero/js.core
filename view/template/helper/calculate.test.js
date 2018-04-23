const expect = require('chai').expect

describe('view/template/helper/calculate', () =>
{
  const calculate = require('./calculate')

  it('1 + 1 = 2', () => expect(calculate(1, '+', 1)).to.be.equal(2))
  it('4 - 2 = 2', () => expect(calculate(4, '-', 2)).to.be.equal(2))
  it('3 * 3 = 9', () => expect(calculate(3, '*', 3)).to.be.equal(9))
  it('9 / 3 = 3', () => expect(calculate(9, '/', 3)).to.be.equal(3))
  it('5 % 3 = 2', () => expect(calculate(5, '%', 3)).to.be.equal(2))

  it('empty operator should return an empty string',
    () => expect(calculate(1, '', 1)).to.be.equal(''))
})
