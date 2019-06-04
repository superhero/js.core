/**
 * @extends {Error}
 */
class SchemaNotFoundError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_SCHEMA_NOT_FOUND'
  }
}

module.exports = SchemaNotFoundError
