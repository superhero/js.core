/**
 * @extends {Error}
 */
class InvalidSchemaError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_SCHEMA'
  }
}

module.exports = InvalidSchemaError
