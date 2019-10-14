class ConsoleObserverError
{
  constructor(console)
  {
    this.console = console
  }

  observe(event)
  {
    this.console.error(event)
  }
}

module.exports = ConsoleObserverError
