const
dateformat  = require('dateformat'),
handlebars  = require('handlebars'),
fs          = require('fs'),
util        = require('util'),
path        = require('path').dirname(require.main.filename),
readFile    = util.promisify(fs.readFile),
templates   = {}

module.exports = class self
{
  async compose(vm, route)
  {
    const
    layout    = vm.layout   || route.layout,
    template  = vm.template || route.template

    if(!template)
      throw `view can not be rendered, no template or dispatcher defined`

    const html = await self.compose(template, vm.body)

    return layout
    ? await self.compose(layout, {main:html})
    : html
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
}

// register helper
module.exports.registerHelper = handlebars.registerHelper

// add partial
module.exports.addPartial = async (name, filename) =>
{
  const source = await readFile(filename, 'utf-8')
  handlebars.registerPartial(name, source)
}

// updated if helper
handlebars.registerHelper('if', function(a, operator, b, options)
{
  options = options || operator

  switch (operator)
  {
    case '==' : case 'eq' : return (a == b) ? options.fn(this) : options.inverse(this)
    case '<'  : case 'lt' : return (a <  b) ? options.fn(this) : options.inverse(this)
    case '<=' : case 'lte': return (a <= b) ? options.fn(this) : options.inverse(this)
    case '>'  : case 'gt' : return (a >  b) ? options.fn(this) : options.inverse(this)
    case '>=' : case 'gte': return (a >= b) ? options.fn(this) : options.inverse(this)
    case '&&' : case 'and': return (a && b) ? options.fn(this) : options.inverse(this)
    case '||' : case 'or' : return (a || b) ? options.fn(this) : options.inverse(this)
    case 'typeof' : return  (typeof a == b) ? options.fn(this) : options.inverse(this)
    default       : return  (a)             ? options.fn(this) : options.inverse(this)
  }
})

// added a concat helper
handlebars.registerHelper('concat', (...args) =>
{
  var out = ''
  for(var arg of args)
    if(typeof arg != 'object' && arg != undefined)
      out += arg

  return out
})

// escape quotes
handlebars.registerHelper('escSingelQuote', (s) => ('' + s).replace(/(['])/g, '\\$1'))
handlebars.registerHelper('escDoubleQuote', (s) => ('' + s).replace(/(["])/g, '\\$1'))

// remove tags from variable
handlebars.registerHelper('stripTags', (variable) =>
  typeof variable == 'string'
  ? variable.replace(/(<([^>]+)>)/ig, '')
  : variable)

// date format helper
handlebars.registerHelper('date', (date, format) => dateformat(date, format))

// case helpers
handlebars.registerHelper('toUpperCase', (s) => ('' + s).toUpperCase())
handlebars.registerHelper('toLowerCase', (s) => ('' + s).toLowerCase())

// json helper
handlebars.registerHelper('jsonStringify', (obj) => JSON.stringify(obj))
