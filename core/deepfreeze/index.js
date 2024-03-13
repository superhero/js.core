class DeepFreeze
{
  freeze(obj)
  {
    const propNames = Object.getOwnPropertyNames(obj)

    for (const name of propNames)
    {
      try
      {
        const value = obj[name]
  
        obj[name] = value && typeof value === 'object' && value instanceof Buffer === false
        ? this.freeze(value)
        : value
      }
      catch(previousError)
      {
        const error = new Error('could not freeze attribute of object')
        error.code  = 'E_CORE_DEEP_FREEZE'
        error.chain = { name, propNames, obj, previousError }
        throw error
      }
    }

    return Object.freeze(obj)
  }
}

module.exports = DeepFreeze
