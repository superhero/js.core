module.exports = (infrastructure, view) =>
`const
CoreFactory = require('superhero/core/factory'),
coreFactory = new CoreFactory,
core        = coreFactory.create()

core.add('api')
core.add('domain')
${infrastructure  === "no" ? "" : "core.add('infrastructure')"}
${view            === "no" ? "" : "core.add('view')"}

core.load()

core.locate('core/bootstrap').bootstrap().then(() =>
core.locate('core/http/server').listen(process.env.HTTP_PORT))
`
