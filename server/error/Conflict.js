const ServerError = require('.')

class ServerErrorConflict extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 409
  }
}

module.exports = ServerErrorConflict
