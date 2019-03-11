describe('Calculations', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  let core

  before((done) =>
  {
    const
    CoreFactory = require('../factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('api')
    core.add('calculator')
    core.add('logger')
    core.add('http/server')

    core.load()

    core.locate('bootstrap').bootstrap().then(() =>
    {
      core.locate('http/server').listen(9001)
      core.locate('http/server').onListening(done)
    })
  })

  after(() =>
  {
    core.locate('http/server').close()
  })

  it('A client can create a calculation', async function()
  {
    const configuration = core.locate('configuration')
    const httpRequest = core.locate('http/request')
    context(this, { title:'route', value:configuration.find('http.server.routes.create-calculation') })
    const response = await httpRequest.post('http://localhost:9001/calculations')
    expect(response.data.id).to.be.equal(1)
  })

  it('A client can append a calculation to the result of a former calculation if authentication Api-Key', async function()
  {
    const configuration = core.locate('configuration')
    const httpRequest = core.locate('http/request')
    context(this, { title:'route', value:configuration.find('http.server.routes.append-calculation') })
    const url = 'http://localhost:9001/calculations/1'
    const data = { id:1, type:'addition', value:100 }
    const response_unauthorized = await httpRequest.put({ url, data })
    expect(response_unauthorized.status).to.be.equal(401)
    const headers = { 'Api-Key':'ABC123456789' }
    const response_authorized = await httpRequest.put({ headers, url, data })
    expect(response_authorized.data.result).to.be.equal(data.value)
  })
})
