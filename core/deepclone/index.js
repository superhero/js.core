const FailedToCloneError = require('./error/failed-to-clone')

class DeepClone
{
  clone(obj)
  {
    try
    {
      return JSON.parse(JSON.stringify(obj))
    }
    catch(error)
    {
      throw new FailedToCloneError(error.message)
    }
  }
}

module.exports = DeepClone
