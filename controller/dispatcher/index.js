module.exports = class
{
  constructor(request, route, session)
  {
    this.request = request
    this.route   = route
    this.session = session
  }

  dispatch()
  {
    throw 501
  }
}
