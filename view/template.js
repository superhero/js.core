const
fs        = require('fs'),
util      = require('util'),
path      = require('path').dirname(require.main.filename),
readFile  = util.promisify(fs.readFile)

module.exports = class self
{
  static get handlebars()
  {
    try
    {
      // "handlebars" is an optional dependency
      // but required for this module to work
      return require('handlebars')
    }
    catch(err)
    {
      const error = new Error('Missing required module "handlebars"')
      error.code  = 'ERR_MISSING_MODULE'
      throw error
    }
  }

  async compose(vm, route)
  {
    const template = vm.template || route.template

    if(!template)
      throw new Error('view can not be rendered, no template defined')

    return await self.compose(template, vm.body)
  }

  static async compose(filename, context)
  {
    return await readFile(`${path}/${filename}.hbs`, 'utf-8').then((source) =>
    {
      const
      template = this.handlebars.compile(source),
      composed = template(context)

      return composed
    })
  }

  static async addPartial(name, template)
  {
    const source = fs.readFileSync(`${path}/${template}.hbs`, 'utf-8')
    this.handlebars.registerPartial(name, source)
  }

  static async addHelper(name, filename)
  {
    let helper
    switch(typeof filename)
    {
      case 'string'  :
        helper = require(`${path}/${filename}`)
        break

      case 'undefined' :
        helper = require(`${__dirname}/template/helper/${name}`)
        break

      default:
        const
        msg   = `Invalid filename. `
              + `Expected "string" or "boolean". `
              + `Found:"${typeof filename}"`,
        error = new TypeError(msg)
        throw error
    }

    this.handlebars.registerHelper(name, helper)
  }
}
