module.exports = (...args) =>
{
  var out = ''
  for(var arg of args)
    if(typeof arg != 'object' && arg != undefined)
      out += arg

  return out
}
