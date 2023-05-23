const
  fs                  = require('fs'),
  SchemaNotResolvable = require('./error/schema-not-resolvable')

class SchemaBootstrap
{
  constructor(locator, configuration, path, console)
  {
    this.locator        = locator
    this.configuration  = configuration
    this.path           = path
    this.console        = console
  }

  bootstrap()
  {
    const
      composer    = this.locator.locate('core/schema/composer'),
      schemas     = this.configuration.find('core.schema.composer'),
      filters     = this.configuration.find('core.schema.filter'),
      validators  = this.configuration.find('core.schema.validator')

    this.addSchemas(composer, schemas)
    this.addFilters(composer, filters)
    this.addValidators(composer, validators)
  }

  addSchemas(composer, schemas)
  {
    this.console.color('green').log(`Schemas`)
    this.console.color('green').log(``)

    for(const schemaName in schemas || [])
    {
      if(schemaName.endsWith('/*'))
      {
        const
        directoryPath = schemas[schemaName].slice(0, -1),
        dirents       = fs.readdirSync(directoryPath, { withFileTypes:true })

        for(const dirent of dirents)
        {
          if(dirent.isFile()
          && dirent.name.endsWith('.js'))
          {
            const
            schemaNamePath    = schemaName.slice(0, -1),
            filename          = dirent.name.slice(0, -3),
            schemaFilepath    = directoryPath   + filename,
            schemaNameMapped  = schemaNamePath  + filename,
            schema            = require(schemaFilepath)

            composer.addSchema(schemaNameMapped, schema)
            this.console.color('green').log(`✔ ${schemaNameMapped}`)
          }
        }
      }
      else
      {
        if(this.path.isResolvable(schemas[schemaName]))
        {
          const schema = require(schemas[schemaName])
          composer.addSchema(schemaName, schema)
          this.console.color('green').log(`✔ ${schemaName}`)
        }
        else
        {
          const msg = `Could not resolve path for schema: "${schemaName}", path: "${schemas[schemaName]}"`
          throw new SchemaNotResolvable(msg)
        }
      }
    }

    this.console.log(``)
  }

  addFilters(composer, filters)
  {
    for(const filterName in filters || [])
    {
      const filter = this.locator.locate(filters[filterName])
      composer.addFilter(filterName, filter)
    }
  }

  addValidators(composer, validators)
  {
    for(const validatorName in validators || [])
    {
      const validator = this.locator.locate(validators[validatorName])
      composer.addValidator(validatorName, validator)
    }
  }
}

module.exports = SchemaBootstrap
