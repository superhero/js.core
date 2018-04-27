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

      default : throw 400
    }
  }

  get()     { throw 404 }
  post()    { throw 404 }
  put()     { throw 404 }
  delete()  { throw 404 }
}
