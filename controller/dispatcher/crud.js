const UndefinedError =
{
  message : 'undefined action',
  reason  : 'dispatcher action has not been declared'
}

module.exports = class extends require('.')
{
  async dispatch()
  {
    const type = this.request.event.toLowerCase().split('.').pop()

    switch(type)
    {
      case 'create'   :
      case 'retrieve' :
      case 'update'   :
      case 'delete'   : return await this[type]()

      default : throw new Error(`unsupported crud type:"${type}"`)
    }
  }

  create()  { throw UndefinedError }
  retrieve(){ throw UndefinedError }
  update()  { throw UndefinedError }
  delete()  { throw UndefinedError }
}
