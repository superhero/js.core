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

  it('should return a 400 status bad request', async function()
  {
    const configuration = core.locate('core/configuration')
    const httpRequest = core.locate('core/http/request')
    context(this, { title:'route', value:configuration.find('core.http.server.routes.dto-test') })
    const url = 'http://localhost:9002/dto-test'
    const data = { foo:'bar' }
    const response = await httpRequest.post({ url, data })
    expect(response.status).to.be.equal(400)
  })
})
