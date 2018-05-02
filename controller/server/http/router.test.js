const expect = require('chai').expect

describe('controller/server/http/router', () =>
{
  const
  config =
  [
    {
      middleware  : '/middle-1'
    },
    {
      view        : 'json'
    },
    {
      policy      : '/',
      dispatcher  : 'index',
      middleware  : '/middle-2'
    },
    {
      view        : 'raw',
      policy      : '/foo',
      dispatcher  : 'foo'
    },
    {
      dispatcher  : 'baz',
      policy      :
      {
        method    : 'post',
        path      : '/bar'
      }
    },
    {
      policy      : '/bar',
      dispatcher  : 'bar',
      middleware  : ['/middle-2', '/middle-3']
    }
  ],
  Router = require('./router'),
  router = new Router(config)

  describe('flattenRoutes(routes)', () =>
  {
    const route = router.flattenRoutes(config)

    it('should return a route of the last defined properties', () =>
    {
      expect(route.view).to.be.equal('json')
      expect(route.policy).to.be.equal('/')
      expect(route.dispatcher).to.be.equal('index')
    })
  })

  describe('findRoute(request)', () =>
  {
    const
    result1 = router.findRoute({ url:{ pathname:'/' }}),
    result2 = router.findRoute({ url:{ pathname:'/foo' }}),
    result3 = router.findRoute({ url:{ pathname:'/bar' }, method:'get'}),
    result4 = router.findRoute({ url:{ pathname:'/bar' }, method:'post'}),
    result5 = router.findRoute({ url:{ pathname:'/no-matching-pathname' }})

    it('middleware is an array',
    () => expect(result1.middleware).is.an('array'))

    it('middleware builds on',
    () => expect(result1.middleware.length).to.be.equal(2))

    it('middleware routes correctly',
    () => expect(result2.middleware.length).to.be.equal(1))

    it('middleware can be defined as an array',
    () => expect(result3.middleware.length).to.be.equal(3))

    it('view is inherited',
    () => expect(result1.view).to.be.equal('json'))

    it('found correct dispatcher ',
    () => expect(result1.dispatcher).to.be.equal('index'))

    it('overwrite the view',
    () => expect(result2.view).to.be.equal('raw'))

    it('first match should have hierarchy',
    () => expect(result3.dispatcher).to.be.equal('bar'))

    it('method policy routes correctly',
    () => expect(result4.dispatcher).to.be.equal('baz'))

    it('no match should return an undefined dispatcher',
    () => expect(result5.dispatcher).to.be.equal(undefined))
  })
})
