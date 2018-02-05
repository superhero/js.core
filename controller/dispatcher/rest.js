const PageNotFound =
{
  status : 404,
  body   :
  {
    status  : 'failed',
    message : 'Page Not Found',
    reason  : 'dispatcher action has not been filled'
  }
}

module.exports = class extends require('.')
{
  dispatch()
  {
    const method = this.request.method.toLowerCase()

    switch(method)
    {
      case 'get'    :
      case 'post'   :
      case 'put'    :
      case 'delete' : return this[method]()

      default : return { status : 400,
                         body   :
                         { status  : 'failed',
                           message : 'unsupported method',
                           method  : this.request.method } }
    }
  }

  get()     { return PageNotFound }
  post()    { return PageNotFound }
  put()     { return PageNotFound }
  delete()  { return PageNotFound }
}
