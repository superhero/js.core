const
ObserverCalculationCreatedLog = require('.'),
LocatorConstituent            = require('../../../../../core/locator/constituent')

/**
 * @memberof Api
 * @extends {superhero/core/locator/constituent}
 */
class ObserverCalculationCreatedLogLocator extends LocatorConstituent
{
  /**
   * @returns {ObserverCalculationCreatedLog}
   */
  locate()
  {
    const
    console  = this.locator.locate('core/console'),
    eventbus = this.locator.locate('core/eventbus')

    return new ObserverCalculationCreatedLog(console, eventbus)
  }
}

module.exports = ObserverCalculationCreatedLogLocator
