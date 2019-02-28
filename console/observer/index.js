class ConsoleObserver
{
  constructor(console)
  {
    this.console = console
  }

  observe(event)
  {
    this.console.log(event.name, event.data)
  }
}

module.exports = ConsoleObserver
