const ComposerValidatorBoolean = require('.')

class ComposerValidatorBooleanLocator
{
  locate()
  {
    return new ComposerValidatorBoolean
  }
}

module.exports = ComposerValidatorBooleanLocator
