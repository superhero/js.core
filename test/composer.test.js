describe('Composer', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  let core

  before((done) =>
  {
    const
    CoreFactory = require('../core/factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('api')
    core.add('domain')

    core.load()

    core.locate('core/bootstrap').bootstrap().then(done)
  })

  it('should be able to create an example', function()
  {
    const
    composer  = core.locate('core/schema/composer'),
    example   = composer.composeExample('entity/calculation')

    expect(example).to.deep.equal({ id: 123, type: 'addition', value: 123.45 })
  })

  it('should be able to show 2 errors in schema', async function()
  {
    const 
      composer = core.locate('core/schema/composer'),
      dto =
      {
        'test1': 'yoyo',
        'test2': 'coco'
      }

      expect(() => composer.compose('entity/dto-composer-test', dto)).to.throw('test2')

    // const
    //   result = composer.compose('entity/dto-composer-test', dto)

  })
})
