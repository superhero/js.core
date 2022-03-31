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
  compose(schemaName, dto, freeze)
  {
    dto = this.deepclone.clone(dto)

    const
    schema = this.composeSchema(schemaName),
    output = {}

    if(Array.isArray(dto))
    {
      dto = this.deepmerge.merge({}, ...dto)
    }

    var errors = []

    for(const attribute in schema)
    {
      try
      {
        output[attribute] = this.attribute(schemaName, schema, attribute, dto[attribute])
      }
      catch(previousError)
      {
        const error = new Error(previousError.message + ' >> in root schema: "' + schemaName + '" >> root attribute: "' + attribute + '"')
        error.chain = { previousError, schemaName, dto, attribute, schema }
        errors.push(error)
        continue
      }
    }

    if(errors.length > 0)
    {
      let message = 'invalid attributes'
      for(const error of errors)
      {
        if(error.chain?.attribute)
        {
          message += '\n\n'
          message += '*** '
          message += error.chain.attribute
          message += ' - '
          message += error.message
        }
        else
        {
          throw error
        }
      }
      const error = new InvalidAttributeError(message)
      error.chain = { errors, schemaName, dto }
      throw error
    }

    // priority on the api level, argument definition > schema definition
    if(typeof freeze === 'boolean' ? freeze : Object.isFrozen(schema))
    {
      this.deepfreeze.freeze(output)
    }

    return output
  }

  /**
   * @param {string} schemaName
   * @param {boolean} includeOptional
   *
   * @throws {E_SCHEMA_NOT_FOUND}
   *
   * @returns {Object}
   */
  composeExample(schemaName, includeOptional)
  {
    const
    schema = this.composeSchema(schemaName),
    output = {}

    for(const attribute in schema)
    {
      if(schema[attribute].optional)
      {
        if(includeOptional)
        {
          output[attribute] = this.composeExampleValue(schema[attribute], includeOptional)
        }
      }
      else
      {
        output[attribute] = this.composeExampleValue(schema[attribute], includeOptional)
      }
    }

    if(Object.isFrozen(schema))
    {
      this.deepfreeze.freeze(output)
    }

    return output
  }

  composeExampleValue(options, includeOptional)
  {
    let output

    if('example' in options)
    {
      output = options.example
    }
    else if(typeof options.schema === 'string')
    {
      const example = this.composeExample(options.schema, includeOptional)

      output = options.trait
      ? example[options.trait]
      : example
    }

    return options.collection
    ? output ? [output] : []
    : output
  }

  /**
   * @param {string} schemaName
   *
   * @throws {E_SCHEMA_NOT_FOUND}
   *
   * @returns {Object}
   */
  composeSchema(schemaName)
  {
    if(schemaName in this.schemas === false)
    {
      const msg = `Schema: "${schemaName}" not found`
      throw new SchemaNotFoundError(msg)
    }

    const schema = this.buildSchema(this.schemas[schemaName])

    return schema
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

    const schema = this.buildSchema(this.schemas[schemaName])

    try
    {
      const output = this.attribute(schemaName, schema, attribute, data)
      return output
    }
    catch(previousError)
    {
      const error = new Error(previousError.message)
      error.chain = { previousError, schema, schemaName, attribute, data }
      throw error
    }
  }

  /**
   * @private
   */
  attribute(schemaName, schema, attribute, data)
  {
    if(attribute in schema === false)
    {
      const message = `Attribute: "${attribute}" does not exist in schema: "${schemaName}"`
      throw new InvalidAttributeError(message)
    }

    const options = schema[attribute]

    if('default' in options && data === undefined)
    {
      data = options.default
    }

    // if optional and no data, then we don't need to filter or validate
    if(options.optional === true && data === undefined)
    {
      return undefined
    }

    // if nullable and no data, then we don't need to filter or validate
    if(options.nullable === true 
    &&(data === null 
    || data === ''))
    {
      return null
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
      const 
        msg   = `In schema: "${schemaName}", validator: "${options.type}" not found`,
        error = new ValidatorNotFoundError(msg)

      error.chain = { schemaName, schema, attribute, data }
      throw error
    }

    try
    {
      const validator = this.validators[options.type]

      if(options.collection)
      {
        if(!Array.isArray(data))
        {
          const msg = `In schema: "${schemaName}", `
                    + `invalid type: "${typeof data}", `
                    + `array expected`

          throw new InvalidCollectionError(msg)
        }

        if(options['collection-size-min']
        && options['collection-size-min'] > data.length)
        {
          const msg = `In schema: "${schemaName}", `
                    + `invalid collection size, expected min ${options['collection-size-min']}, `
                    + `received size ${data.length}`

          throw new InvalidCollectionError(msg)
        }

        if(options['collection-size-max']
        && options['collection-size-max'] < data.length)
        {
          const msg = `In schema: "${schemaName}", `
                    + `invalid collection size, expected max ${options['collection-size-max']}, `
                    + `received size ${data.length}`

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
    catch(previousError)
    {
      const msg = `Invalid attribute: "${attribute}"\n>> schema: "${schemaName}"\n>> error: ${previousError.message}\n`
      
      const error = new InvalidAttributeError(msg)
      error.chain = { previousError, schemaName, schema, attribute, data}
      throw error
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
          if(extendSchemaName in this.schemas)
          {
            const extend = this.buildSchema(this.schemas[extendSchemaName])
            this.deepmerge.merge(schema, extend)
          }
          else
          {
            const msg = `schema "${extendSchemaName}" does not exist`
            throw new InvalidSchemaError(msg)
          }
        }
      }

      if('excludes' in schema['@meta']
      || 'exclude'  in schema['@meta']
      || 'remove'   in schema['@meta'])
      {
        const excludeList = schema['@meta'].excludes
                         || schema['@meta'].exclude
                         || schema['@meta'].remove

        for(const excludeAttribute of Array.isArray(excludeList) ? excludeList : [excludeList])
        {
          delete schema[excludeAttribute]
        }
      }

      if(schema['@meta'].immutable  === true
      || schema['@meta'].mutable    === false
      ||(schema['@meta'].mutable    === undefined && schema['@meta'].immutable === undefined))
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
