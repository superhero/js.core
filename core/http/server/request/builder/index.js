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

  fetchBody(stream, headers)
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
    const 
      parts     = (contentType || '').split(';'),
      type      = parts.shift(),
      secondary = parts.shift()

    switch(type)
    {
      case 'text/plain':
      case 'application/jwt':
          return body

      case 'application/json':
        try
        {
          return JSON.parse(body || '{}')
        }
        catch(previousError)
        {
          const error = new Error(previousError.message)
          error.code   = 'E_JSON_PARSE_ERROR'
          error.chain  = { previousError }
          throw error
        }

      case 'multipart/form-data':
        try
        {
          const 
            reducer  = (divider) => (accumulator, row) => { const parts = row.split(divider), key = parts.shift().trim(), value = parts.shift().trim().replace(/['"]+/g, ''); accumulator[key] = value; return accumulator },
            boundary = '--' + secondary.replace('boundary=', '').trim(),
            parsed   = {}
            
          body.split(boundary).slice(1, -1).forEach((segment) => 
          {
            const 
              segments  = segment.split('\r\n\r\n'),
              headers   = segments.shift().trim().split('\r\n').reduce(reducer(':'), {}),
              value     = segments.shift().trim().split('\r\n')

            for (const key in headers) 
            {
              const parts = headers[key].split(';')
              headers[key] = { value: parts.shift(), attribute: parts.reduce(reducer('='), {}) }
            }

            const name = headers['Content-Disposition'].attribute.name 
            parsed[name] = value.length === 1 ? value[0] : value
          })

          return parsed
        }
        catch(previousError)
        {
          const error = new Error(previousError.message)
          error.code   = 'E_FORMDATA_PARSE_ERROR'
          error.chain  = { previousError }
          throw error
        }

      default:
        return querystring.parse(body)
    }
  }
}

module.exports = HttpRequestBuilder
