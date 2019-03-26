const Composer = require('.')

class ComposerLocator
{
  locate()
  {
    const deepmerge = this.locator.locate('deepmerge')
    return new Composer(deepmerge)
  }
}

module.exports = ComposerLocator
