const stream = require('stream')

class CoreStream
{
  /**
   * @link https://nodejs.org/api/stream.html#stream_three_states
   */
  createPassThrough()
  {
    return new stream.PassThrough
  }
}

module.exports = CoreStream
