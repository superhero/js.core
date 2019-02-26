describe('Core', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  config  = require('./test/config'),
  Request = require('@superhero/request'),
  request = new Request()

  let core

  before(() =>
  {
    const
    CoreFactory = require('./factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('console')
    core.add('deepcopy')
    core.add('deepfind')
    core.add('deepfreeze')
    core.add('deepmerge')
    core.add('eventbus')
    core.add('path')
    core.add('process')
    core.add('server/dispatcher/chain')
    core.add('server/dispatcher/collection/builder')
    core.add('server/request/builder')
    core.add('server/route/builder')
    core.add('server/session/builder')
    core.add('server/http')
    core.add('view/json')
    core.add('view/text')
    core.add('test')

    core.load()

    core.locate('path').main.dirname = __dirname
    core.locate('server/http').listen(9001)
  })

  after(async () =>
  {
    await core.locate('server/http').close()
  })

  it('testing route "foo"', async function()
  {
    context(this, { title:'route', value:config.server.http.routes.foo })
    const response = await request.get('http://localhost:9001/test/foo')
    require('@superhero/debug').log(response)
    expect(response.data.foo).to.be.equal('foo')
  })
})
