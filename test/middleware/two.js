const Dispatcher = require('../../http/server/dispatcher')

class TestMiddlewareTwo extends Dispatcher
{
  async dispatch(next)
  {
    await next()
    this.view.body.baz = 'qux'
  }
}

module.exports = TestMiddlewareTwo
