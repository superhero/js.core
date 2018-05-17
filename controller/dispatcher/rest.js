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

  get()     { throw 501 }
  post()    { throw 501 }
  put()     { throw 501 }
  delete()  { throw 501 }
}
