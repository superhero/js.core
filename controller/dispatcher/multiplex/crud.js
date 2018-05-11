const
ERR_NOT_IMPLEMENTED = require('./error/not-implemented'),
ERR_UNKNOWN_ACTION  = require('./error/unknown-action')

module.exports = class extends require('.')
{
  * dispatch(...a)
  {
    const action = this.event.name.toLowerCase().split('.').pop()

    switch(action)
    {
      case 'create'   :
      case 'retrieve' :
      case 'update'   :
      case 'delete'   : yield this[action](...a)

      default : throw new ERR_UNKNOWN_ACTION (action)
    }
  }

  * create()  { throw new ERR_NOT_IMPLEMENTED }
  * retrieve(){ throw new ERR_NOT_IMPLEMENTED }
  * update()  { throw new ERR_NOT_IMPLEMENTED }
  * delete()  { throw new ERR_NOT_IMPLEMENTED }
}
