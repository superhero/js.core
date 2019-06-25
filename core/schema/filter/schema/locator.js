const SchemaFilterSchema = require('.')

class SchemaFilterSchemaLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const composer = this.locator.locate('core/schema/composer')
    return new SchemaFilterSchema(composer)
  }
}

module.exports = SchemaFilterSchemaLocator
