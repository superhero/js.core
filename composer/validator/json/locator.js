const ComposerValidatorJson = require('.')

class ComposerValidatorJsonLocator
{
  locate()
  {
    return new ComposerValidatorJson
  }
}

module.exports = ComposerValidatorJsonLocator
