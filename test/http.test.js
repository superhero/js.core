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
    expect(result.data.includes('margin: 0')).to.be.equal(true)
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
    expect(result.data.includes('bar')).to.be.equal(true)
    expect(result.data.includes('qux')).to.be.equal(true)
  })

  it('integration test of a none specified route', async () =>
  {
    const result = await request.get('/none-existing-path')

    expect(result.status).to.be.equal(502)
    expect(result.data).to.be.equal('Bad Gateway')
  })

  after(() => server.close())
})
