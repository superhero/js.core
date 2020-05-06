const
ServerError = require('./error/server-error'),
Dispatcher  = require('.')

class HttpDispatcherModelDispatcher extends Dispatcher
{
  async dispatch()
  {
    let model

    try
    {
      model = this.locator.locate(this.route.model)
    }
    catch(error)
    {
      const msg = `the model: "${this.route.model}" could not be located`
      throw new ServerError(msg)
    }

    if(this.route.command in model)
    {
      this.view.body = await model[this.route.command](this.route.dto)
    }
    else
    {
      const msg = `the model: "${this.route.model}" does not reccognize the command: "${this.route.command}"`
      throw new ServerError(msg)
    }
  }
}

module.exports = HttpDispatcherModelDispatcher
