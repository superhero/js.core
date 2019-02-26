const Dispatcher = require('../server/dispatcher')

class TestEndpoint extends Dispatcher
{
  dispatch()
  {
    require('@superhero/debug').log('1')
    const vm = { foo:'bar', dto:this.route.dto }
    return vm
  }
}

module.exports = TestEndpoint
