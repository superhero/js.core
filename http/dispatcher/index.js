const NotImplementedError = require('./error/not-implemented')

class HttpDispatcher
{
  constructor(route, request, session, locator, viewModel)
  {
    this.route      = route
    this.request    = request
    this.session    = session
    this.locator    = locator
    this.viewModel  = viewModel
  }

  dispatch()
  {
    const msg = '"dispatch" method is not implemented'
    throw new NotImplementedError(msg)
  }

  onError(error)
  {
    throw error
  }
}

module.exports = HttpDispatcher
