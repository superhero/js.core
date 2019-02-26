const Dispatcher = require('../server/dispatcher')

class TestMiddlewareOne extends Dispatcher
{
  dispatch(next)
  {
    require('@superhero/debug').log('2')
    const vm = await next()
    vm.foo = 'baz'

    return vm
  }
}

module.exports = TestMiddlewareOne
