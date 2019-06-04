const
Cli       = require('.'),
readline  = require('readline')

class CliLocator
{
  locate()
  {
    const
    configuration = this.locator.locate('core/configuration'),
    prompt        = configuration.find('core.cli.prompt')

    return new Cli(readline, prompt)
  }
}

module.exports = CliLocator
