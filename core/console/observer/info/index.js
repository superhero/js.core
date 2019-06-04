class ConsoleObserverInfo
{
  constructor(console)
  {
    this.console = console
  }

  observe(event)
  {
    this.console.info(event.name, event.data)
  }
}

module.exports = ConsoleObserverInfo
