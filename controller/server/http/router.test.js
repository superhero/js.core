const expect = require('chai').expect

describe('server/http/router', () =>
{
  const
  config =
  [
    {
      view        : 'json'
    },
    {
      policy      : '/',
      dispatcher  : 'index',
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
    }
  ],
  Router = require('./router'),
  router = new Router(config)

  describe('findRoute(request)', () =>
  {
    const
    result1 = router.findRoute({ url:{ pathname:'/' }}),
    result2 = router.findRoute({ url:{ pathname:'/foo' }}),
    result3 = router.findRoute({ url:{ pathname:'/bar' }, method:'get'}),
    result4 = router.findRoute({ url:{ pathname:'/bar' }, method:'post'}),
    result5 = router.findRoute({ url:{ pathname:'/no-matching-pathname' }})

    it('view is inherited', () =>
      expect(result1.view).to.be.equal('json'))

    it('found correct dispatcher ', () =>
      expect(result1.dispatcher).to.be.equal('index'))

    it('overwrite the view', () =>
      expect(result2.view).to.be.equal('raw'))

    it('first match should have hierarchy', () =>
      expect(result3.dispatcher).to.be.equal('bar'))

    it('method policy routes correctly', () =>
      expect(result4.dispatcher).to.be.equal('baz'))

    it('no match should return an undefined dispatcher', () =>
      expect(result5.dispatcher).to.be.equal(undefined))
  })
})
