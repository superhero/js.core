/**
 * @extends {Error}
 */
class InvalidAttributeError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_SCHEMA_INVALID_ATTRIBUTE'
  }
}

module.exports = InvalidAttributeError
