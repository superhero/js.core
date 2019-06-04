/**
 * @implements {SchemaFilter}
 */
class SchemaFilterJson
{
  filter(options, data)
  {
    try
    {
      return options.stringified
      ? JSON.stringify(data, null, options.indentation)
      : data
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
