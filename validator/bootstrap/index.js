const SchemaNotResolvable = require('./error/schema-not-resolvable')

class ValidatorBootstrap
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
    validator     = this.locator.locate('validator'),
    schemas       = this.configuration.find('validator.schemas'),
    constituents  = this.configuration.find('validator.constituents')

    this.addSchemasToValidator(validator, schemas)
    this.addConstituentsToValidator(validator, constituents)
  }

  addSchemasToValidator(validator, schemas)
  {
    if(schemas)
      for(const schemaName in schemas)
        if(path.isResolvable(schemas[schemaName]))
        {
          const schema = require(schemas[schemaName])
          validator.addSchema(schemaName, schema)
        }
        else
        {
          const msg = `Could not resolve path for schema: "${schemaName}", path: "${schemas[schemaName]}"`
          throw new SchemaNotResolvable(msg)
        }
  }

  addConstituentsToValidator(validator, constituents)
  {
    if(constituents)
      for(const constituentName in constituents)
      {
        const constituent = this.locator.locate(validators[constituentName])
        validator.addValidator(constituentName, constituent)
      }
  }
}

module.exports = ValidatorBootstrap
