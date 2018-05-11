module.exports = class extends Error
{
  constructor(action, ...a)
  {
    super(`Action:"${action}" unknown action`, ...a)
    this.code = 'ERR_UNKNOWN_ACTION'
  }
}
