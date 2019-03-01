const Dispatcher = require('../http/dispatcher')

class TestEndpoint extends Dispatcher
{
  dispatch()
  {
    this.viewModel.body.foo = 'foo'
    this.viewModel.body.dto = this.route.dto
  }
}

module.exports = TestEndpoint
