describe('Calculations', () =>
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

  it('A client can create a calculation', async function()
  {
    const configuration = core.locate('core/configuration')
    const httpRequest = core.locate('core/http/request')
    context(this, { title:'route', value:configuration.find('core.http.server.routes.create-calculation') })
    const response = await httpRequest.post('http://localhost:9002/calculations')
    expect(response.data.id).to.be.equal(1)
  })

  it('A client can append a calculation to the result of a former calculation if authentication Api-Key', async function()
  {
    const configuration = core.locate('core/configuration')
    const httpRequest = core.locate('core/http/request')
    context(this, { title:'route', value:configuration.find('core.http.server.routes.append-calculation') })
    const url = 'http://localhost:9002/calculations/1'
    const data = { id:1, type:'addition', value:100 }
    const response_unauthorized = await httpRequest.put({ url, data })
    console.log('* * * * * * * * * *', response_unauthorized.data)
    expect(response_unauthorized.status).to.be.equal(401)
    const headers = { 'api-key':'ABC123456789' }
    const response_authorized = await httpRequest.put({ headers, url, data })
    expect(response_authorized.data.result).to.be.equal(data.value)
  })
})
