const MissingSchemaDefinitionError = require('./error/missing-schema-definition')
/**
 * @implements {SchemaFilter}
 */
class SchemaFilterSchema
{
  constructor(composer)
  {
    this.composer = composer
  }

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
    if(typeof options.schema === 'string')
    {
      return options.trait
      ? this.composer.trait(options.schema, options.trait, data)
      : this.composer.compose(options.schema, data)
    }
    else
    {
      const msg = `Expected the attribute "schema" to declare what type of schema `
      throw new MissingSchemaDefinitionError(msg)
    }
  }
}

module.exports = SchemaFilterSchema
