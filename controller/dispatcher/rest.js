const NotFound =
{
  status : 404,
  body   : 'Not Found'
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
                         body   : 'Bad Request' }
    }
  }

  get()     { return NotFound }
  post()    { return NotFound }
  put()     { return NotFound }
  delete()  { return NotFound }
}
