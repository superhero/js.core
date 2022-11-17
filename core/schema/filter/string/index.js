/**
 * @implements {SchemaFilter}
 */
class SchemaFilterString
{
  filter(options, data)
  {
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
    if(typeof data === 'number')
      data = `${data}`

    if(typeof data === 'boolean')
      data = `${data}`

    if(typeof data === 'string')
    {
      if(options.decode)
        data = decodeURIComponent(data)

      if(options.uppercase)
        data = data.toUpperCase()

      if(options.lowercase)
        data = data.toLowerCase()

      if(options.trim)
        data = data.trim()
    }

    return data
  }
}

module.exports = SchemaFilterString
