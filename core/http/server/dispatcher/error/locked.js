const HttpError = require('.')

class Locked extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 423
  }
}

module.exports = Locked
