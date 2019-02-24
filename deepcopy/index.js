class DeepCopy
{
  fast(obj)
  {
    try
    {
      return JSON.parse(JSON.stringify(obj))
    }
    catch(error)
    {
      // TODO add error
      require('@superhero/debug').log('deepcopy failed for:', obj)
      throw error
    }
  }
}

module.exports = DeepCopy
