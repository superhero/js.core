describe('Logger', () =>
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

    core.locate('core/bootstrap').bootstrap().then(done)
  })

  it('the logger is logging', function(done)
  {
    const configuration = core.locate('core/configuration')
    const eventbus      = core.locate('core/eventbus')
    context(this, { title:'observers', value:configuration.find('core.http.eventbus.observers') })
    eventbus.once('logged calculation created event', () => done())
    eventbus.emit('calculation created', 'test')
  })
})
