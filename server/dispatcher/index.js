const NotImplementedError = require('./error/not-implemented')

class ServerDispatcher
{
  constructor(route, request, session, locator)
  {
    this.route   = route
    this.request = request
    this.session = session
    this.locator = locator
  }

  dispatch()
  {
    const msg = '"dispatch" method is not implemented'
    throw new NotImplementedError(msg)
  }
}

module.exports = ServerDispatcher
