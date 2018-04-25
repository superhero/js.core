const expect = require('chai').expect

describe('server/ws/router', () =>
{
  const
  config =
  [
    {
      policy      : 'foobar',
      dispatcher  : 'foo',
    },
    {
      policy      : 'foobar',
      dispatcher  : 'bar'
    },
    {
      policy      : /^BAZQUX$/i,
      dispatcher  : 'baz'
    }
  ],
  Router = require('./router'),
  router = new Router(config)

  describe('findRoute(request)', () =>
  {
    const
    result1 = router.findRoute('foobar'),
    result2 = router.findRoute('bazqux'),
    result3 = router.findRoute('no-matching-policy')

    it('correct dispatcher found', () =>
      expect(result1.dispatcher).to.be.equal('foo'))

    it('regex policy', () =>
      expect(result2.dispatcher).to.be.equal('baz'))

    it('no matching policy should return an undefined dispatcher', () =>
      expect(result3.dispatcher).to.be.equal(undefined))
  })
})
