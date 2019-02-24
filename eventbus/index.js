const Events = require('events')

class EventBus extends Events
{
  emit(name, data)
  {
    super.emit(name, { name , data })
  }
}

module.exports = EventBus
