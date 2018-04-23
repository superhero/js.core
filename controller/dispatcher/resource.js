const
Dispatcher  = require('@superhero/core/controller/dispatcher'),
fs          = require('fs'),
path        = require('path'),
readFile    = require('util').promisify(fs.readFile),
base        = path.dirname(require.main.filename),
cached      = {}

let
cache   = false,
origin  = '/public'

module.exports = class extends Dispatcher
{
  static set origin (_origin) { origin  = path.normalize('/' + _origin) }
  static set cache  (_cache)  { cache   = !!_cache }

  static get origin() { return origin }
  static get cache()  { return cache  }

  async dispatch()
  {
    try
    {
      const
      CT        = 'Content-Type',
      headers   = {},
      resource  = base + origin + path.normalize(this.request.url.pathname),
      extension = path.extname(resource).toLowerCase(),
      source    = resource in cached
                  ? cached[resource]
                  : cached[resource] = await readFile(resource, 'utf-8')

      switch(extension)
      {
        case '.jpg'   :
        case '.jpeg'  : headers[CT] = 'image/jpeg'  break
        case '.gif'   : headers[CT] = 'image/gif'   break
        case '.png'   : headers[CT] = 'image/png'   break
        case '.css'   : headers[CT] = 'text/css'    break
        case '.csv'   : headers[CT] = 'text/csv'    break
        case '.pdf'   : headers[CT] = 'application/pdf'           break
        case '.json'  : headers[CT] = 'application/json'          break
        case '.ico'   : headers[CT] = 'image/vnd.microsoft.icon'  break
        case '.js'    : headers[CT] = 'application/javascript'    break
      }

      return { headers, body : source }
    }
    catch(error)
    {
      return { status : 404,
               body   : 'Not Found' }
    }
  }
}
