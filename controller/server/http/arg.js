// Used by the request mapper to be able to locate arguments in the request
// body
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
      for(const where of ['body', 'query', 'segment']) //This sets the hierarchy
      {
        if(!input.hasOwnProperty(where)
          continue;
        
        let value
        switch(where)
        {
          case 'body'    : value = request.body[ input[where] ];          break
          case 'query'   : value = request.url.query[ input[where] ];     break
          case 'segment' : value = arg.call(this, request, input[where]); break
        }

        if(value !== undefined)
          return value
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
