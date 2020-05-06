const NotImplementedError = require('./error/not-implemented')

class HttpDispatcher
{
  constructor(route, request, session, locator, view)
  {
    this.route    = route
    this.request  = request
    this.session  = session
    this.locator  = locator
    this.view     = view
  }

  dispatch()
  {
    const msg = 'the "dispatch" method is not implemented'
    throw new NotImplementedError(msg)
  }

  onError(error)
  {
    throw error
  }
}

module.exports = HttpDispatcher
