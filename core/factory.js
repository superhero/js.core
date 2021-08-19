const
Core          = require('..'),
Configuration = require('./configuration'),
Deepclone     = require('./deepclone'),
Deepfind      = require('./deepfind'),
Deepfreeze    = require('./deepfreeze'),
Deepmerge     = require('./deepmerge'),
Locator       = require('./locator'),
Path          = require('./path')

class CoreFactory
{
  create(branch)
  {
    const
    locator = this.createLocator(),
    core    = new Core(locator, branch)

    core.add('core/bootstrap')
    core.add('core/cli')
    core.add('core/console')
    core.add('core/console/observer/error')
    core.add('core/console/observer/info')
    core.add('core/console/observer/warning')
    core.add('core/crypto')
    core.add('core/eventbus')
    core.add('core/http/request')
    core.add('core/http/server')
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
    deepclone     = new Deepclone,
    deepfreeze    = new Deepfreeze,
    deepmerge     = new Deepmerge,
    deepfind      = new Deepfind,
    path          = new Path,
    configuration = new Configuration(deepclone, deepmerge, deepfind, deepfreeze)

    locator.set('core/deepclone', deepclone)
    locator.set('core/deepfind', deepfind)
    locator.set('core/deepfreeze', deepfreeze)
    locator.set('core/deepmerge', deepmerge)
    locator.set('core/path', path)
    locator.set('core/configuration', configuration)

    return locator
  }
}

module.exports = CoreFactory
