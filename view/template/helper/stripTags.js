module.exports = (variable) =>
  typeof variable == 'string'
  ? variable.replace(/(<([^>]+)>)/ig, '')
  : variable
