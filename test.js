describe('Core', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  config  = require('./test/config')

  let core

  before(async () =>
  {
    const
    CoreFactory = require('./factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('http')
    core.add('test')

    core.load()

    core.locate('path').main.dirname = __dirname
    await core.locate('bootstrap').bootstrap()
    core.locate('http').listen(9001)
  })

  after(async () =>
  {
    await core.locate('http').close()
  })

  it('testing route "foo"', async function()
  {
    const configuration = core.locate('configuration')
    const http          = core.locate('http')
    context(this, { title:'route', value:configuration.find('http.routes.test-foo') })
    const response = await http.request.get('http://localhost:9001/test/foo')
    // core.locate('console').log(response)
    expect(response.data.foo).to.be.equal('foo')
    expect(response.data.dto).to.deep.equal({})
  })

  it('testing route "bar"', async function()
  {
    const configuration = core.locate('configuration')
    const http          = core.locate('http')
    context(this, { title:'route', value:configuration.find('http.routes.test-bar') })
    const response = await http.request.get('http://localhost:9001/test/bar?foo=foobar&bar=bazqux')
    // core.locate('console').log(response)
    expect(response.data.foo).to.be.equal('bar')
    expect(response.data.baz).to.be.equal('qux')
    expect(response.data.dto).to.deep.equal({})
  })

  it('testing route "baz" with dto', async function()
  {
    const configuration = core.locate('configuration')
    const http          = core.locate('http')
    context(this, { title:'route', value:configuration.find('http.routes.test-baz') })
    const response = await http.request.get('http://localhost:9001/test/baz?foo=foobar&bar=bazqux')
    // core.locate('console').log(response)
    expect(response.data.foo).to.be.equal('bar')
    expect(response.data.baz).to.be.equal('qux')
    expect(response.data.dto).to.deep.equal({ foo:'foobar', bar:'bazqux' })
  })

  it('testing the eventbus "foobar"', function(done)
  {
    const configuration = core.locate('configuration')
    context(this, { title:'eventbus.observers', value:configuration.find('eventbus.observers') })
    const eventbus = core.locate('eventbus')
    eventbus.on('foobar.received', (event) =>
    {
      expect(event.data).to.be.equal('bazqux')
      done()
    })
    eventbus.emit('foobar', 'bazqux')
  })
})
