const SchemaNotResolvable = require('./error/schema-not-resolvable')

class ComposerBootstrap
{
  constructor(locator, configuration, path)
  {
    this.locator        = locator
    this.configuration  = configuration
    this.path           = path
  }

  bootstrap()
  {
    const
    composer    = this.locator.locate('composer'),
    schemas     = this.configuration.find('composer.schema'),
    filters     = this.configuration.find('composer.filter'),
    validators  = this.configuration.find('composer.validator')

    this.addSchemasToComposer(composer, schemas)
    this.addFiltersToComposer(composer, filters)
    this.addValidatorsToComposer(composer, validators)
  }

  addSchemasToComposer(composer, schemas)
  {
    if(schemas)
      for(const schemaName in schemas)
        if(this.path.isResolvable(schemas[schemaName]))
        {
          const schema = require(schemas[schemaName])
          composer.addSchema(schemaName, schema)
        }
        else
        {
          const msg = `Could not resolve path for schema: "${schemaName}", path: "${schemas[schemaName]}"`
          throw new SchemaNotResolvable(msg)
        }
  }

  addFiltersToComposer(composer, filters)
  {
    if(filters)
      for(const filterName in filters)
      {
        const filter = this.locator.locate(filters[filterName])
        composer.addFilter(filterName, filter)
      }
  }

  addValidatorsToComposer(composer, validators)
  {
    if(validators)
      for(const validatorName in validators)
      {
        const validator = this.locator.locate(validators[validatorName])
        composer.addValidator(validatorName, validator)
      }
  }
}

module.exports = ComposerBootstrap
