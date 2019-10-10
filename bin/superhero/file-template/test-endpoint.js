module.exports = (endpoint) =>
`describe('Endpoint tests for ${endpoint}', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  port    = 9001,
  host    = 'http://localhost:' + port

  let core

  before((done) =>
  {
    const
    CoreFactory = require('superhero/core/factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('api')
    core.add('domain')
    core.add('infrastructure')

    core.load()

    core.locate('core/bootstrap').bootstrap().then(() =>
    {
      core.locate('core/http/server').listen(port)
      core.locate('core/http/server').onListening(done)
    })
  })

  after(async () =>
  {
    core.locate('core/http/server').close()
  })

  it('is expected for the response to match expected output schema', async function()
  {
    const
    configuration = core.locate('core/configuration'),
    request       = core.locate('core/http/request'),
    composer      = core.locate('core/schema/composer'),
    route         = configuration.find('core.http.server.routes.${endpoint}')

    context(this, { title:'route', value:route })

    const
    headers       = { 'content-type':'application/json' },
    url           = \`\${host}\${route.url}\`,
    data          = composer.composeExample(route.input),
    response      = await request[route.method]({ headers, url, data }),
    validate      = composer.compose.bind(composer, route.output, response.data)

    expect(validate).to.not.throw()
  })
})
`
