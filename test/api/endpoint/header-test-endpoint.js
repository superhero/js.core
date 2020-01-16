const Dispatcher = require('../../../core/http/server/dispatcher')

/**
 * @memberof Api
 * @extends {superhero/core/http/server/dispatcher}
 */
class HeaderTestEndpoint extends Dispatcher
{
  dispatch()
  {
    this.view.meta.status = 200
  }
}

module.exports = HeaderTestEndpoint
