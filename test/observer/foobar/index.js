class TestObserverFoobar
{
  constructor(eventbus)
  {
    this.eventbus = eventbus
  }

  observe(event)
  {
    this.eventbus.emit('foobar.received', event.data)
  }
}

module.exports = TestObserverFoobar
