const error = new Error('undefined action')
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

  create()  { throw error }
  retrieve(){ throw error }
  update()  { throw error }
  delete()  { throw error }
}
