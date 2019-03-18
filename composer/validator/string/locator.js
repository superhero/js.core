const ComposerValidatorString = require('.')

class ComposerValidatorStringLocator
{
  locate()
  {
    return new ComposerValidatorString
  }
}

module.exports = ComposerValidatorStringLocator
