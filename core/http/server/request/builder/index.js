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
              content   = joinBuffer(segments, Buffer.from('\r\n\r\n'))

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

          /*
          // Convert the boundary into a Buffer
          const boundaryBuffer = Buffer.from('--' + secondary.replace('boundary=', '').trim(), 'utf-8');
          // const parts = [];
          const parsed = {};
          let position = 0;

          while (position < buffer.length) {
            const boundaryPosition = buffer.indexOf(boundaryBuffer, position);
            if (boundaryPosition < 0) {
              break; // No more boundaries found
            }
            const endBoundaryPosition = buffer.indexOf(boundaryBuffer, boundaryPosition + boundaryBuffer.length);
            if (endBoundaryPosition < 0) {
              break; // No ending boundary found, possibly malformed data
            }

            // Extract the part between boundaries
            const partBuffer = buffer.slice(boundaryPosition + boundaryBuffer.length, endBoundaryPosition);

            // Here, partBuffer contains the headers and content for this part
            // Split headers and content. Note: headers and content are separated by two CRLF (\r\n\r\n)
            const doubleCRLF = Buffer.from('\r\n\r\n', 'utf-8');
            const headerEndPosition = partBuffer.indexOf(doubleCRLF);

            if (headerEndPosition > 0) {
              const headersPart = partBuffer.slice(0, headerEndPosition).toString('utf-8'); // Convert headers to string for parsing
              const contentPart = partBuffer.slice(headerEndPosition + doubleCRLF.length); // Keep content as Buffer

              // Simple parsing for Content-Disposition header to extract name
              const nameMatch = headersPart.match(/name="([^"]+)"/);
              const filenameMatch = headersPart.match(/filename="([^"]+)"/);
              const contentTypeMatch = headersPart.match(/Content-Type: ([^\r\n]+)/);

              const part = {
                headers: headersPart,
                content: contentPart, // Content kept as Buffer for binary safety
                name: nameMatch ? nameMatch[1] : null,
                filename: filenameMatch ? filenameMatch[1] : null,
                contentType: contentTypeMatch ? contentTypeMatch[1] : null,
              };

              // parts.push(part);

              parsed[part.name] = parsed[part.name] ? (Array.isArray(parsed[part.name]) ? [...parsed[part.name], part] : [parsed[part.name], part]) : part
            }

            // Move position past this part for the next iteration
            position = endBoundaryPosition + boundaryBuffer.length;
          }
    
          return parsed;

          */
          /*
          const 
            reducer  = (divider) => (accumulator, row) => 
            { 
              const parts = row.split(divider), 
                    key   = parts.shift().trim(), 
                    value = parts.join(divider).trim().replace(/^['"]+|['"]+$/g, '')
      
              accumulator[key] = value
              return accumulator
            },
            boundary = '--' + secondary.replace('boundary=', '').trim(),
            parsed   = {}
      
          body.split(boundary).slice(1, -1).forEach((segment) => 
          {
            const 
              segments  = segment.split('\r\n\r\n'),
              headers   = segments.shift().trim().split('\r\n').reduce(reducer(':'), {}),
              content   = segments.join('\r\n\r\n').trim() // Preserving binary data as a string, for now
      
            for (const key in headers) 
            {
              const parts = headers[key].split(';').map(part => part.trim())
              headers[key] = { value: parts.shift(), attribute: parts.reduce(reducer('='), {}) }
            }
      
            const
              disposition = headers['Content-Disposition'].attribute,
              key         = disposition.name,
              isFile      = disposition.filename,
              value       = isFile ? { headers, content } : content // Convert to buffer for files
      
            parsed[key] = parsed[key] ? (Array.isArray(parsed[key]) ? [...parsed[key], value] : [parsed[key], value]) : value
          })
      
          return parsed;
          /*

          // old version of code

          /*
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
          */
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
