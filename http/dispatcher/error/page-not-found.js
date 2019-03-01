const HttpError = require('.')

class PageNotFound extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 404
  }
}

module.exports = PageNotFound
