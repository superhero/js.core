#!/usr/bin/env node

const
CoreFactory     = require('../core/factory'),
coreFactory     = new CoreFactory,
core            = coreFactory.create(),
generateProject = require('./superhero/generate-project'),
generateApiDocs = require('./superhero/generate-api-docs'),
generateSwagger = require('./superhero/generate-swagger')

core.load()

core.locate('core/bootstrap').bootstrap().then(async () =>
{
  const cli = core.locate('core/cli')

  // starting
  cli.write(`
                                 __
     _______  ______  ___  _____/ /_  ___  _________
    / ___/ / / / __ \\/ _ \\/ ___/ __ \\/ _ \\/ ___/ __ \\
   (__  ) /_/ / /_/ /  __/ /  / / / /  __/ /  / /_/ /
  /____/\\__,_/ .___/\\___/_/  /_/ /_/\\___/_/   \\____/
            /_/
`, 'blue')

  cli.write(`
1. Generate project
2. Generate API documentation
3. Generate API swagger documentation
`)

  const option = await cli.question(`Choose your destiny:`, ['1', '2', '3', '4'])
  cli.write(' ✔ Excellent\n', 'green')

  switch(option)
  {
    case '1': await generateProject(core); break;
    case '2': await generateApiDocs(core); break;
    case '3': await generateSwagger(core); break;
  }
})
