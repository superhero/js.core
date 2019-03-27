const Composer = require('.')

class ComposerLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const deepmerge = this.locator.locate('deepmerge')
    return new Composer(deepmerge)
  }
}

module.exports = ComposerLocator
