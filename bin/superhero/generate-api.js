const
CoreString          = require('../../core/string'),
coreString          = new CoreString,
cwd                 = process.cwd(),
path                = require('path'),
template_test       = require('./file-template/test-integration'),
template_dispatcher = require('./file-template/dispatcher'),
Fs                  = require('./fs')

module.exports = async (cli) =>
{
  cli.write(`Specify the path to where the project is located, or leave blank to use ${cwd}`)
  const use_wd = await cli.question(`Where is the project root located?`) || cwd
  cli.write(` ✔ Excellent\n`, 'green')

  const api_config = require(use_wd + '/src/api/config').http.server.routes

  cli.write(' -------------', 'blue')
  cli.write(' ¡ Finish it !', 'blue')
  cli.write(' -------------', 'blue')

  const fs = new Fs(use_wd, cli)

  for(const endpoint in api_config)
  {
    if('endpoint' in api_config[endpoint])
    {
      const
      endpoint_name       = coreString.composeCamelCase(endpoint),
      fileEndpointPath    = api_config[endpoint].endpoint + '.js',
      fileEndpointPathDir = path.dirname(fileEndpointPath),
      fileEndpointContent = template_dispatcher(endpoint_name)

      fs.mkdir(fileEndpointPathDir)
      fs.writeFile(fileEndpointPath, fileEndpointContent)

      if('input'    in api_config[endpoint]
      && 'output'   in api_config[endpoint]
      && 'example'  in api_config[endpoint])
      {
        const
        fileTestPath    = 'test/integration' + endpoint + '.js',
        fileTestPathDir = path.dirname(fileTestPath),
        fileTestContent = template_test(endpoint)

        fs.mkdir(fileTestPathDir)
        fs.writeFile(fileTestPath, fileTestContent)
      }
      else
      {
        cli.write(`Requirements not met for the endpoint "${endpoint}"`, 'yellow')
      }
    }
    else
    {
      cli.write(`Test generation requires a missing endpoint defintion in route "${endpoint}"`, 'red')
    }
  }

  cli.write(' -------------\n', 'blue')
}
