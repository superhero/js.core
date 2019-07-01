const
Fs              = require('./fs'),
path            = require('path'),
cwd             = process.cwd(),
CoreString      = require('../../core/string'),
coreString      = new CoreString,
template_schema = require('./file-template/schema')

module.exports = async (cli) =>
{
  cli.write(`Specify the path to where the project is located, or leave blank to use ${cwd}`)
  const use_wd = await cli.question(`Where is the project root located?`)
  cli.write(` ✔ Excellent\n`, 'green')

  const domain_config = require(use_wd + '/src/domain/config').schema.composer

  const fs = new Fs('', cli)

  cli.write(' -------------', 'blue')
  cli.write(' ¡ Finish it !', 'blue')
  cli.write(' -------------', 'blue')

  for(const schema in domain_config)
  {
    let schema_name
    schema_name = coreString.composeCamelCase(schema)
    schema_name = composeFirstUpperCase(schema)

    const
    fileSchemaPath    = domain_config[schema] + '.js',
    fileSchemaPathDir = path.dirname(fileSchemaPath),
    fileSchemaContent = template_schema(schema_name)

    fs.mkdir(fileSchemaPathDir)
    fs.writeFile(fileSchemaPath, fileSchemaContent)
  }

  cli.write(' -------------\n', 'blue')
}
