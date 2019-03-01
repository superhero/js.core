const SessionBuilder = require('.')

class SessionBuilderLocator
{
  locate()
  {
    return new SessionBuilder
  }
}

module.exports = SessionBuilderLocator
