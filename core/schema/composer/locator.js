const Schema = require('.')

class SchemaLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    deepmerge = this.locator.locate('core/deepmerge'),
    deepcopy  = this.locator.locate('core/deepcopy')

    return new Schema(deepmerge, deepcopy)
  }
}

module.exports = SchemaLocator
