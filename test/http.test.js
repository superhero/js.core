describe('controller/server/http', async () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  config  = require('./config')

  let request, server

  before(function(done)
  {
    const
    Request = require('@superhero/request'),
    Core    = require('../'),
    core    = new Core(config),
    port    = 9001

    context(this, { title:'config', value:config })

    request = new Request({ url:'http://localhost:' + port })
    server  = core.server('http', config.routes)

    server.on('listening', () => done())
    server.listen(port)
  })

  it('testing the rest dispatcher', async () =>
  {
    const result =
    {
      get     : await request.get('/rest'),
      post    : await request.post('/rest'),
      put     : await request.put('/rest'),
      delete  : await request.delete('/rest')
    }

    expect(result.get.status).to.be.equal(501)
    expect(result.post.status).to.be.equal(501)
    expect(result.put.status).to.be.equal(501)
    expect(result.delete.status).to.be.equal(501)
  })

  it('a raw text response', async () =>
  {
    const result = await request.get('/test-raw')

    expect(result.status).to.be.equal(200)
    expect(result.data).to.be.equal('txt')
  })

  it('a json response', async () =>
  {
    const result = await request.get('/test-json')

    expect(result.status).to.be.equal(200)
    expect(result.data.foobar).to.be.equal('bazqux')
  })

  it('a none specified endpoint should respond with a status:"501"', async () =>
  {
    const result = await request.get('/test-501')

    expect(result.status).to.be.equal(501)
    expect(result.data).to.be.equal('Not Implemented')
  })

  it('a failing dispatcher', async () =>
  {
    const result = await request.get('/test-failing')

    expect(result.status).to.be.equal(500)
    expect(result.data).to.be.equal('Internal Server Error')
  })

  it('a none specified route returns a 404', async () =>
  {
    const result = await request.get('/none-existing-path')

    expect(result.status).to.be.equal(404)
    expect(result.data).to.be.equal('Not Found')
  })

  it('route.arg body', async () =>
  {
    const result = await request.post(
    {
      url   : '/test-route-arg-body',
      data  : { foo:'bar' }
    })

    expect(result.status).to.be.equal(200)
    expect(result.data).to.be.equal('bar')
  })

  it('route.arg query', async () =>
  {
    const result = await request.post('/test-route-arg-query?foo=bar')

    expect(result.status).to.be.equal(200)
    expect(result.data).to.be.equal('bar')
  })

  it('route.arg segment', async () =>
  {
    const result = await request.post('/bar/test-route-arg-segment')

    expect(result.status).to.be.equal(200)
    expect(result.data).to.be.equal('bar')
  })

  it('route.arg segment by number', async () =>
  {
    const result = await request.post('/bar/test-route-arg-segment-by-number')

    expect(result.status).to.be.equal(200)
    expect(result.data).to.be.equal('bar')
  })

  it('route.entity', async () =>
  {
    const result = await request.post(
    {
      url   : '/test-route-entity',
      data  :
      {
        foo : 'foo',
        bar : 'bar',
        baz : 'baz'
      }
    })

    expect(result.status).to.be.equal(200)
    expect(result.data).to.deep.equal(
    {
      foo : 'foo',
      bar : 'bar',
      baz : 'baz'
    })
  })

  after(() => server.close())
})
