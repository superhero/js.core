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
    if(!this.route.allowed)
    {
      throw new ServerError('No allowed methods are defined in the route')
    }

    const allowed = this.route.allowed.filter((method) => method.toUpperCase())

    if(allowed.includes(this.request.method))
    {
      this.view.headers['Allowed'] = allowed.join(',')
      throw new MethodNotAllowedError(`Method not allowed: "${this.request.method}"`)
    }

    switch(this.request.method)
    {
      case 'OPTION' :
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
        const msg = `Unrecognized method "${method}"`
        throw new BadRequestError(msg)
      }
    }
  }

  get()     { throw new NotImplementedError }
  post()    { throw new NotImplementedError }
  put()     { throw new NotImplementedError }
  delete()  { throw new NotImplementedError }
}

module.exports = HttpDispatcherRest
