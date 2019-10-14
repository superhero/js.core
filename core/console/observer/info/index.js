class ConsoleObserverInfo
{
  constructor(console)
  {
    this.console = console
  }

  observe(event)
  {
    this.console.info(event)
  }
}

module.exports = ConsoleObserverInfo
