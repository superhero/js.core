class DeepMerge
{
  merge(a, b, ...c)
  {
    const 
    result  = this._merge(a, b),
    cloned  = Array.isArray(result) ? [ ...result ] : { ...result }

    return c.length
    ? this.merge(cloned, c[0], ...c.slice(1))
    : cloned
  }

  _merge(a, b)
  {
    if(typeof a !== 'object' || a === null)
      return b

    return Array.isArray(a)
    ? this._mergeArray (a, b)
    : this._mergeObject(a, b)
  }

  _mergeArray(a, b)
  {
    if(!Array.isArray(b))
      return b

    a.push(...b)
    return a
  }

  _mergeObject(a, b)
  {
    for(const key in b)
      a[key] = key in a
      ? this._merge(a[key], b[key])
      : b[key]

    return a
  }
}

module.exports = DeepMerge
