const Composer = require('.')

class ComposerLocator
{
  locate()
  {
    return new Composer
  }
}

module.exports = ComposerLocator
