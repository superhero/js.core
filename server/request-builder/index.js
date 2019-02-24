const
url         = require('url'),
querystring = require('querystring')

class ServerRequestBuilder
{
  constructor(deepfreeze)
  {
    this.deepfreeze = deepfreeze
  }

  async build(input)
  {
    const
    parsedUrl = url.parse(input.url, true),
    request   =
    {
      headers : input.headers,
      method  : input.method,
      url     : parsedUrl.pathname,
      query   : parsedUrl.query,
      body    : await this.fetchBody(input)
    }

    return deepfreeze.freeze(request)
  }

  async fetchBody(input)
  {
    return new Promise((accept, reject) =>
    {
      let body = ''

      input.on('error',  reject)
      input.on('data',   (data)  => body += data)
      input.on('end',    ()      => this.parseBody(input.headers['content-type'], body).then(accept).catch(reject))
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
