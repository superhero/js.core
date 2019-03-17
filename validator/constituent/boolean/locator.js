const ValidatorConstituentBoolean = require('.')

class ValidatorConstituentBooleanLocator
{
  locate()
  {
    return new ValidatorConstituentBoolean
  }
}

module.exports = ValidatorConstituentBooleanLocator
