const expect = require('chai').expect

describe('view/raw', () =>
{
  const
  Raw = require('./raw'),
  raw = new Raw()

  describe('compose(vm)', () =>
  {
    const vm = { body:'foobar' }

    it('should return the value of `vm.body`', () =>
      expect(raw.compose(vm)).to.be.equal(vm.body))
  })
})
