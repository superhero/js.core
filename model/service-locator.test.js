describe('service locator tests', () =>
{
  const
  expect  = require('chai').expect,
  SL      = require('./service-locator')

  let sl

  beforeEach(() =>
  {
    sl = new SL
    sl.add('service', () => new class
    {
      constructor()
      {
        this.i = 0
      }

      get foo()
      {
        return ++this.i
      }
    })
  })

  it('loads a service', async () =>
  {
    const service = await sl.load('service')
    expect(service.foo).to.be.equal(1)
    expect(service.foo).to.be.equal(2)
  })

  it('loads the same instance', async () =>
  {
    const service1 = await sl.load('service')
    expect(service1.foo).to.be.equal(1)
    const service2 = await sl.load('service')
    expect(service2.foo).to.be.equal(2)
  })

  it('throws an exception if the service has not been defined', (done) =>
  {
    sl.load('none existing service')
    .then((service) => done(new Error('should not have loaded a service')))
    .catch((error)  =>
    {
      expect(error.code).to.be.equal('ERR_SERVICE_FACTORY_UNDEFINED')
      done()
    })
  })
})
