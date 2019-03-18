const
Calculator          = require('.'),
LocatorConstituent  = require('../../locator/constituent')

/**
 * @extends {@superhero/core/locator/constituent}
 */
class CalculatorLocator extends LocatorConstituent
{
  /**
   * @returns {Calculator}
   */
  locate()
  {
    const eventbus = this.locator.locate('eventbus')
    return new Calculator(eventbus)
  }
}

module.exports = CalculatorLocator
