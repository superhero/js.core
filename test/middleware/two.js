const Dispatcher = require('../../http/dispatcher')

class TestMiddlewareTwo extends Dispatcher
{
  async dispatch(next)
  {
    await next()
    this.viewModel.body.baz = 'qux'
  }
}

module.exports = TestMiddlewareTwo
