const
HttpDispatcher        = require('.'),
BadRequestError       = require('./error/bad-request'),
MethodNotAllowedError = require('./error/method-not-allowed'),
NotImplementedError   = require('./error/not-implemented'),
ServerError           = require('./error/server-error')

class HttpDispatcherRest extends HttpDispatcher
{
  async dispatch()
  {
    const allowed = this.fetchAllowedMethods(this.route)

    if(!allowed.includes(this.request.method))
    {
      this.view.headers['Allowed'] = allowed.join(',')
      throw new MethodNotAllowedError(`Method not allowed: "${this.request.method}"`)
    }

    switch(this.request.method)
    {
      case 'OPTIONS':
      {
        this.view.headers['Allowed'] = allowed.join(',')
        break
      }
      case 'GET'    :
      case 'POST'   :
      case 'PUT'    :
      case 'DELETE' :
      {
        const action = this.request.method.toLowerCase()
        await this[action]()
        break
      }
      default :
      {
        const msg = `Unrecognized method "${method}", expected one of: "${allowed.join(',')}"`
        throw new BadRequestError(msg)
      }
    }
  }

  fetchAllowedMethods(route)
  {
    if(!route.allowed)
    {
      throw new ServerError('No allowed methods are defined in the route')
    }
    if(!Array.isArray(route.allowed))
    {
      throw new ServerError('Allowed methods in route is not defined as an array')
    }
    if(!route.allowed.every((allowed) => typeof allowed === 'string'))
    {
      throw new ServerError('Allowed http method must be a set of strings')
    }

    const allowed = route.allowed.filter((method) => method.toUpperCase())

    if(!allowed.includes('OPTIONS'))
    {
      allowed.push('OPTIONS')
    }

    return allowed
  }

  get()     { throw new NotImplementedError }
  post()    { throw new NotImplementedError }
  put()     { throw new NotImplementedError }
  delete()  { throw new NotImplementedError }
}

module.exports = HttpDispatcherRest
