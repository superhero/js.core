describe('view/raw', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  let Raw, raw

  before(() =>
  {
    Raw = require('./raw')
    raw = new Raw()
  })

  describe('compose(vm)', () =>
  {
    const vm = { body:'foobar' }

    it('should return the value of `vm.body`', function()
    {
      context(this, { title:'view model', value:vm })
      expect(raw.compose(vm)).to.be.equal(vm.body)
    })
  })
})
