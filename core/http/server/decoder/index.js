class ServerDecoder
{
  constructor(path, locator)
  {
    this.path     = path
    this.locator  = locator
  }

  async decode(route, request, session, viewModel)
  {
    const decoders = route.decoder ? Array.isArray(route.decoder) ? route.decoder : [route.decoder] : []

    for(const i in decoders)
    {
      const decoder = this.createDecoder(decoders[i], route, request, session, viewModel)

      try 
      {
        request = await decoder.decode(request)
      }
      catch (previousError) 
      {
        await decoder.onError(previousError)
        const error = new Error(`failed to decode`)
        error.code  = 'E_HTTP_SERVER_DECODER_FAILED_TO_DECODE'
        error.chain = { previousError }
        throw error
      }
    }

    return request
  }

  createDecoder(pathname, route, request, session, viewModel)
  {
    const pathnames = 
    [
      `${pathname}`,
      `${this.path.main.dirname}/${pathname}`
    ]

    for(const path of pathnames)
    {
      if(this.path.isResolvable(path))
      {
        const
          Decoder = require(path),
          decoder = new Decoder(route, request, session, this.locator, viewModel)

        if(typeof decoder.decode   !== 'function'
        || typeof decoder.onError  !== 'function')
        {
          const error = new Error(`decoder "${pathname}" is not honering the server decoder interface`)
          error.code = 'E_HTTP_SERVER_DECODER'
          throw error
        }

        return decoder
      }
    }

    const error = new Error(`decoder "${pathname}" can not be resolved in request: ${request.method} -> ${request.url}`)
    error.code = 'E_HTTP_SERVER_DECODER'
    throw error
  }
}

module.exports = ServerDecoder
