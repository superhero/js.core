const
ObserverCalculationAppendedLog  = require('.'),
LocatorConstituent              = require('../../../../../core/locator/constituent')

/**
 * @memberof Api
 * @extends {superhero/core/locator/constituent}
 */
class ObserverCalculationAppendedLogLocator extends LocatorConstituent
{
  /**
   * @returns {ObserverCalculationAppendedLog}
   */
  locate()
  {
    const
    console  = this.locator.locate('core/console'),
    eventbus = this.locator.locate('core/eventbus')

    return new ObserverCalculationAppendedLog(console, eventbus)
  }
}

module.exports = ObserverCalculationAppendedLogLocator
