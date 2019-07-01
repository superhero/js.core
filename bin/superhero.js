#!/usr/bin/env node

const
readline        = require('readline'),
Cli             = require('../core/cli'),
cli             = new Cli(readline),
generateProject = require('./superhero/generate-project'),
generateApi     = require('./superhero/generate-api'),
generateApiDocs = require('./superhero/generate-api-docs'),
generateDomain  = require('./superhero/generate-domain'),
run             = async () =>
{
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
2. Generate API classes and corresponding tests from configuration
3. Generate API documentation
4. Generate Domain classes from configuration
`)

  const option = await cli.question(`Choose your destiny:`, ['1', '2', '3', '4'])
  cli.write(' ✔ Excellent\n', 'green')

  switch(option)
  {
    case '1': await generateProject(cli); break;
    case '2': await generateApi(cli);     break;
    case '3': await generateApiDocs(cli); break;
    case '4': await generateDomain(cli);  break;
  }
}

run()
