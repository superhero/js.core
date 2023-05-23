const SchemaBootstrap = require('.')

class SchemaBootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
      configuration = this.locator.locate('core/configuration'),
      path          = this.locator.locate('core/path'),
      console       = this.locator.locate('core/console')

    return new SchemaBootstrap(this.locator, configuration, path, console)
  }
}

module.exports = SchemaBootstrapLocator
