const ComposerFilterBoolean = require('.')

class ComposerFilterBooleanLocator
{
  locate()
  {
    return new ComposerFilterBoolean
  }
}

module.exports = ComposerFilterBooleanLocator
