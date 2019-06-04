const Schema = require('.')

class SchemaLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const deepmerge = this.locator.locate('core/deepmerge')
    return new Schema(deepmerge)
  }
}

module.exports = SchemaLocator
