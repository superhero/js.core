describe('view/template', () =>
{
  const expect = require('chai').expect

  let Template, template

  before(() =>
  {
    Template = require('./template')
    template = new Template()
  })

  describe('static get handlebars', () =>
  {
    it('should return the handlebars instance',
    () => expect(Template.handlebars).to.be.equal(require('handlebars')))
  })
})
