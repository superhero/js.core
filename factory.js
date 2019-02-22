const
Configuration = require('./configuration'),
Core          = require('.'),
Deepcopy      = require('./deepcopy'),
Deepfreeze    = require('./deepfreeze'),
Deepmerge     = require('./deepmerge'),
Locator       = require('./locator'),
Path          = require('./path')

class CoreFactory
{
  create()
  {
    const locator = this.createLocator()
    return new Core(locator)
  }

  createLocator()
  {
    const
    locator       = new Locator,
    deepcopy      = new Deepcopy,
    deepfreeze    = new Deepfreeze,
    deepmerge     = new Deepmerge,
    path          = new Path,
    configuration = new Configuration(deepcopy, deepmerge)

    locator.set('configuration', configuration)
    locator.set('deepcopy', deepcopy)
    locator.set('deepfreeze', deepfreeze)
    locator.set('deepmerge', deepmerge)
    locator.set('path', path)

    return locator
  }
}

module.exports = CoreFactory
