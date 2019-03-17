const Validator = require('.')

class ValidatorLocator
{
  locate()
  {
    return new Validator
  }
}

module.exports = ValidatorLocator
