const
InvalidAttributeError               = require('./error/invalid-attribute'),
InvalidCollectionError              = require('./error/invalid-collection'),
InvalidSchemaError                  = require('./error/invalid-schema'),
SchemaNotFoundError                 = require('./error/schema-not-found'),
FilterIsNotHoneringContractError    = require('./error/filter-is-not-honering-contract'),
ValidatorIsNotHoneringContractError = require('./error/validator-is-not-honering-contract'),
ValidatorNotFoundError              = require('./error/validator-not-found')

class Schema
{
  constructor(deepmerge)
  {
    this.deepmerge  = deepmerge
    this.schemas    = {}
    this.filters    = {}
    this.validators = {}
  }

  /**
   * @param {string} name
   * @param {...Object} dto
   *
   * @throws {E_SCHEMA_NOT_FOUND}
   * @throws {E_VALIDATOR_NOT_FOUND}
   * @throws {E_SCHEMA_INVALID_ATTRIBUTE}
   *
   * @returns {Object}
   */
  compose(name, ...dto)
  {
    if(name in this.schemas === false)
    {
      const msg = `Schema: "${name}" not found`
      throw new SchemaNotFoundError(msg)
    }

    dto = this.deepmerge.merge({}, ...dto)

    const
    schema = this.schemas[name],
    output = {}

    for(const attribute in schema)
    {
      const options = schema[attribute]

      output[attribute] = dto[attribute]

      if('default' in options
      && output[attribute] === undefined)
      {
        output[attribute] = options.default
      }

      // if optional, and undefined or null, then we don't need to filter or validate
      if(options.optional  === true
      && output[attribute] === undefined)
      {
        delete output[attribute]
        continue
      }

      if(options.nullable  === true
      && output[attribute] === null)
      {
        continue
      }

      // Filtering attributes if a filter has been defined for the type
      if(options.type in this.filters)
      {
        const filter = this.filters[options.type]
        output[attribute] = filter.filter(options, output[attribute])
      }

      // Validating type
      if(options.type in this.validators === false)
      {
        const msg = `Validator: "${options.type}" not found`
        throw new ValidatorNotFoundError(msg)
      }

      try
      {
        const validator = this.validators[options.type]

        if(options.collection)
        {
          if(!Array.isArray(output[attribute]))
          {
            const msg = `Invalid type: "${typeof output[attribute]}", array expected`
            throw new InvalidCollectionError(msg)
          }

          for(const item of output[attribute])
          {
            validator.valid(options, item)
          }
        }
        else
        {
          validator.valid(options, output[attribute])
        }
      }
      catch(error)
      {
        const msg = `Invalid attribute: "${attribute}", error: ${error.message}`
        throw new InvalidAttributeError(msg)
      }
    }

    return output
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

    for(const attribute in schema)
    {
      if(typeof schema[attribute].type !== 'string')
      {
        const msg = `Attribute "${attribute}" does not have a type defined`
        throw new InvalidSchemaError(msg)
      }

      if('enum' in schema[attribute] && !Array.isArray(schema[attribute].enum))
      {
        const msg = `Attribute "${attribute}" enum must be an array`
        throw new InvalidSchemaError(msg)
      }
    }

    this.schemas[schemaName] = schema
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

module.exports = Schema
