/**
 * @extends {Error}
 */
class MissingSchemaDefinitionError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_MISSING_SCHEMA_DEFINITION'
  }
}

module.exports = MissingSchemaDefinitionError
