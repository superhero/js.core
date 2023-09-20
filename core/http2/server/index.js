class Http2Server
{
  /**
   * @param {Object} router
   * @param {Http2Server} server
   * @param {Core.Locator} locator
   */
  constructor(router, server, locator)
  {
    this.router   = router
    this.server   = server
    this.locator  = locator
  }

  listen(...args)
  {
    this.server.listen(...args)
  }

  close()
  {
    return new Promise((accept, reject) =>
      this.server.close((error) =>
        error
        ? reject(error)
        : accept()))
  }

  onStream(stream, headers)
  {
    const
      method      = (headers[':method'] || 'get').toLowerCase(),
      path        = (headers[':path']   || '/').toLowerCase(),
      dispatcher  = this.router[path]?.[method],
      router      = { method, path, dispatcher }

    const _write = stream.write.bind(stream)
    stream.write = (dto) => _write(typeof dto === 'object' ?  JSON.stringify(dto) : dto)

    stream.on('ready',    this.onReady.bind(this, stream, headers, router))
    stream.on('aborted',  this.onAborted.bind(this, stream))
    stream.on('timeout',  this.onTimeout.bind(this, stream))
    stream.on('error',    this.onError.bind(this, stream, headers, router))
  }

  onReady(stream, headers, { path, method, dispatcher })
  {
    try
    {
      this.locator.locate(dispatcher).dispatch(stream, headers)
    }
    catch(error)
    {
      const msg = `Failed to dispatch request to "${dispatcher}", "${path}" -> "${method}"`
      this.console.error(msg, error)
      stream.end(msg)
    }
  }

  onAborted(stream)
  {
    stream.end()
  }

  onTimeout(stream)
  {
    stream.end('Stream Timeout')
  }

  onError(stream, headers, { path, method, dispatcher }, error)
  {
    const msg = `Stream error when dispatching "${dispatcher}", "${path}" -> "${method}"`
    this.console.error(msg, error)
    stream.end('Stream Error')
  }
}

module.exports = Http2Server
