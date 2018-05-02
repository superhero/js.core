const fetchDispatcher = require('./fetch-dispatcher')

module.exports = (dispatchers) =>
{
  const collection = []
  for(const dispatcher of dispatchers)
  {
    const Dispatcher = fetchDispatcher(dispatcher)
    collection.push(Dispatcher)
  }

  return collection
}
