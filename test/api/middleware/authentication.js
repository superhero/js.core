const
Dispatcher    = require('../../../core/http/server/dispatcher'),
Unauthorized  = require('../../../core/http/server/dispatcher/error/unauthorized')

/**
 * @memberof Api
 * @extends {superhero/core/http/server/dispatcher}
 */
class AuthenticationMiddleware extends Dispatcher
{
  async dispatch(next)
  {
    const
    configuration = this.locator.locate('core/configuration'),
    apikey        = this.request.headers['api-key']

    if(apikey === 'ABC123456789')
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
