const
Fs              = require('./fs'),
path            = require('path'),
cwd             = process.cwd(),
CoreString      = require('../../core/string'),
coreString      = new CoreString,
template_schema = require('./file-template/schema')

module.exports = async (core) =>
{
  const cli = core.locate('core/cli')

  cli.write(`Specify the path to where the project is located, or leave blank to use ${cwd}`)
  const use_wd = await cli.question(`Where is the project root located?`) || cwd
  cli.write(` ✔ Excellent\n`, 'green')

  const domain_config = require(use_wd + '/src/domain/config')

  if(!domain_config
  || !domain_config.core
  || !domain_config.core.schema
  || !domain_config.core.schema.composer)
  {
    cli.write(`No schemas could be located for the composer in the domain configuration file, expected path: "core.schema.composer"`, 'red')
    return
  }

  const
  schemas = domain_config.core.schema.composer,
  fs      = new Fs('', cli)

  cli.write(' -------------', 'blue')
  cli.write(' ¡ Finish it !', 'blue')
  cli.write(' -------------', 'blue')

  for(const schema in schemas)
  {
    let schema_name
    schema_name = coreString.composeCamelCase(schema)
    schema_name = coreString.composeFirstUpperCase(schema_name)

    const
    fileSchemaPath    = schemas[schema] + '.js',
    fileSchemaPathDir = path.dirname(fileSchemaPath),
    fileSchemaContent = template_schema(schema_name)

    fs.mkdir(fileSchemaPathDir)
    fs.writeFile(fileSchemaPath, fileSchemaContent)
  }

  cli.write(' -------------\n', 'blue')
}
