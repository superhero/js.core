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
        policy    : 'foobar',
        endpoint  : 'foo',
      },
      {
        policy    : 'foobar',
        endpoint  : 'bar'
      },
      {
        policy    : /^BAZQUX$/i,
        endpoint  : 'baz'
      }
    ])
  })

  describe('findRoute(request)', () =>
  {
    it('correct endpoint found', () =>
    {
      const result = router.findRoute('foobar')
      expect(result.endpoint).to.be.equal('foo')
    })

    it('regex policy', () =>
    {
      const result = router.findRoute('bazqux')
      expect(result.endpoint).to.be.equal('baz')
    })

    it('no matching policy should return an undefined endpoint', () =>
    {
      const result = router.findRoute('no-matching-policy')
      expect(result.endpoint).to.be.equal(undefined)
    })
  })
})
