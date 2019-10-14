class ConsoleObserverWarning
{
  constructor(console)
  {
    this.console = console
  }

  observe(event)
  {
    this.console.warning(event)
  }
}

module.exports = ConsoleObserverWarning
