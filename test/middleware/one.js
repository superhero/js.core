const Dispatcher = require('../../http/server/dispatcher')

class TestMiddlewareOne extends Dispatcher
{
  async dispatch(next)
  {
    await next()
    this.view.body.foo = 'bar'
  }
}

module.exports = TestMiddlewareOne
