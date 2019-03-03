const Dispatcher = require('../http/server/dispatcher')

class TestEndpoint extends Dispatcher
{
  dispatch()
  {
    this.view.body.foo = 'foo'
    this.view.body.dto = this.route.dto
  }
}

module.exports = TestEndpoint
