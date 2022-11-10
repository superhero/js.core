/**
 * @implements {SchemaFilter}
 */
class SchemaFilterHash
{
  filter(options, data)
  {
    const 
      iterations  = 1, 
      algorithm   = 'sha256', 
      digest      = 'hex'

    options = Object.assign({ iterations, algorithm, digest }, options)

    return options.collection
    ? this.filterCollection(options, data)
    : this.filterSingle(options, data)
  }

  filterCollection(options, data)
  {
    if(!Array.isArray(data))
      data = [ data ]

    const collection = []

    for(const item of data)
    {
      const filtered = this.filterSingle(options, item)
      collection.push(filtered)
    }

    return collection
  }

  filterSingle(options, data)
  {
    if(typeof data !== 'string')
      return data

    for(let i = 0; i < options.iterations; i++)
    {
      const sha256 = this.crypto.createHash(options.algorithm)
      sha256.update(data)
      data = sha256.digest(options.digest)
    }

    return data
  }
}

module.exports = SchemaFilterHash
