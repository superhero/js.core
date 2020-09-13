/**
 * Use the Pipeline to organize a multithreaded process flow into an 
 * stacked queue, handled by one or many different service or message 
 * consumers.
 */
class Pipeline
{
  constructor()
  {
    this.consumers  = []
    this.messages   = []
    this.flushed    = true
  }

  push(message)
  {
    this.messages.push(message)
    this.flush().catch(this.onError.bind(this))
  }
  
  addConsumer(consumer)
  {
    if(typeof consumer === 'object')
    {
      this.consumers.push(consumer)
      this.flush().catch(this.onError.bind(this))
    }
    else
    {
      const error   = new Error('a valid consumer must be of type object')

      error.code    = 'E_CORE_QUEUE_INVALID_CONSUMER'
      error.context = 
      {
        expected: 'object',
        received: typeof consumer
      }

      throw error
    }
  }

  getConsumers()
  {
    return this.consumers
  }

  async flush()
  {
    if(this.flushed)
    {
      this.flushed = false

      const consumers = this.getConsumers()
      
      if(consumers.length)
      {
        let message

        while(message = this.messages.shift())
        {
          for(const consumer of consumers)
          {
            try
            {
              await consumer.consume(message)
            }
            catch(error)
            {
              consumer.onError(error)
            }
          }
        }
      }

      this.flushed = true
    }
  }

  onError(error)
  {
    const consumers = this.getConsumers()
    for(const consumer of consumers)
    {
      consumer.onError(error)
    }
  }
}

module.exports = Pipeline
