class DtoBuilderContractNotHoneredError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_DTO_BUILDER_CONTRACT_NOT_HONERED'
  }
}

module.exports = DtoBuilderContractNotHoneredError
