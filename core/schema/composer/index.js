const
InvalidAttributeError               = require('./error/invalid-attribute'),
InvalidCollectionError              = require('./error/invalid-collection'),
InvalidSchemaError                  = require('./error/invalid-schema'),
SchemaNotFoundError                 = require('./error/schema-not-found'),
FilterIsNotHoneringContractError    = require('./error/filter-is-not-honering-contract'),
ValidatorIsNotHoneringContractError = require('./error/validator-is-not-honering-contract'),
ValidatorNotFoundError              = require('./error/validator-not-found')

class SchemaComposer
{
  constructor(deepmerge, deepclone, deepfreeze)
  {
    this.deepmerge  = deepmerge
    this.deepclone  = deepclone
    this.deepfreeze = deepfreeze
    this.schemas    = {}
    this.filters    = {}
    this.validators = {}
  }

  /**
   * @param {string} schemaName
   * @param {Object|Array<Object>} dto
   *
   * @throws {E_SCHEMA_NOT_FOUND}
   * @throws {E_VALIDATOR_NOT_FOUND}
   * @throws {E_SCHEMA_INVALID_ATTRIBUTE}
   *
   * @returns {Object}
   */
  compose(schemaName, dto)
  {
    if(schemaName in this.schemas === false)
    {
      const msg = `Schema: "${schemaName}" not found`
      throw new SchemaNotFoundError(msg)
    }

    if(Array.isArray(dto))
    {
      dto = this.deepmerge.merge({}, ...dto)
    }

    const
    schema = this.buildSchema(this.schemas[schemaName]),
    output = {}

    for(const attribute in schema)
    {
      output[attribute] = this.attribute(schemaName, schema, attribute, dto[attribute])
    }

    if(Object.isFrozen(schema))
    {
      this.deepfreeze.freeze(output)
    }

    return output
  }

  /**
   * @param {string} schemaName
   * @param {string} attribute
   * @param {Object} data
   *
   * @throws {E_SCHEMA_NOT_FOUND}
   * @throws {E_VALIDATOR_NOT_FOUND}
   * @throws {E_SCHEMA_INVALID_ATTRIBUTE}
   *
   * @returns {*}
   */
  trait(schemaName, attribute, data)
  {
    if(schemaName in this.schemas === false)
    {
      const msg = `Schema: "${schemaName}" not found`
      throw new SchemaNotFoundError(msg)
    }

    const
    schema = this.schemas[schemaName],
    output = this.attribute(schemaName, schema, attribute, data)

    return output
  }

  /**
   * @private
   */
  attribute(schemaName, schema, attribute, data)
  {
    const options = schema[attribute]

    if('default' in options && data === undefined)
    {
      data = options.default
    }

    // if optional, and undefined or null, then we don't need to filter or validate
    if(options.optional === true && data === undefined)
    {
      return data
    }

    if(options.nullable === true && data === null)
    {
      return data
    }

    // Filtering attributes if a filter has been defined for the type
    if(options.type in this.filters)
    {
      const filter = this.filters[options.type]
      data = filter.filter(options, data)
    }

    // Validating type
    if(options.type in this.validators === false)
    {
      const msg = `In schema: "${schemaName}", validator: "${options.type}" not found`
      throw new ValidatorNotFoundError(msg)
    }

    try
    {
      const validator = this.validators[options.type]

      if(options.collection)
      {
        if(!Array.isArray(data))
        {
          const msg = `In schema: "${schemaName}", invalid type: "${typeof data}", array expected`
          throw new InvalidCollectionError(msg)
        }

        for(const item of data)
        {
          validator.valid(options, item)
        }
      }
      else
      {
        validator.valid(options, data)
      }
    }
    catch(error)
    {
      const msg = `Invalid attribute: "${attribute}", schema: "${schemaName}", error: ${error.message}`
      throw new InvalidAttributeError(msg)
    }

    return data
  }

  /**
   * The schema could have declared a meta field that requires a building process before used
   * The build process will alter the schema provided through an argument
   *
   * @param {Object} schema
   * @return {Object} Same instance as provided through argument
   */
  buildSchema(schema)
  {
    if('@meta' in schema)
    {
      if('extends' in schema['@meta']
      || 'extend'  in schema['@meta'])
      {
        const extendList = schema['@meta'].extends
                        || schema['@meta'].extend

        for(const extendSchemaName of Array.isArray(extendList) ? extendList : [extendList])
        {
          const extend = this.buildSchema(this.schemas[extendSchemaName])
          this.deepmerge.merge(schema, extend)
        }
      }

      if(schema['@meta'].immutable
      || schema['@meta'].immutable === undefined)
      {
        delete schema['@meta']
        Object.freeze(schema)
      }
      else
      {
        delete schema['@meta']
      }
    }

    return schema
  }

  /**
   * @param {string} schemaName
   * @param {Object} schema
   * @throws {E_SCHEMA_INVALID_SCHEMA}
   */
  addSchema(schemaName, schema)
  {
    if(typeof schema !== 'object')
    {
      const msg = `Schema "${schemaName}" must be an object`
      throw new InvalidSchemaError(msg)
    }

    // TODO: Improve validation of the schema when it's added
    // For the moment we can suffer unexpected errors when we start working with the schema
    // A better approch is to validate the schema structure as a value object
    // ...resulting in a garantee that the schema is of expected definition.

    this.schemas[schemaName] = this.deepclone.clone(schema)
  }

  /**
   * @param {string} filterName
   * @param {SchemaFilter} filter
   * @throws {E_FILTER_IS_NOT_HONERING_CONTRACT}
   */
  addFilter(filterName, filter)
  {
    if(typeof filter.filter !== 'function')
    {
      const msg = `Filter "${filterName}" not honering contract`
      throw new FilterIsNotHoneringContractError(msg)
    }

    this.filters[filterName] = filter
  }

  /**
   * @param {string} validatorName
   * @param {SchemaValidator} validator
   * @throws {E_VALIDATOR_IS_NOT_HONERING_CONTRACT}
   */
  addValidator(validatorName, validator)
  {
    if(typeof validator.valid !== 'function')
    {
      const msg = `Validator "${validatorName}" not honering contract`
      throw new ValidatorIsNotHoneringContractError(msg)
    }

    this.validators[validatorName] = validator
  }
}

module.exports = SchemaComposer
