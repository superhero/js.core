module.exports = class extends Error
{
  constructor(msg, ...a)
  {
    super(msg || 'Not implemented', ...a)
    this.code = 'ERR_METHOD_NOT_IMPLEMENTED'
  }
}
