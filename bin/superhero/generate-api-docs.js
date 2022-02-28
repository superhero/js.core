const
Fs                = require('./fs'),
cwd               = process.cwd(),
template_apiDocs  = require('./file-template/api-docs')

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

  const
  fs      = new Fs(use_wd, cli),
  schemas = require(use_wd + '/src/domain/config').core.schema.composer,
  docs    = template_apiDocs(use_wd, routes, schemas)

  fs.mkdir('doc/')
  fs.writeFile('doc/api-documentation.html', docs)

  cli.write(' -------------\n', 'blue')
}
