const
Cli       = require('.'),
readline  = require('readline')

class CliLocator
{
  locate()
  {
    const
    configuration = this.locator.locate('configuration'),
    prompt        = configuration.find('cli.prompt')

    return new Cli(readline, prompt)
  }
}

module.exports = CliLocator
