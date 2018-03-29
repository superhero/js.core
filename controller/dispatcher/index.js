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
             body   : 'Not Found' }
  }
}
