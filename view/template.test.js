const expect = require('chai').expect

describe('view/template', () =>
{
  const
  Template = require('./template'),
  template = new Template()

  describe('static get handlebars', () =>
  {
    it('should return the handlebars instance', () =>
      expect(Template.handlebars).to.be.equal(require('handlebars')))
  })
})
