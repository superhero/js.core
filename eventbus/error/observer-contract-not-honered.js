class ObserverContractNotHoneredError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_EVENTBUS_OBSERVER_CONTRACT_NOT_HONERED'
  }
}

module.exports = ObserverContractNotHoneredError
