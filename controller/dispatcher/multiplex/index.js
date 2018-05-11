const ERR_NOT_IMPLEMENTED = require('./error/not-implemented')

module.exports = class
{
  constructor(event, route, session)
  {
    this.event    = event
    this.route    = route
    this.session  = session
  }

  * dispatch()
  {
    throw new ERR_NOT_IMPLEMENTED
  }
}
