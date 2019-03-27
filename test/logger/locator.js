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
    const eventbus = this.locator.locate('eventbus')
    return new Logger(eventbus)
  }
}

module.exports = LoggerLocator
