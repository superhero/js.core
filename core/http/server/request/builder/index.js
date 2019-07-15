const
urlParser   = require('url').parse,
querystring = require('querystring')

class HttpRequestBuilder
{
  constructor(deepfreeze)
  {
    this.deepfreeze = deepfreeze
  }

  async build(input)
  {
    const
    parsedUrl = urlParser(input.url, true),
    headers   = this.mapHeaders(input.headers),
    method    = input.method.toUpperCase(),
    url       = parsedUrl.pathname.replace(/\/+$/g, ''),
    query     = parsedUrl.query,
    body      = await this.fetchBody(input, headers),
    request   = { headers, method, url, query, body }

    return this.deepfreeze.freeze(request)
  }

  mapHeaders(headers)
  {
    const mapped = {}

    for(const key in headers)
    {
      const lowerCaseKey = key.toLowerCase()
      mapped[lowerCaseKey] = headers[key]
    }

    return mapped
  }

  async fetchBody(stream, headers)
  {
    return new Promise((accept, reject) =>
    {
      let body = ''

      stream.on('error', reject)
      stream.on('data',  (data)  => body += data)
      stream.on('end',   ()      => this.parseBody(headers['content-type'], body).then(accept).catch(reject))
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

module.exports = HttpRequestBuilder
