describe('Bad request test', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  let core

  before((done) =>
  {
    const
    CoreFactory = require('../core/factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('api')
    core.add('domain')

    core.load()

    core.locate('core/bootstrap').bootstrap().then(() =>
    {
      core.locate('core/http/server').listen(9002)
      core.locate('core/http/server').onListening(done)
    })
  })

  after(() =>
  {
    core.locate('core/http/server').close()
  })

  it('should return a 400 status bad request when the request body does not match the expected input', async function()
  {
    const configuration = core.locate('core/configuration')
    const httpRequest = core.locate('core/http/request')
    context(this, { title:'route', value:configuration.find('core.http.server.routes.dto-test') })
    const url = 'http://localhost:9002/dto-test'
    const data = { foo:'bar' }
    const response = await httpRequest.post({ url, data })
    expect(response.status).to.be.equal(400)
  })

  it('should return a 404 if the header does not match the expected value', async function()
  {
    const configuration = core.locate('core/configuration')
    const httpRequest = core.locate('core/http/request')
    context(this, { title:'route', value:configuration.find('core.http.server.routes.dto-test') })
    const url = 'http://localhost:9002/header-test'

    const response1 = await httpRequest.post({ url, headers:{ 'x-foo':'foo' } })
    expect(response1.status).to.be.equal(404)

    const response2 = await httpRequest.post({ url, headers:{ 'x-foo':'bar', 'x-bar':'foo' } })
    expect(response2.status).to.be.equal(404)

    const response3 = await httpRequest.post({ url, headers:{ 'x-foo':'foo', 'x-bar':'bar' } })
    expect(response3.status).to.be.equal(200)
  })
})
