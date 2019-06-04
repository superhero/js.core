const SchemaNotResolvable = require('./error/schema-not-resolvable')

class SchemaBootstrap
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
    schema      = this.locator.locate('core/schema'),
    schemas     = this.configuration.find('core.schema.schema'),
    filters     = this.configuration.find('core.schema.filter'),
    validators  = this.configuration.find('core.schema.validator')

    this.addSchemas(schema, schemas)
    this.addFilters(schema, filters)
    this.addValidators(schema, validators)
  }

  addSchemas(schema, schemas)
  {
    if(schemas)
      for(const schemaName in schemas)
        if(this.path.isResolvable(schemas[schemaName]))
        {
          const schemaDefinition = require(schemas[schemaName])
          schema.addSchema(schemaName, schemaDefinition)
        }
        else
        {
          const msg = `Could not resolve path for schema: "${schemaName}", path: "${schemas[schemaName]}"`
          throw new SchemaNotResolvable(msg)
        }
  }

  addFilters(schema, filters)
  {
    if(filters)
      for(const filterName in filters)
      {
        const filter = this.locator.locate(filters[filterName])
        schema.addFilter(filterName, filter)
      }
  }

  addValidators(schema, validators)
  {
    if(validators)
      for(const validatorName in validators)
      {
        const validator = this.locator.locate(validators[validatorName])
        schema.addValidator(validatorName, validator)
      }
  }
}

module.exports = SchemaBootstrap
