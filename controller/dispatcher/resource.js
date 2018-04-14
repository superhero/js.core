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
      headers   = {},
      resource  = base + origin + path.normalize(this.request.url.pathname),
      extension = path.extname(resource).toLowerCase(),
      source    = resource in cached
                ? cached[resource]
                : cached[resource] = await readFile(resource, 'utf-8')

      switch(extension)
      {
        case 'js'   : headers['Content-Type'] = 'application/javascript' break
        case 'css'  : headers['Content-Type'] = 'text/css'    break
        case 'jpg'  :
        case 'jpeg' : headers['Content-Type'] = 'image/jpeg'  break
        case 'gif'  : headers['Content-Type'] = 'image/gif'   break
        case 'png'  : headers['Content-Type'] = 'image/png'   break
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
