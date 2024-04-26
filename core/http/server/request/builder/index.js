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
      let body = []

      stream.on('error', reject)
      stream.on('data',  (data)  => body.push(data))
      stream.on('end',   ()      => this.parseBody(headers['content-type'], Buffer.concat(body)).then(accept).catch(reject))
    })
  }

  async parseBody(contentType, buffer)
  {
    const 
      contentTypeParts  = (contentType || '').split(';'),
      type              = contentTypeParts.shift()

    switch(type)
    {
      case 'text/plain':
      case 'application/jwt':
          return buffer.toString()

      case 'application/json':
        try
        {
          return JSON.parse(buffer.toString() || '{}')
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
            headerReducer = (divider) => (accumulator, row) =>
            {
              const parts = row.split(divider),
                    key   = parts.shift(),
                    value = parts.join(divider).trim().replace(/^['"]+|['"]+$/g, '')

              accumulator[key] = value
              return accumulator
            },
            segmentReducer = (divider) => (accumulator, row) =>
            {
              divider = Buffer.from(divider)

              const parts = splitBuffer(row, divider),
                    key   = parts.shift(),
                    value = joinBuffer(parts, divider)

              accumulator[key] = value
              return accumulator
            },
            splitBuffer = (buffer, delimiter) =>
            {
              const parts = []
              let previous = 0
            
              for (let position = buffer.indexOf(delimiter); position !== -1; position = buffer.indexOf(delimiter, previous)) 
              {
                parts.push(buffer.slice(previous, position))
                previous = position + delimiter.length
              }
            
              parts.push(buffer.slice(previous))
            
              return parts
            },
            joinBuffer = (buffers, delimiter) =>
            {
              if(buffers.length === 0) 
              {
                return Buffer.alloc(0)
              }

              if(buffers.length === 1)
              {
                return buffers[0]
              }

              // Calculate the total length needed for the joined buffer
              const 
                totalLength = buffers.reduce((acc, buf, index) => acc + buf.length + (index < buffers.length - 1 ? delimiter.length : 0), 0),
                result      = Buffer.alloc(totalLength)

              let offset = 0

              buffers.forEach((buf, index) => 
              {
                buf.copy(result, offset)
                offset += buf.length
                if (index < buffers.length - 1) 
                {
                  delimiter.copy(result, offset)
                  offset += delimiter.length
                }
              })

              return result
            },
            boundary  = Buffer.from('--' + contentTypeParts.shift().replace('boundary=', '').trim(), 'utf-8'),
            parsed    = {}

          splitBuffer(buffer, boundary).slice(1, -1).forEach((segment) =>
          {
            const
              segments  = splitBuffer(segment, Buffer.from('\r\n\r\n')),
              headers   = splitBuffer(segments.shift(), Buffer.from('\r\n')).reduce(segmentReducer(':'), {}),
              content   = joinBuffer(splitBuffer(joinBuffer(segments, Buffer.from('\r\n\r\n')), Buffer.from('\r\n')).slice(0, -1), Buffer.from('\r\n'))

            for (const key in headers) 
            {
              const parts = headers[key].toString().split(';').map((part) => part.trim())
              headers[key] = { value: parts.shift(), attribute: parts.reduce(headerReducer('='), {}) }
            }

            const
              disposition = headers['Content-Disposition'].attribute,
              key         = disposition.name,
              isFile      = disposition.filename,
              value       = isFile ? { headers, content } : content.toString()
      
            parsed[key] = parsed[key] ? (Array.isArray(parsed[key]) ? [...parsed[key], value] : [parsed[key], value]) : value
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
        return querystring.parse(buffer.toString())
    }
  }
}

module.exports = HttpRequestBuilder
