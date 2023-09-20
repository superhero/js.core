const http2 = require('http2')

class Http2Request
{
  connect(remote, options)
  {
    return http2.connect(remote, options)
  }

  request(client, method, path)
  {
    const request = client.request(
    {
      ':path'   : path,
      ':method' : method
    })

    const _write = request.write.bind(request)
    request.write = (dto) => _write(typeof dto === 'object' ? JSON.stringify(dto) : dto)

    return request
  }

  get(client, path)
  {
    return this.request(client, 'GET', path)
  }

  post(client, path)
  {
    return this.request(client, 'POST', path)
  }

  put(client, path)
  {
    return this.request(client, 'PUT', path)
  }

  delete(client, path)
  {
    return this.request(client, 'DELETE', path)
  }
}

module.exports = Http2Request
