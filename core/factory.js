const
Core          = require('..'),
Configuration = require('./configuration'),
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

    core.add('core/bootstrap')
    core.add('core/console')
    core.add('core/console/observer/error')
    core.add('core/console/observer/info')
    core.add('core/console/observer/warning')
    core.add('core/eventbus')
    core.add('core/http/request')
    core.add('core/object')
    core.add('core/process')
    core.add('core/schema')
    core.add('core/string')
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

    locator.set('core/deepcopy', deepcopy)
    locator.set('core/deepfreeze', deepfreeze)
    locator.set('core/deepmerge', deepmerge)
    locator.set('core/deepfind', deepfind)
    locator.set('core/path', path)
    locator.set('core/configuration', configuration)

    return locator
  }
}

module.exports = CoreFactory
