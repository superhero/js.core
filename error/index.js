module.exports = class extends Error
{
  setCode(code)
  {
    this.code = code
    return this
  }
}
