describe('controller/server/http/router', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  config  =
  [
    {
      chain       : '/middle-1'
    },
    {
      view        : 'json'
    },
    {
      policy      : '/',
      endpoint    : 'index',
      chain       : '/middle-2'
    },
    {
      view        : 'raw',
      policy      : '/foo',
      endpoint    : 'foo'
    },
    {
      endpoint    : 'baz',
      policy      :
      {
        method    : 'post',
        path      : '/bar'
      }
    },
    {
      policy      : '/bar',
      endpoint    : 'bar',
      chain       : ['/middle-2', '/middle-3']
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
      expect(route.endpoint).to.be.equal('index')
      expect(route.chain.length).to.be.equal(2)
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
      const result = router.findRoute({ url:{ pathname:'/' }})
      expect(result.chain.length).to.be.equal(2)
    })

    it('chain routes correctly', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/foo' }})
      expect(result.chain.length).to.be.equal(1)
    })

    it('chain can be defined as an array', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/bar' }, method:'get'})
      expect(result.chain.length).to.be.equal(3)
    })

    it('view is inherited', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/' }})
      expect(result.view).to.be.equal('json')
    })

    it('found correct endpoint ', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/' }})
      expect(result.endpoint).to.be.equal('index')
    })

    it('overwrite the view', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/foo' }})
      expect(result.view).to.be.equal('raw')
    })

    it('first match should have hierarchy', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/bar' }, method:'get'})
      expect(result.endpoint).to.be.equal('bar')
    })

    it('method policy routes correctly', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/bar' }, method:'post'})
      expect(result.endpoint).to.be.equal('baz')
    })

    it('no match should return an undefined endpoint', () =>
    {
      const result = router.findRoute({ url:{ pathname:'/no-matching-pathname' }})
      expect(result.endpoint).to.be.equal(undefined)
    })
  })
})
