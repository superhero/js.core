describe('controller/server/http', () =>
{
  const
  Request = require('@superhero/request'),
  Debug   = require('@superhero/debug'),
  expect  = require('chai').expect,
  config  = require('./config'),
  port    = 9001,
  debug   = new Debug(),
  request = new Request({ url:'http://localhost:' + port }),
  server  = require('../').http(config.routes)

  before(() => server.listen(port))

  it('integration test of fetching a public resource', async () =>
  {
    const result = await request.get('/resource/master.css')

    expect(result.status).to.be.equal(200)
    expect(result.headers['content-type']).to.be.equal('text/css')
    expect(result.data.includes('margin: 0')).to.be.equal(true)
  })

  it('integration test of the rest dispatcher', async () =>
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

  it('integration test of a raw text response', async () =>
  {
    const result = await request.get('/test-raw')

    expect(result.status).to.be.equal(200)
    expect(result.data).to.be.equal('txt')
  })

  it('integration test of a json response', async () =>
  {
    const result = await request.get('/test-json')

    expect(result.status).to.be.equal(200)
    expect(result.data.foobar).to.be.equal('bazqux')
  })

  it('integration test of a templated response', async () =>
  {
    const result = await request.get('/test-templated')

    expect(result.status).to.be.equal(200)
    expect(result.data.startsWith('bazqux')).to.be.equal(true)

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

  it('integration test of a none specified dispatcher should ', async () =>
  {
    const result = await request.get('/test-501')

    expect(result.status).to.be.equal(501)
    expect(result.data).to.be.equal('Not Implemented')
  })

  it('integration test of a failing dispatcher', async () =>
  {
    const result = await request.get('/test-failing')

    expect(result.status).to.be.equal(500)
    expect(result.data).to.be.equal('Internal Server Error')
  })

  it('integration test of a none specified route returns a 404', async () =>
  {
    const result = await request.get('/none-existing-path')

    expect(result.status).to.be.equal(404)
    expect(result.data).to.be.equal('Not Found')
  })

  after(() => server.close())
})
