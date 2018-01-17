module.exports = class
{
  constructor(request, route)
  {
    this.request = request
    this.route   = route
  }

  dispatch()
  {
    return { status : 404,
             body   :
             { status  : 'failed',
               message : 'Page Not Found',
               reason  : 'dispatcher has not been filled' } }
  }
}
