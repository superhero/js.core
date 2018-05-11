const log = require('@superhero/debug').log

module.exports =
{
  http : function(routes, options)
  {
    const
    Http    = require('./controller/server/http'),
    Router  = require('./controller/server/router'),
    router  = new Router(routes),
    http    = new Http(router, options),
    server  = http.createServer()

    return server
  },

  https : function(routes, options)
  {
    const
    Https   = require('./controller/server/https'),
    Router  = require('./controller/server/router'),
    router  = new Router(routes),
    https   = new Https(router, options),
    server  = https.createServer(options)

    return server
  },

  ws : function(routes, options = {})
  {
    const
    Websocket = require('./controller/server/ws'),
    Router    = require('./controller/server/router'),
    router    = new Router(routes),
    websocket = new Websocket(router, options.debug),
    server    = websocket.createServer(options)

    return server
  },

  // @todo: clean up this mess...
  bootstrap : async function(config)
  {
    if('template' in config)
    {
      log(`Bootstrap the template`)
      const Template = require('./view/template')

      if('helpers' in config.template)
      {
        log(`Adding helpers`)
        if(Array.isArray(config.template.helpers))
        {
          log(`Adding helpers by Array`)
          for(const name of config.template.helpers)
          {
            log(`Adding helper:"${name}"`)
            await Template.addHelper(name)
          }
        }

        else if(typeof config.template.helpers === 'object')
        {
          log(`Adding helpers by object`)
          for(const name in config.template.helpers)
          {
            const filepath = config.template.helpers[name]

            // if true, then assume attempting to add a core library helper
            if(filepath === true)
            {
              log(`Adding helper:"${name}"`)
              await Template.addHelper(name)
            }
            else if(filepath)
            {
              log(`Adding custom helper:"${name}" from:"${filepath}"`)
              await Template.addHelper(name, filepath)
            }
            else
            {
              log(`Ignoring helper:"${name}"`)
            }
          }
        }

        else
        {
          const
          type  = typeof config.template.helpers,
          msg   = `Invalid format for "config.template.helpers". `
                + `Expected "object" or "Array", found:"${type}"`
          error = new TypeError(msg)
          throw error
        }
      }

      if('partials' in config.template)
      {
        log(`Adding partials`)
        for(let partial in config.template.partials)
        {
          log(`Adding partial:"${partial}"`)
          await Template.addPartial(partial, config.template.partials[partial])
        }
      }
    }

    if('resource' in config)
    {
      log(`Bootstrap the resource dispatcher`)
      const Resource = require('./controller/resource')

      for(key in config.resource)
        switch(key)
        {
          case 'origin' :
            log(`Resource['${key}'] = "${config.resource[key]}"`)
            Resource[key] = config.resource[key]
            break

          default:
            log(`Ignoring to set invalid key:"Resource['${key}']"`)
        }
    }

    return this
  },
}
