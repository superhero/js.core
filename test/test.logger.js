describe('Logger', () =>
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

    core.locate('bootstrap').bootstrap().then(done)
  })

  it('the logger is logging', function(done)
  {
    const configuration = core.locate('configuration')
    const eventbus      = core.locate('eventbus')
    context(this, { title:'observers', value:configuration.find('http.eventbus.observers') })
    eventbus.once('logger.logged-event', () => done())
    eventbus.emit('calculator.calculation-created', 'test')
  })
})
