const HttpError = require('.')

class ServiceUnavailable extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 503
  }
}

module.exports = ServiceUnavailable
