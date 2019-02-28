describe('Core', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  config  = require('./test/config'),
  Request = require('@superhero/request'),
  request = new Request()

  let core

  before(async () =>
  {
    const
    CoreFactory = require('./factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('bootstrap')
    core.add('console')
    core.add('deepcopy')
    core.add('deepfind')
    core.add('deepfreeze')
    core.add('deepmerge')
    core.add('eventbus')
    core.add('eventbus/bootstrap')
    core.add('path')
    core.add('process')
    core.add('process/bootstrap')
    core.add('server/dispatcher/chain')
    core.add('server/dispatcher/collection/builder')
    core.add('server/request/builder')
    core.add('server/route/builder')
    core.add('server/session/builder')
    core.add('server/http')
    core.add('view/json')
    core.add('view/text')
    core.add('test')
    core.add('test/observer/foobar')

    core.load()

    core.locate('path').main.dirname = __dirname
    await core.locate('bootstrap').bootstrap()
    core.locate('server/http').listen(9001)
  })

  after(async () =>
  {
    await core.locate('server/http').close()
  })

  it('testing route "foo"', async function()
  {
    const configuration = core.locate('configuration')
    context(this, { title:'route', value:configuration.config.server.http.routes.foo })
    const response = await request.get('http://localhost:9001/test/foo')
    expect(response.data.foo).to.be.equal('foo')
    expect(response.data.dto).to.deep.equal({})
  })

  it('testing route "bar"', async function()
  {
    const configuration = core.locate('configuration')
    context(this, { title:'route', value:configuration.config.server.http.routes.bar })
    const response = await request.get('http://localhost:9001/test/bar?foo=foobar&bar=bazqux')
    expect(response.data.foo).to.be.equal('bar')
    expect(response.data.baz).to.be.equal('qux')
    expect(response.data.dto).to.deep.equal({})
  })

  it('testing route "baz" with dto', async function()
  {
    const configuration = core.locate('configuration')
    context(this, { title:'route', value:configuration.config.server.http.routes.baz })
    const response = await request.get('http://localhost:9001/test/baz?foo=foobar&bar=bazqux')
    expect(response.data.foo).to.be.equal('bar')
    expect(response.data.baz).to.be.equal('qux')
    expect(response.data.dto).to.deep.equal({ foo:'foobar', bar:'bazqux' })
  })

  it('testing the eventbus "foobar"', function(done)
  {
    const configuration = core.locate('configuration')
    context(this, { title:'eventbus.observers', value:configuration.config.eventbus.observers })
    const eventbus = core.locate('eventbus')
    eventbus.on('foobar.received', (event) =>
    {
      expect(event.data).to.be.equal('bazqux')
      done()
    })
    eventbus.emit('foobar', 'bazqux')
  })
})
