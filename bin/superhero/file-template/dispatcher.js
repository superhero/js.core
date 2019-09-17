module.exports = (endpoint_name) =>
`const Dispatcher = require('superhero/core/http/server/dispatcher')

/**
* @memberof Api
* @extends {superhero/core/http/server/dispatcher}
*/
class Endpoint${endpoint_name} extends Dispatcher
{
  async dispatch()
  {

  }

  onError(error)
  {
    switch(error.code)
    {
      default: throw error
    }
  }
}

module.exports = Endpoint${endpoint_name}
`
