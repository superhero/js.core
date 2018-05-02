const dateformat = (() =>
{
  try
  {
    // "dateformat" is an optional dependency
    // but required for this helper to work
    return require('dateformat')
  }
  catch(err)
  {
    const error = new Error('Missing required module "dateformat"')
    error.code  = 'ERR_MISSING_MODULE'
    throw error
  }
})()

module.exports = (date, format) => dateformat(date, format)
