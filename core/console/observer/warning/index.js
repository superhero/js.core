class ConsoleObserverWarning
{
  constructor(console)
  {
    this.console = console
  }

  observe(event)
  {
    this.console.warning(event.name, event.data)
  }
}

module.exports = ConsoleObserverWarning
