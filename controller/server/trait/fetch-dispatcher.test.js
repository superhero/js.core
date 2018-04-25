const expect = require('chai').expect

describe('server/trait/fetch-dispatcher', () =>
{
  const fetchDispatcher = require('./fetch-dispatcher')

  it('should return a dispatcher', () =>
    expect(fetchDispatcher('controller/dispatcher')).to.be.a('Function'))

  it('invalid dispather should throw an error', () =>
    expect(fetchDispatcher.bind(null, '__/foobar/bazqux')).to.throw(Error))
})
