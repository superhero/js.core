const ComposerFilterTimestamp = require('.')

class ComposerFilterTimestampLocator
{
  locate()
  {
    return new ComposerFilterTimestamp
  }
}

module.exports = ComposerFilterTimestampLocator
