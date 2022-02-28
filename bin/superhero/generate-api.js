const
CoreString          = require('../../core/string'),
coreString          = new CoreString,
cwd                 = process.cwd(),
path                = require('path'),
template_test       = require('./file-template/test-endpoint'),
template_dispatcher = require('./file-template/dispatcher'),
Fs                  = require('./fs')

module.exports = async (core) =>
{
  const cli = core.locate('core/cli')

  cli.write(`Specify the path to where the project is located, or leave blank to use ${cwd}`)
  const use_wd = await cli.question(`Where is the project root located?`) || cwd
  cli.write(` ✔ Excellent\n`, 'green')

  const api_config = require(use_wd + '/src/api/config')

  if(!api_config
  || !api_config.core
  || !api_config.core.http
  || !api_config.core.http.server
  || !api_config.core.http.server.routes)
  {
    cli.write(`No routes could be located in the API configuration file, expected path: "core.http.server.routes"`, 'red')
    return
  }

  const routes = api_config.core.http.server.routes

  cli.write(' -------------', 'blue')
  cli.write(' ¡ Finish it !', 'blue')
  cli.write(' -------------', 'blue')

  const fs = new Fs(use_wd, cli)

  for(const endpoint in routes)
  {
    if('endpoint' in routes[endpoint])
    {
      const
      endpoint_name       = coreString.composeCamelCase(endpoint),
      fileEndpointPath    = 'src/' + routes[endpoint].endpoint + '.js',
      fileEndpointPathDir = path.dirname(fileEndpointPath),
      fileEndpointContent = template_dispatcher(endpoint_name)

      fs.mkdir(fileEndpointPathDir)
      fs.writeFile(fileEndpointPath, fileEndpointContent)

      const
      fileTestPath    = 'test/endpoint/' + endpoint + '.test.js',
      fileTestPathDir = path.dirname(fileTestPath),
      fileTestContent = template_test(endpoint)

      fs.mkdir(fileTestPathDir)
      fs.writeFile(fileTestPath, fileTestContent)
    }
    else
    {
      cli.write(` Test generation requires a missing endpoint defintion in route "${endpoint}"`, 'red')
    }
  }

  cli.write(' -------------\n', 'blue')
}
