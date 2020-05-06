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

    if(typeof this.route.command === 'string'
    && this.route.command in model)
    {
      const command = this.locator.locate('core/string').composeCamelCase(this.route.command, /[ -_]/)
      this.view.body = await model[command](this.route.dto)
    }
    else
    {
      const msg = `the model: "${this.route.model}" does not reccognize the command: "${this.route.command}"`
      throw new ServerError(msg)
    }
  }
}

module.exports = HttpDispatcherModelDispatcher
