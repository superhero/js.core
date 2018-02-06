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

  create()  { throw new Error('undefined action') }
  retrieve(){ throw new Error('undefined action') }
  update()  { throw new Error('undefined action') }
  delete()  { throw new Error('undefined action') }
}
