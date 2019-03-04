class LocatorNotImplementedError extends ReferenceError
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_LOCATOR_NOT_IMPLEMENTED'
  }
}

module.exports = LocatorNotImplementedError
