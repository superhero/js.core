module.exports = (s) => ('' + s).replace(/(['])/g, '\\$1')
