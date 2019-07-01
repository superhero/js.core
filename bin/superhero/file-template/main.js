module.exports = (infrastructure, view) =>
`const
CoreFactory = require('superhero/core/factory'),
coreFactory = new CoreFactory,
core        = coreFactory.create()

core.add('api')
core.add('domain')
${infrastructure  === "yes" && "core.add('infrastructure')"}
${view            === "yes" && "core.add('view')"}
core.add('core/http/server')

core.load()

core.locate('core/bootstrap').bootstrap().then(() =>
core.locate('core/http/server').listen(process.env.HTTP_PORT))
`
