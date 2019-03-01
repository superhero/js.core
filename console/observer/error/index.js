class ConsoleObserverError
{
  constructor(console)
  {
    this.console = console
  }

  observe(event)
  {
    this.console.error(event.name, event.data)
  }
}

module.exports = ConsoleObserverError
