describe('controller/server/ws/router', () =>
{
  const expect = require('chai').expect

  let Router, router

  before(() =>
  {
    Router = require('./router')
    router = new Router(
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
    ])
  })

  describe('findRoute(request)', () =>
  {
    it('correct dispatcher found', () =>
    {
      const result = router.findRoute('foobar')
      expect(result.dispatcher).to.be.equal('foo')
    })

    it('regex policy', () =>
    {
      const result = router.findRoute('bazqux')
      expect(result.dispatcher).to.be.equal('baz')
    })

    it('no matching policy should return an undefined dispatcher', () =>
    {
      const result = router.findRoute('no-matching-policy')
      expect(result.dispatcher).to.be.equal(undefined)
    })
  })
})
