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
    deepclone = this.locator.locate('core/deepclone')

    return new Schema(deepmerge, deepclone)
  }
}

module.exports = SchemaLocator
