class ViewContractNotHoneredError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_VIEW_CONTRACT_NOT_HONERED'
  }
}

module.exports = ViewContractNotHoneredError
