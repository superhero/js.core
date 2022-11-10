/**
 * @implements {SchemaFilter}
 */
class SchemaFilterCsv
{
  filter(options, data)
  {
    return options.collection
    ? this.filterCollection(options, data)
    : this.filterSingle(options, data)
  }

  filterCollection(options, data)
  {
    if(typeof data === 'string')
    {
      data = data.split('\n')
    }
    
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
    if(typeof data === 'string')
    {
      if(options.uppercase)
        data = data.toUpperCase()

      if(options.lowercase)
        data = data.toLowerCase()

      data = data.split(',')
    }

    return data
  }
}

module.exports = SchemaFilterCsv
