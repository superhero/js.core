const
Fs                = require('./fs'),
template_apiDocs  = require('./file-template/api-docs')

module.exports = async (cli) =>
{
  cli.write(`Specify the path to where the project is located, or leave blank to use ${cwd}`)
  const use_wd = await cli.question(`Where is the project root located?`)
  cli.write(` ✔ Excellent\n`, 'green')

  const api_config = require(use_wd + '/src/api/config').http.server.routes

  cli.write(' -------------', 'blue')
  cli.write(' ¡ Finish it !', 'blue')
  cli.write(' -------------', 'blue')

  const
  fs    = new Fs(use_wd, cli),
  docs  = template_apiDocs(use_wd, api_config)

  fs.mkdir('doc/')
  fs.writeFile(fileSchemaPath, docs)

  cli.write(' -------------\n', 'blue')
}
