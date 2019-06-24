/**
 * @extends {Error}
 */
class InvalidCollectionError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_COLLECTION'
  }
}

module.exports = InvalidCollectionError
