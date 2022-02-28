module.exports = async (core) =>
{
  const cli = core.locate('core/cli')

  cli.write(`Specify the path to where the schema configuration file is located`)

  const 
    use_schema_wd = await cli.question(`Where is the schema config located?`),
    schema_config = require(use_schema_wd)

  if(schema_config?.core?.schema?.composer)
  {
    cli.write(` ✔ Excellent\n`, 'green')
  }
  else
  {
    cli.write(`No schemas could be located in the configuration file, expected path: "core.schema.composer"`, 'red')
    return
  }

  const
    configuration   = core.locate('core/configuration'),
    schemaComposer  = core.locate('core/schema/composer'),
    schemaBootstrap = core.locate('core/schema/bootstrap'),
    schemas         = configuration.find('core/schema/composer')

  schemaBootstrap.addSchemas(composer, schemas)

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
    title         = await cli.question(`Specify the title of the API`),
    description   = await cli.question(`Specify a short description of the API`),
    version       = await cli.question(`Specify the API version`),
    contact       = await cli.question(`Specify contact name`),
    contactEmail  = await cli.question(`Specify an email to the contact`),
    servers       = [],
    components    = { schemas:{}, examples:{} },
    loadComponent = (schemaName) =>
    {
      schemaName = schemaName.replace('/', '.')

      cli.write(' ✔ Loading component: ' + schemaName, 'green')

      const 
        properties  = {},
        schema      = schemaComposer.composeSchema(schemaName)

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
            properties[property] = 
            {
              schema  :{ $ref:'#/components/schemas/'   + schema[property].schema.replace('/', '.') },
              example :{ $ref:'#/components/examples/'  + schema[property].schema.replace('/', '.') }
            }
            break
          }
          default:
          {
            properties[property] = { type:'string' }
            break
          }
        }
      }

      components.schema[schemaName]   = properties
      components.examples[schemaName] = schema.composeExample(schemaName)
    }

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

  cli.write(' -------------', 'blue')
  cli.write(' ¡ Finish it !', 'blue')
  cli.write(' -------------', 'blue')

  const swagger = 
  {
    "openapi": "3.0.3",
    "info": 
    {
      "title"       : title,
      "description" : description,
      "version"     : version,
      "contact": 
      {
        "name"  : contact,
        "email" : contactEmail
      }
    },
    "servers"     : servers,
    "components"  : components,
    "paths"       : {}
  }

  for(const route_name in routes_config.core.http.server.routes)
  {
    const route = routes_config.core.http.server.routes[route_name]

    if('endpoint' in route)
    {
      const
        path    = route.url.replace(/(:[a-z]+)/gi, (name) => '{' + name + '}'),
        method  = (route.method || 'get').toLowerCase()
        
      cli.write(' ✔ Loading path: ' + path, 'green')

      loadComponent(route.input)
      loadComponent(route.output)

      swagger.paths[path] = 
      {
        [method]:
        {
          "description" : route.description,
          "requestBody" :
          {
            "content":
            {
              '*/*':
              {
                "schema"  : { $ref:'#/components/schemas/'  + route.input.replace('/', '.') },
                "example" : { $ref:'#/components/examples/' + route.input.replace('/', '.') }
              }
            }
          },
          "responses"   : 
          {
            "200": 
            {
              "description" : "Success",
              "content"     : 
              {
                "application/json": 
                {
                  "schema"  : { $ref:'#/components/schemas/'  + route.output.replace('/', '.') },
                  "example" : { $ref:'#/components/examples/' + route.output.replace('/', '.') }
                }
              }
            }
          }
        }
      }
    }
  }

  cli.write(' -------------\n', 'blue')
  cli.write(JSON.stringify(swagger, null, 2), 'blue')
  cli.write(' -------------\n', 'blue')
}
