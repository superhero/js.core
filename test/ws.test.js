describe('controller/server/ws', async () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  config  = require('./config')

  let server, client

  beforeEach((done) =>
  {
    const
    core   = require('../'),
    port   = 9002,
    debug  = false,
    Client = require('@superhero/websocket/client')
    // let
    client = new Client({ debug })
    server = core.ws(config.routes.ws, { debug })
    server.listen(port)
    server.on('listening', async () =>
    {
      await client.connect(port)
      done()
    })
  })

  afterEach(() =>
  {
    client.socket.end()
    server.close()
  })

  it('websocket responding', (done) =>
  {
    const
    evt   = 'foo',
    data  = 'bar'
    client.events.on(evt, (dto) =>
    {
      expect(dto).to.be.equal(data)
      done()
    })
    client.emit(evt, data)
  })

  it('websocket responding with multiple responses', (done) =>
  {
    const evt = 'bar'
    let i = 0
    client.events.on(evt, (dto) =>
    {
      expect(+dto).to.be.equal(++i)

      i === 3
      && done()
    })
    client.emit(evt)
  })
})
