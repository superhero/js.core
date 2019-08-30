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
    deepmerge   = this.locator.locate('core/deepmerge'),
    deepclone   = this.locator.locate('core/deepclone'),
    deepfreeze  = this.locator.locate('core/deepfreeze')

    return new Schema(deepmerge, deepclone, deepfreeze)
  }
}

module.exports = SchemaLocator
