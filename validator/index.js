const
SchemaNotFoundError                   = require('./error/schema-not-found'),
ConstituentIsNotHoneringContractError = require('./error/constituent-is-not-honering-contract'),
ConstituentNotFoundError              = require('./error/constituent-not-found'),
SchemaNotAnObjectError                = require('./error/schema-not-an-object'),
TypeNotDefinedError                   = require('./error/type-not-defined')

class Validator
{
  constructor()
  {
    this.schemas      = {}
    this.constituents = {}
  }

  /**
   * @param {string} name
   * @param {object} dto
   * @throws {E_SCHEMA_NOT_FOUND}
   * @throws {E_CONSTITUENT_NOT_FOUND}
   */
  valid(name, dto)
  {
    if(name in this.schemas === false)
    {
      const msg = `Schema: "${name}" not found`
      throw new SchemaNotFoundError(msg)
    }

    const schema = this.schemas[name]

    for(const key of schema)
    {
      if(schema[key].type in this.constituents === false)
      {
        const msg = `Constituent: "${schema[key].type}" not found`
        throw new ConstituentNotFoundError(msg)
      }

      const validator = this.constituents[schema[key].type]
      validator.valid(schema[key], dto[key])
    }
  }

  /**
   * @param {string} schemaName
   * @param {object} schema
   * @throws {E_SCHEMA_NOT_AN_OBJECT}
   * @throws {E_TYPE_NOT_DEFINED}
   */
  addSchema(schemaName, schema)
  {
    if(typeof schema !== 'object')
    {
      const msg = `Schema "${schemaName}" must be an object`
      throw new SchemaNotAnObjectError(msg)
    }

    for(const attribute in schema)
      if(schema[attribute].type !== 'string')
      {
        const msg = `Attribute "${attribute}" does not have a type defined`
        throw new TypeNotDefinedError(msg)
      }

    this.validSchema(schema)
    this.schemas[schemaName] = schema
  }

  /**
   * @param {string} constituentName
   * @param {ValidatorConstituent} constituent
   * @throws {E_CONSTITUENT_IS_NOT_HONERING_CONTRACT}
   */
  addConstituent(constituentName, constituent)
  {
    if(typeof constituent.valid !== 'function')
    {
      const msg = `constituent "${constituentName}" not honering contract`
      throw new ConstituentIsNotHoneringContractError(msg)
    }

    this.validConstituent(constituent)
    this.constituents[constituentName] = constituent
  }
}

module.exports = Validator
