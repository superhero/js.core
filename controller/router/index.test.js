describe('controller/server/http/router', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  config  = { mainDirectory : require('path').dirname(require.main.filename) },
  routes  =
  [
    {
      chain     : 'controller/dispatcher/rest'
    },
    {
      view      : 'json'
    },
    {
      test      : 1,
      policy    : '/',
      endpoint  : 'controller/dispatcher',
    },
    {
      test      : 2,
      policy    :
      {
        path    : '/foo',
        method  : 'post'
      },
      endpoint  : 'controller/dispatcher',
    },
    {
      test      : 3,
      policy    :
      {
        path    : '/foo',
        method  : /PUT/
      },
      endpoint  : 'controller/dispatcher',
    },
    {
      test      : 4,
      view      : 'raw',
      policy    : '/foo',
      endpoint  : 'controller/dispatcher/rest',
      chain     : 'controller/dispatcher',
    }
  ]

  let Router, router

  before(function()
  {
    context(this, { title:'config', value:config })
    context(this, { title:'routes', value:routes })
    Router = require('.')
    router = new Router(config, routes)
  })

  describe('composeRoute(routes)', () =>
  {
    it('should return a flatten route', function()
    {
      context(this, { title:'routes', value:routes })

      const route = router.composeRoute(routes)

      expect(route.view).to.be.equal('json')
      expect(route.policy).to.be.equal('/')
      expect(route.endpoint).to.be.equal('controller/dispatcher')
      expect(route.chain.length).to.be.equal(1)
    })
  })

  describe('findRoute(request)', () =>
  {
    it('chain is an array', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/' }})
      expect(result.chain).is.an('array')
    })

    it('chain builds on', () =>
    {
      const result = router.findRoute({ path:'/' })
      expect(result.chain.length).to.be.equal(1)
    })

    it('chain routes correctly', () =>
    {
      const result = router.findRoute({ path:'/foo' })
      expect(result.chain.length).to.be.equal(2)
    })

    it('view is inherited', () =>
    {
      const result = router.findRoute({ path:'/' })
      expect(result.view).to.be.equal('json')
    })

    it('found correct endpoint ', () =>
    {
      const result = router.findRoute({ path:'/' })
      expect(result.endpoint).to.be.equal('controller/dispatcher')
    })

    it('overwrite the view', () =>
    {
      const result = router.findRoute({ path:'/foo', method:'get' })
      expect(result.view).to.be.equal('raw')
    })

    it('method policy routes correctly', () =>
    {
      const result = router.findRoute({ path:'/foo', method:'post' })
      expect(result.test).to.be.equal(2)
    })

    it('method policy routes correctly, case test', () =>
    {
      const result = router.findRoute({ path:'/foo', method:'put' })
      expect(result.test).to.be.equal(3)
    })

    it('no match should return an undefined endpoint', () =>
    {
      const result = router.findRoute({ path:'/no-matching-pathname' })
      expect(result.endpoint).to.be.equal(undefined)
    })
  })
})
