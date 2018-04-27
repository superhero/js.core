module.exports = class
{
  constructor(request, route)
  {
    this.request = request
    this.route   = route
  }

  dispatch()
  {
    throw 501
  }
}
