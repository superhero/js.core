module.exports = class extends require('.')
{
  setContext(...ctx)
  {
    this.context = ctx
    return this
  }
}
