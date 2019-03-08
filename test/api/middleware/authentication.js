const
Dispatcher    = require('../../../http/server/dispatcher'),
Unauthorized  = require('../../../http/server/dispatcher/error/unauthorized')

/**
 * @extends {@superhero/core/http/server/dispatcher}
 */
class AuthenticationMiddleware extends Dispatcher
{
  async dispatch(next)
  {
    const
    configuration = this.locator.locate('configuration'),
    apikey        = this.request.headers['api-key']

    if(apikey === configuration.find('authentication.apikey'))
    {
      await next()
    }
    else
    {
      throw new Unauthorized('You are not authorized to access the requested resource')
    }
  }
}

module.exports = AuthenticationMiddleware
