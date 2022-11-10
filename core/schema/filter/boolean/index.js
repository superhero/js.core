/**
 * @implements {SchemaFilter}
 */
class SchemaFilterBoolean
{
  filter(options, data)
  {
    return options.collection
    ? this.filterCollection(data)
    : this.filterSingle(data)
  }

  filterCollection(data)
  {
    if(!Array.isArray(data))
      data = [ data ]

    const collection = []

    for(const item of data)
    {
      const filtered = this.filterSingle(item)
      collection.push(filtered)
    }

    return collection
  }

  filterSingle(data)
  {
    if(typeof data === 'string')
    {
      if(data.toLowerCase() === 'true')
        return true

      if(data.toLowerCase() === 'false')
        return false
    }

    if(typeof data === 'number')
    {
      if(data === 1)
        return true

      if(data === 0)
        return false
    }

    return data
  }
}

module.exports = SchemaFilterBoolean
