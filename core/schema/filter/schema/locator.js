const SchemaFilterSchema = require('.')

class SchemaFilterSchemaLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const schema = this.locator.locate('core/schema/composer')
    return new SchemaFilterSchema(schema)
  }
}

module.exports = SchemaFilterSchemaLocator
