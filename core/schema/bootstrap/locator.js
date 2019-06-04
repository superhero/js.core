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
    path          = this.locator.locate('core/path')

    return new SchemaBootstrap(this.locator, configuration, path)
  }
}

module.exports = SchemaBootstrapLocator
