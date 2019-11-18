/**
 * @implements {SchemaFilter}
 */
class SchemaFilterTimestamp
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
      return data

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
    const intData = parseInt(data)

    if(intData == data)
      data = intData

    if(options.utc)
      data = new Date(data).toUTCString()

    if(options.json)
      data = new Date(data).toJSON()

    return data
  }
}

module.exports = SchemaFilterTimestamp
