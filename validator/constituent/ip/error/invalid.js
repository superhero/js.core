/**
 * @extends Error
 */
class InvalidIpError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_IP'
  }
}

module.exports = InvalidIpError
