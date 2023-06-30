module.exports = async (core) =>
{
  const cli = core.locate('core/cli')

  cli.write(`Specify the path to where the schema configuration file is located`)

  const schema_config = await (async function schemaConfig()
  {
    const
      use_schema_wd = await cli.question(`Where is the schema config located?`),
      config        = require(use_schema_wd)
  
    if(config?.core?.schema?.composer)
    {
      cli.write(` ✔ Excellent\n`, 'green')
      const again = await cli.question(`Extend the schema config with another?`, ['yes', 'no'])
      if(again === 'yes')
      {
        const extension = await schemaConfig()
        return core.locate('core/deepmerge').merge({ ...config }, { ...extension })
      }
      else
      {
        return config
      }
    }
    else
    {
      cli.write(`No schemas could be located in the configuration file, expected path: "core.schema.composer"`, 'red')
      return await schemaConfig()
    }
  })()

  const
    schemaComposer  = core.locate('core/schema/composer'),
    schemaBootstrap = core.locate('core/schema/bootstrap'),
    schemas         = schema_config?.core?.schema?.composer

  schemaBootstrap.addSchemas(schemaComposer, schemas)

  // ...

  cli.write(`Specify the path to where the routes configuration file is located`)

  const
    use_routes_wd = await cli.question(`Where is the routes config located?`),
    routes_config = require(use_routes_wd)

  if(routes_config?.core?.http?.server?.routes)
  {
    cli.write(` ✔ Excellent\n`, 'green')
  }
  else
  {
    cli.write(`No routes could be located in the configuration file, expected path: "core.http.server.routes"`, 'red')
    return
  }

  // ...

  cli.write(`Specify API attributes that will be used in the swagger file...`)

  const
    components    = { schemas:{}, examples:{} },
    loadComponent = (schemaName) =>
    {
      if(!schemaName)
      {
        return
      }

      cli.write(' ✔ Loading component: ' + schemaName, 'green')

      schemaName = schemaName.replaceAll('.', '/')

      const
        properties  = {},
        schema      = schemaName ? schemaComposer.composeSchema(schemaName) : {},
        required    = []

      for(const property in schema)
      {
        switch(schema[property].type)
        {
          case 'decimal':
          {
            properties[property] = { type:'number' }
            break
          }
          case 'integer':
          case 'string':
          case 'boolean':
          {
            properties[property] = { type:schema[property].type }
            break
          }
          case 'json':
          {
            properties[property] = { type:'object' }
            break
          }
          case 'schema':
          {
            loadComponent(schema[property].schema)

            if(schema[property].collection)
            {
              properties[property] =
              {
                type        : 'array',
                description : schema[property].description || '',
                items       : { $ref : '#/components/schemas/' + schema[property].schema.replaceAll('/', '.') }
              }
            }
            else
            {
              properties[property] = { $ref: '#/components/schemas/' + schema[property].schema.replaceAll('/', '.') }
              continue
            }
            break
          }
          default:
          {
            properties[property] = { type:'string' }
            break
          }
        }
        switch(schema[property].type)
        {
          case 'decimal':
          case 'integer':
          {
            if(schema[property].min)
            {
              properties[property].minimum = schema[property].min
            }
            if(schema[property].max)
            {
              properties[property].maximum = schema[property].max
            }
            break
          }
        }
        if(schema[property].collection)
        {
          if(schema[property].min)
          {
            properties[property].minItems = schema[property].min
          }
          if(schema[property].max)
          {
            properties[property].maxItems = schema[property].max
          }
        }
        if(schema[property].description)
        {
          properties[property].description = schema[property].description
        }
        if(schema[property].example)
        {
          switch(schema[property].type)
          {
            case 'decimal':
            {
              properties[property].example = parseFloat(schema[property].example)
              break
            }
            case 'integer':
            {
              properties[property].example = parseInt(schema[property].example)
              break
            }
            case 'boolean':
            {
              properties[property].example = schema[property].example === 'false' ? false : !!schema[property].example
              break
            }
          }
        }
        if(!schema[property].optional)
        {
          required.push(property)
        }
        if(schema[property].nullable)
        {
          properties[property].nullable = true
        }
        if(Array.isArray(schema[property].enum))
        {
          properties[property].enum = schema[property].enum.map((value) => 
          {
            switch(schema[property].type)
            {
              case 'decimal': return parseFloat(value)
              case 'integer': return parseInt(value)
              case 'boolean': return value === 'false' ? false : !!value
              default: return value
            }
          })
        }
      }

      const newSchemaName = schemaName.replaceAll('/', '.')

      components.schemas[newSchemaName] = { 'type':'object', properties }
      if(required.length)
      {
        components.schemas[newSchemaName].required = required
      }
      components.examples[newSchemaName] =
      {
        'summary' : newSchemaName.replaceAll('.', ' '),
        'value'   : schemaComposer.composeExample(schemaName)
      }
    }

  cli.write(' -------------', 'blue')
  cli.write(' ¡ Finish it !', 'blue')
  cli.write(' -------------', 'blue')

  const 
    paths   = {}

  for(const route_name in routes_config.core.http.server.routes)
  {
    const route = routes_config.core.http.server.routes[route_name]

    if('endpoint' in route)
    {
      const
        path        = route.url.replace(/:([a-z]+)/gi, '{$1}'),
        method      = (route.method || 'get').toLowerCase(),
        matches     = route.url.match(/:([a-z0-9]+)/gi),
        parameters  = (matches || []).map(match => match.slice(1))
        
      cli.write(' ✔ Loading path: ' + path, 'green')

      route.input   && loadComponent(route.input)
      route.output  && loadComponent(route.output)

      paths[path] =
      {
        ...paths[path],

        [method]:
        {
          'responses':
          {
            '200':
            {
              'description' : 'Success'
            }
          }
        }
      }

      if(route.output)
      {
        paths[path][method].responses['200'].content =
        {
          'application/json': 
          {
            'schema'  : { $ref:'#/components/schemas/'  + route.output.replaceAll('/', '.') },
            'example' : { $ref:'#/components/examples/' + route.output.replaceAll('/', '.') }
          }
        }
      }

      if(route.description)
      {
        paths[path][method].description = route.description
      }

      if(method !== 'get' 
      && method !== 'delete' 
      && route.input)
      {
        paths[path][method].requestBody =
        {
          'content':
          {
            'application/json':
            {
              'schema'  : { $ref:'#/components/schemas/'  + route.input.replaceAll('/', '.') },
              'example' : { $ref:'#/components/examples/' + route.input.replaceAll('/', '.') }
            }
          }
        }
      }

      if(parameters.length)
      {
        paths[path][method].parameters = parameters.map((name) => 
        ({
          name, 
          in        : 'path', 
          required  : true, 
          schema    : { type:'string' }
        }))
      }

      cli.write('', 'green')
    }
  }

  const servers = []

  do
  {
    const addAServer = await cli.question(`Add a server?`, ['yes', 'no'])
    if(addAServer === 'no') break
    servers.push(
    {
      url         : await cli.question(`Specify server url`),
      description : await cli.question(`Specify server description`)
    })
  }
  while(true)

  const 
    title         = await cli.question(`Specify the title of the API`),
    description   = await cli.question(`Specify a short description of the API`),
    version       = await cli.question(`Specify the API version`),
    contact       = await cli.question(`Specify contact name`),
    contactEmail  = await cli.question(`Specify an email to the contact`),
    swagger       = 
    {
      'openapi': '3.0.3',
      'info': 
      {
        'title'       : title,
        'description' : description,
        'version'     : version,
        'contact': 
        {
          'name'  : contact,
          'email' : contactEmail
        }
      },
      'servers'     : servers,
      'components'  : components,
      'paths'       : paths
    }

  cli.write(JSON.stringify(swagger, null, 2), 'blue')
}
