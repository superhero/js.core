const
Logger              = require('.'),
LocatorConstituent  = require('../../locator/constituent')

/**
 * @extends {@superhero/core/locator/constituent}
 */
class LoggerLocator extends LocatorConstituent
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
