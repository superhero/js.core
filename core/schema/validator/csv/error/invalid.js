/**
 * @extends {Error}
 */
class InvalidCsvError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_CSV'
  }
}

module.exports = InvalidCsvError
