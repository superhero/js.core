const expect = require('chai').expect

describe('view/json', () =>
{
  const
  Json = require('./json'),
  json = new Json()

  describe('compose(vm)', () =>
  {
    const vm = { body:{ foo:'bar' } }

    it('should return a stringified value of `vm.body`', () =>
      expect(json.compose(vm)).to.be.equal(JSON.stringify(vm.body)))
  })
})
