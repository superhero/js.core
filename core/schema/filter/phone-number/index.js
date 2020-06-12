/**
 * @implements {SchemaFilter}
 */
class SchemaFilterPhoneNumber
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
      return data

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
    data = `${data}`.replace(/[^\+0-9]/g, '')
    return data
  }
}

module.exports = SchemaFilterPhoneNumber
