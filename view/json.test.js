const expect = require('chai').expect

describe('view/json', () =>
{
  const
  Json = require('./json'),
  json = new Json()

  describe('compose(vm)', () =>
  {
    const
    vm1 = { body:{ foo:'bar' } },
    vm2 = { headers:{}, body:{ foo:'bar' } }

    it('should return a stringified value of `vm.body`', () =>
      expect(json.compose(vm1)).to.be.equal(JSON.stringify(vm1.body)))

    it('should set the `vm.headers["content-type"]` to "application/json"', () =>
      expect(vm1.headers['content-type']).to.be.equal('application/json'))

    it('headers set`', () =>
      expect(json.compose(vm2)).to.be.equal(JSON.stringify(vm2.body)))
  })
})
