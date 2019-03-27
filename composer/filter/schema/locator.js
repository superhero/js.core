const ComposerFilterSchema = require('.')

class ComposerFilterSchemaLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const composer = this.locator.locate('composer')
    return new ComposerFilterSchema(composer)
  }
}

module.exports = ComposerFilterSchemaLocator
