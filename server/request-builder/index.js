const
url         = require('url'),
querystring = require('querystring')

class ServerRequestBuilder
{
  constructor(deepfreeze)
  {
    this.deepfreeze = deepfreeze
  }

  async build(in)
  {
    const
    parsedUrl = url.parse(in.url, true),
    request   =
    {
      headers : in.headers,
      method  : in.method,
      url     : parsedUrl.pathname,
      query   : parsedUrl.query,
      body    : await this.fetchBody(in)
    }

    return deepfreeze.freeze(request)
  }

  async fetchBody(in)
  {
    return new Promise((accept, reject) =>
    {
      let body = ''

      in.on('error',  reject)
      in.on('data',   (data)  => body += data)
      in.on('end',    ()      => this.parseBody(in.headers['content-type'], body).then(accept).catch(reject))
    })
  }

  async parseBody(contentType, body)
  {
    switch(contentType)
    {
      case 'application/json':
        return JSON.parse(body || '{}')

      default:
        return querystring.parse(body)
    }
  }
}

module.exports = ServerRequestBuilder
