const dgram = require('dgram')

class UdpServer
{
  #sockets = []

  /**
   * @param {Object} router
   * @param {Core.Locator} locator
   */
  constructor(routes, locator)
  {
    this.routes   = routes
    this.locator  = locator
  }

  bootstrap()
  {
    for(const route_id in this.routes)
    {
      const route = this.routes[route_id]
      this.addSocket(route)
    }
  }

  addSocket(route)
  {
    const socket = dgram.createSocket(route.socket || 'udp4')

    socket.bind(route.bind)
    socket.on('message',  this.onMessage.bind(this, socket, route))
    socket.on('error',    this.onError.bind(this, socket, route))
    this.#sockets.push(socket)
  }

  close()
  {
    for(const socket of this.#sockets)
    {
      socket.close()
    }
  }

  async onMessage(socket, route, msg, rinfo)
  {
    const dispatcher = this.locator.locate(route.dispatcher)
    await dispatcher.dispatch({ msg, route, rinfo, socket })
  }

  onError(socket, route, previousError)
  {
    const error = new Error('udp socket error')
    error.chain = { route, previousError }
    error.code  = 'E_CORE_UDP_SOCKET_ERROR'
    throw error
  }
}

module.exports = UdpServer
