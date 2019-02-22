class DeepFreeze
{
  freeze(obj)
  {
    const propNames = Object.getOwnPropertyNames(obj)

    for (const name of propNames)
    {
      const value = obj[name]

      obj[name] = value && typeof value === 'object'
      ? this.freeze(value)
      : value
    }

    return Object.freeze(obj)
  }
}

module.exports = DeepFreeze
