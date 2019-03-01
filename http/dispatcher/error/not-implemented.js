const HttpError = require('.')

class NotImplemented extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 501
  }
}

module.exports = NotImplemented
