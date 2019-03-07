class DtoInvalidReferenceError extends ReferenceError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_DTO_INVALID_REFERENCE'
  }
}

module.exports = DtoInvalidReferenceError
