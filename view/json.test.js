describe('view/json', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  let Json, json

  before(() =>
  {
    Json = require('./json')
    json = new Json()
  })

  describe('compose(vm)', () =>
  {
    const vm = { body:{ foo:'bar' } }

    it('should return a stringified value of `vm.body`', function()
    {
      context(this, { title:'view model', value:vm })
      expect(json.compose(vm)).to.be.equal(JSON.stringify(vm.body))
    })

    it('should set the `vm.headers["content-type"]` to "application/json"', function()
    {
      context(this, { title:'view model', value:vm })
      expect(vm.headers['content-type']).to.be.equal('application/json')
    })

    it('expected a stringified version of the `vm.body`', function()
    {
      context(this, { title:'view model', value:vm })
      expect(json.compose(vm)).to.be.equal(JSON.stringify(vm.body))
    })
  })
})
