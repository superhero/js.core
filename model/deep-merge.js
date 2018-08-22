module.exports = class
{
  merge(a, b)
  {
    if(typeof a !== 'object' || a === null)
      return b

    if(Array.isArray(a))
    {
      if(!Array.isArray(b))
        return b

      a.push(...b)
      return a
    }

    for(const key in b)
      a[key] = key in a
      ? this.merge(a[key], b[key])
      : b[key]

    return a
  }
}
