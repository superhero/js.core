const HttpError = require('.')

class FailedDependency extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 42
  }
}

module.exports = FailedDependency
