class CoreObject
{
  /**
   * @example { FooBar:'FooBar' } => { foobar:'FooBar' }
   * @param {object} o input to be manipulated
   * @returns {object}
   */
  composeLowerCaseKeyedObject(o)
  {
    const
    object      = o || {},
    objectKeys  = Object.keys(object),
    composed    = objectKeys.reduce((c, k) => (c[k.toLowerCase()] = object[k], c), {})

    return composed
  }

  /**
   * Creates a copy of an object excluding some keys.
   * References are kept, so modifing Objects or arrays on the resulting object will modify the source one
   * To avoid this behaivour clone the input before using or clone the output after
   * @param {object} o source object to create a copy
   * @param {...string} keys Keys to remove
   * @returns Copy of object without the specified keys
   * @author Lleonard Subirana (arsu.leo@gmail.com)
   */
  composeObjectWithoutKeys(o, ...keys)
  {
    const
    object = o || {},
    result = { ...object }

    for(const key of keys)
    {
      delete result[key]
    }

    return result
  }
}

module.exports = CoreObject
