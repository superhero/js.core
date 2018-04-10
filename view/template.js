const
dateformat  = require('dateformat'),
handlebars  = require('handlebars'),
fs          = require('fs'),
util        = require('util'),
path        = require('path').dirname(require.main.filename),
readFile    = util.promisify(fs.readFile),
templates   = {},
helperDir   = __dirname + '/template/helper/'

fs.readdirSync(helperDir).forEach((helper) =>
  handlebars.registerHelper(helper, require(helperDir + helper)))

module.exports = class self
{
  static get handlebars()
  {
    return handlebars
  }

  async compose(vm, route)
  {
    const template = vm.template || route.template

    if(!template)
      throw new Error('view can not be rendered, no template defined')

    return await self.compose(template, vm.body)
  }

  static async compose(template, context)
  {
    return template in templates
    ? templates[template](context)
    : await readFile(`${path}/${template}.hbs`, 'utf-8').then((source) =>
      {
        templates[template] = handlebars.compile(source)
        return templates[template](context)
      })
  }

  static async addPartial(name, template)
  {
    const source = await readFile(`${path}/${template}.hbs`, 'utf-8')
    handlebars.registerPartial(name, source)
  }
}
