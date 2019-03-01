const Dispatcher = require('../../http/dispatcher')

class TestMiddlewareOne extends Dispatcher
{
  async dispatch(next)
  {
    await next()
    this.viewModel.body.foo = 'bar'
  }
}

module.exports = TestMiddlewareOne
