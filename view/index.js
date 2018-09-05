module.exports = class
{
  constructor(outStream)
  {
    this.out = outStream
  }

  write()
  {
    const error = new Error('"write" function has not been defined')
    error.code = 'ERR_WRITE_FUNCTION_IS_NOT_DEFINED'
    throw error
  }
}
