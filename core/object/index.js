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
}

module.exports = CoreObject
