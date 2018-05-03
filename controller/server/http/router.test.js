describe('controller/server/http/router', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  config  =
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
  ]

  let Router, router

  before(function()
  {
    context(this, { title:'config', value:config })
    Router = require('./router')
    router = new Router(config)
  })

  describe('flattenRoutes(routes)', () =>
  {
    it('should return a flatten route', function()
    {
      context(this, { title:'config', value:config })

      const route = router.flattenRoutes(config)

      expect(route.view).to.be.equal('json')
      expect(route.policy).to.be.equal('/')
      expect(route.dispatcher).to.be.equal('index')
      expect(route.middleware.length).to.be.equal(2)
    })
  })

  describe('findRoute(request)', () =>
  {
    it('middleware is an array', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/' }})
      expect(result.middleware).is.an('array')
    })

    it('middleware builds on', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/' }})
      expect(result.middleware.length).to.be.equal(2)
    })

    it('middleware routes correctly', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/foo' }})
      expect(result.middleware.length).to.be.equal(1)
    })

    it('middleware can be defined as an array', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/bar' }, method:'get'})
      expect(result.middleware.length).to.be.equal(3)
    })

    it('view is inherited', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/' }})
      expect(result.view).to.be.equal('json')
    })

    it('found correct dispatcher ', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/' }})
      expect(result.dispatcher).to.be.equal('index')
    })

    it('overwrite the view', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/foo' }})
      expect(result.view).to.be.equal('raw')
    })

    it('first match should have hierarchy', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/bar' }, method:'get'})
      expect(result.dispatcher).to.be.equal('bar')
    })

    it('method policy routes correctly', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/bar' }, method:'post'})
      expect(result.dispatcher).to.be.equal('baz')
    })

    it('no match should return an undefined dispatcher', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/no-matching-pathname' }})
      expect(result.dispatcher).to.be.equal(undefined)
    })
  })
})
