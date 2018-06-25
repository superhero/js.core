const arg = module.exports = function(request, input)
{
  switch (typeof input)
  {
    case 'number':
      let path = request.url.pathname
      path = path.substring(path[0] == '/' ? 1 : 0)
      return path.split('/')[input]

    case 'string':
      return arg.call(this, request, this.mapper[input])

    case 'object':
    {
      for(const where in input)
        switch(where)
        {
          case 'body'    : return request.body[ input[where] ]
          case 'query'   : return request.url.query[ input[where] ]
          case 'segment' : return arg.call(this, request, input[where])
        }

      const
      msg = `unexpected mapper object supplied in the route`,
      err = new Error(msg)

      err.code = 'ERR_ARG_UNEXPECTED_OBJ'
      throw err
    }

    default:
    {
      const
      msg = `unexpected type:"${typeof input}" in a recursive call`,
      err = new Error(msg)

      err.code = 'ERR_ARG_UNEXPECTED_TYPE'
      throw err
    }
  }
}
