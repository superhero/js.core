/**
 * @extends Error
 */
class TypeNotDefinedError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_TYPE_NOT_DEFINED'
  }
}

module.exports = TypeNotDefinedError
