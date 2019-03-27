const ComposerFilterSchema = require('.')

class ComposerFilterSchemaLocator
{
  locate()
  {
    const composer = this.locator.locate('composer')
    return new ComposerFilterSchema(composer)
  }
}

module.exports = ComposerFilterSchemaLocator
