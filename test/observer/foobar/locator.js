const TestObserverFoobar = require('.')

class TestObserverFoobarLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const eventbus = this.locator.locate('eventbus')
    return new TestObserverFoobar(eventbus)
  }
}

module.exports = TestObserverFoobarLocator
