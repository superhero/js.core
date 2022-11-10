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
    const intData = parseInt(data)

    if(options.date)
      data = new Date(data).toDateString()

    if(options.iso)
      data = new Date(data).toISOString()

    if(options.local)
      data = new Date(data).toLocaleString()

    if(options.localDate)
      data = new Date(data).toLocaleDateString()

    if(options.localTime)
      data = new Date(data).toLocaleTimeString()

    if(options.utc)
      data = new Date(data).toUTCString()

    if(options.json)
      data = new Date(data).toJSON()

    if(intData == data)
      data = intData

    return data
  }
}

module.exports = SchemaFilterTimestamp
