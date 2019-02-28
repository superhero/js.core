const
ServerDispatcher    = require('.'),
BadRequestError     = require('../error/bad-request'),
NotImplementedError = require('../error/not-implemented')

class ServerRestDispatcher extends ServerDispatcher
{
  dispatch()
  {
    const method = this.request.method.toLowerCase()

    switch(method)
    {
      case 'get'    :
      case 'post'   :
      case 'put'    :
      case 'delete' :
        return this[method]()

      default :
        const msg = `unrecognized method "${method}"`
        throw new BadRequestError(msg)
    }
  }

  get()     { throw new NotImplementedError }
  post()    { throw new NotImplementedError }
  put()     { throw new NotImplementedError }
  delete()  { throw new NotImplementedError }
}

module.exports = ServerRestDispatcher
