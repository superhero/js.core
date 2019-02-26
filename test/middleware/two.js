const Dispatcher = require('../server/dispatcher')

class TestMiddlewareTwo extends Dispatcher
{
  dispatch(next)
  {
    require('@superhero/debug').log('3')
    const vm = await next()
    vm.bar = 'qux'

    return vm
  }
}

module.exports = TestMiddlewareTwo
