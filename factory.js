const
Configuration = require('./configuration'),
Core          = require('.'),
Deepcopy      = require('./deepcopy'),
Deepfind      = require('./deepfind'),
Deepfreeze    = require('./deepfreeze'),
Deepmerge     = require('./deepmerge'),
Locator       = require('./locator'),
Path          = require('./path')

class CoreFactory
{
  create()
  {
    const
    locator = this.createLocator(),
    core    = new Core(locator)

    core.add('bootstrap')
    core.add('console')
    core.add('console/observer/error')
    core.add('console/observer/info')
    core.add('console/observer/warning')
    core.add('eventbus')
    core.add('eventbus/bootstrap')
    core.add('http/request')
    core.add('process')
    core.add('process/bootstrap')
    core.add('core')

    return core
  }

  createLocator()
  {
    const
    locator       = new Locator,
    deepcopy      = new Deepcopy,
    deepfreeze    = new Deepfreeze,
    deepmerge     = new Deepmerge,
    deepfind      = new Deepfind,
    path          = new Path,
    configuration = new Configuration(deepcopy, deepmerge, deepfind)

    locator.set('deepcopy', deepcopy)
    locator.set('deepfreeze', deepfreeze)
    locator.set('deepmerge', deepmerge)
    locator.set('deepfind', deepfind)
    locator.set('path', path)
    locator.set('configuration', configuration)

    return locator
  }
}

module.exports = CoreFactory
