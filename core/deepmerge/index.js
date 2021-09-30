class DeepMerge
{
  merge(a, b, ...c)
  {
    const result = this._merge(a, b)

    return c.length
    ? this.merge(result, ...c)
    : result
  }

  /**
   * The inclusive merge does not replace array with array, it concatenates the arrays
   */
  mergeInclusive(a, b, ...c)
  {
    const result = this._mergeInclusive(a, b)

    return c.length
    ? this.mergeInclusive(result, ...c)
    : result
  }

  _merge(a, b)
  {
    if(b === undefined)
      return a

    if(typeof a !== 'object' || a === null || Array.isArray(a))
      return b

    return this._mergeObject(a, b)
  }

  _mergeInclusive(a, b)
  {
    if(b === undefined)
      return a

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
    if(typeof b !== 'object' || b === null)
      return b

    for(const key in b)
      a[key] = key in a
      ? this._merge(a[key], b[key])
      : b[key]

    return a
  }
}

module.exports = DeepMerge
