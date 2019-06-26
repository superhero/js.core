const FailedToFastCopyError = require('./error/failed-to-fast-copy')

class DeepCopy
{
  copy(obj)
  {
    try
    {
      return JSON.parse(JSON.stringify(obj))
    }
    catch(error)
    {
      throw new FailedToFastCopyError(error.message)
    }
  }
}

module.exports = DeepCopy
