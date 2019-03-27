const ComposerValidatorSchema = require('.')

class ComposerValidatorSchemaLocator
{
  locate()
  {
    return new ComposerValidatorSchema
  }
}

module.exports = ComposerValidatorSchemaLocator
