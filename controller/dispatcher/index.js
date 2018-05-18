module.exports = class
{
  constructor(request, route, session, locator)
  {
    this.request = request
    this.route   = route
    this.session = session
    this.locator = locator
  }

  dispatch()
  {
    throw 501
  }
}
