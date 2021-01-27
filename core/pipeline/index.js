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

  async push(message)
  {
    this.messages.push(message)
    await this.flush()
  }
  
  async addConsumer(consumer)
  {
    // validation of input
    if(typeof consumer === 'object'
    &&        consumer !== null
    && typeof consumer.consume === 'function'
    && typeof consumer.onError === 'function')
    {
      this.consumers.push(consumer)
      await this.flush()
    }
    else
    {
      const error   = new Error('a valid consumer must be of type object and have a "consume" and an "onError" method declared')

      error.code    = 'E_CORE_QUEUE_INVALID_CONSUMER'
      error.context = 
      {
        expected: 'object',
        received: typeof consumer
      }

      throw error
    }
  }

  /**
   * The flush method is responsible for forwarding all messages to the consumers.
   * The flush method follows the FIFO principle - first in first out
   */
  async flush()
  {
    if(this.flushed)
    {
      this.flushed = false

      try
      {
        let message

        while(message = this.messages.shift())
        {
          for(const consumer of this.consumers)
          {
            try
            {
              await consumer.consume(message)
            }
            catch(error)
            {
              consumer.onError(error, message)
            }
          }
        }
      }
      finally
      {
        this.flushed = true
      }
    }
  }
}

module.exports = Pipeline
