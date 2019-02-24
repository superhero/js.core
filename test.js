describe('Core', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  let core

  before(() =>
  {
    const
    CoreFactory = require('./factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('console')
    core.add('server/dispatcher-chain')
    core.add('server/request-builder')
    core.add('server/route-builder')
    core.add('server/session-builder')
    core.add('server/http')

    core.load()

    core.locate('server.http').listen(9001)
  })

  after(async () =>
  {
    await core.locate('server.http').close()
  })

  it('?', async () =>
  {
    expect(true).to.be.equal(true)
  })
})
