describe('controller/server/http', async () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  config  = require('./config')

  let request, core, server

  before(async function()
  {
    const
    Request = require('@superhero/request'),
    port    = 9001

    context(this, { title:'config', value:config })

    request = new Request({ url:'http://localhost:' + port })
    core    = await require('../').bootstrap(config.bootstrap)
    server  = core.http(config.routes)

    server.listen(port)
  })

  it('fetching a public resource', async () =>
  {
    const result = await request.get('/resource/master.css')

    expect(result.status).to.be.equal(200)
    expect(result.headers['content-type']).to.be.equal('text/css')
    expect(result.data.includes('margin: 0')).to.be.equal(true)
  })

  it('testing the rest dispatcher', async () =>
  {
    const result =
    {
      get     : await request.get('/rest'),
      post    : await request.post('/rest'),
      put     : await request.put('/rest'),
      delete  : await request.delete('/rest'),
      index   : await request.fetch('index', '/rest')
    }

    expect(result.get.status).to.be.equal(501)
    expect(result.post.status).to.be.equal(501)
    expect(result.put.status).to.be.equal(501)
    expect(result.delete.status).to.be.equal(501)
    expect(result.index.status).to.be.equal(400)
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

  it('a templated response', async () =>
  {
    const result = await request.get('/test-templated')

    expect(result.status).to.be.equal(200)

    expect(result.data.startsWith('layout')).to.be.equal(true)
    expect(result.data.includes('titled')).to.be.equal(true)
    expect(result.data.includes('bazqux')).to.be.equal(true)
  })

  it('the if helper', async () =>
  {
    const result = await request.get('/test-templated')

    // testing the "if" helper in the template
    expect(result.data.includes('==')).to.be.equal(true)
    expect(result.data.includes('!=')).to.be.equal(true)
    expect(result.data.includes('<' )).to.be.equal(true)
    expect(result.data.includes('<=')).to.be.equal(true)
    expect(result.data.includes('>' )).to.be.equal(true)
    expect(result.data.includes('>=')).to.be.equal(true)
    expect(result.data.includes('&&')).to.be.equal(true)
    expect(result.data.includes('||')).to.be.equal(true)
    expect(result.data.includes('typeof')).to.be.equal(true)
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

  after(() => server.close())
})
