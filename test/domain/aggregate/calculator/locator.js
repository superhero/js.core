const
AggregateCalculator = require('.'),
LocatorConstituent  = require('../../../../core/locator/constituent')

/**
 * @memberof Domain
 * @extends {superhero/core/locator/constituent}
 */
class AggregateCalculatorLocator extends LocatorConstituent
{
  /**
   * @returns {AggregateCalculator}
   */
  locate()
  {
    const eventbus = this.locator.locate('core/eventbus')
    return new AggregateCalculator(eventbus)
  }
}

module.exports = AggregateCalculatorLocator
