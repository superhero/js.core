const expect = require('chai').expect

describe('server/trait/fetch-view', () =>
{
  const fetchView = require('./fetch-view')

  it('should return a view', () =>
    expect(fetchView('json')).to.be.a('Function'))

  it('invalid view should not throw an error', () =>
    expect(fetchView.bind(null, '__/foobar/bazqux')).to.not.throw(Error))
})
