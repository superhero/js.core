const ComposerValidatorInteger = require('.')

class ComposerValidatorIntegerLocator
{
  locate()
  {
    return new ComposerValidatorInteger
  }
}

module.exports = ComposerValidatorIntegerLocator
