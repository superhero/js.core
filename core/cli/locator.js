const
Cli       = require('.'),
readline  = require('readline')

class CliLocator
{
  locate()
  {
    return new Cli(readline)
  }
}

module.exports = CliLocator
