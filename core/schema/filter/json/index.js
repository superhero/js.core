/**
 * @implements {SchemaFilter}
 */
class SchemaFilterJson
{
  filter(options, data)
  {
    try
    {
      if(options.stringified && typeof data === 'object')
      {
        return JSON.stringify(data, null, options.indentation)
      }

      if(!options.stringified && typeof data === 'string')
      {
        return data ? JSON.parse(data) : {}
      }

      return data
    }
    catch(error)
    {
      // it's not up to the filter to validate
      // if we can't filter the data, then we simply pass the data forward
      return data
    }
  }
}

module.exports = SchemaFilterJson
