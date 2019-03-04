const
Logger            = require('.'),
LocatorComposite  = require('../../locator/composite')

/**
 * @extends {@superhero/core/locator/composite}
 */
class LoggerLocator extends LocatorComposite
{
  /**
   * @returns {Logger}
   */
  locate()
  {
    const
    console   = this.locator.locate('console'),
    eventbus  = this.locator.locate('eventbus')

    return new Logger(console, eventbus)
  }
}

module.exports = LoggerLocator
