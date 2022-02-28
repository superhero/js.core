const
CoreString                      = require('../../core/string'),
coreString                      = new CoreString,
cwd                             = process.cwd(),
version                         = require(__dirname + '/../../package.json').version,
template_config                 = require('./file-template/config'),
template_config_api             = require('./file-template/config-api'),
template_config_domain          = require('./file-template/config-domain'),
template_config_infrastructure  = require('./file-template/config-infrastructure'),
template_testInit               = require('./file-template/test-init'),
template_gitignore              = require('./file-template/gitignore'),
template_packageJson            = require('./file-template/package-json'),
template_dockerfile             = require('./file-template/dockerfile'),
template_readme                 = require('./file-template/readme-md'),
template_main                   = require('./file-template/main'),
Fs                              = require('./fs'),
timezones                       = require('./timezones')

module.exports = async (core) =>
{
  const cli = core.locate('core/cli')

  const use_name            = await cli.question(`What is the name of the project?`)
  const use_name_dashed     = coreString.composeSeperatedLowerCase(use_name)
  cli.write(` ✔ Excellent\n`, 'green')
  const use_description     = await cli.question(`How would you describe the project in one sentence?`)
  cli.write(` ✔ Excellent\n`, 'green')
  const use_repository      = await cli.question(`What is the URL to the repository?`)
  cli.write(` ✔ Excellent\n`, 'green')
  const use_infrastructure  = await cli.question(`Add "infrastructure" component?`, ['yes', 'no'])
  cli.write(` ✔ Excellent\n`, 'green')
  const use_view            = await cli.question(`Add "view" component?`, ['yes', 'no'])
  cli.write(` ✔ Excellent\n`, 'green')
  const use_timezone        = await cli.question(`What timezone does the project reflect?`, timezones)
  cli.write(` ✔ Excellent\n`, 'green')

  // working directory
  cli.write(`Specify the path to where the project will be generated, or leave blank to use ${cwd}/${use_name_dashed}`)
  let use_wd
  use_wd = await cli.question(`Where do you want to generate the project?`)
  use_wd = use_wd || cwd + '/' + use_name_dashed
  cli.write(` ✔ Excellent\n`, 'green')

  const fs = new Fs(use_wd, cli)

  cli.write(' -------------', 'blue')
  cli.write(' ¡ Finish it !', 'blue')
  cli.write(' -------------', 'blue')

  fs.mkdir('src')
  fs.mkdir('src/api')
  fs.mkdir('src/domain')
  fs.mkdir('test')

  fs.writeFile('src/api/config.js',                template_config_api('Api'))
  fs.writeFile('src/domain/config.js',             template_config_domain('Domain'))

  use_infrastructure === 'yes'
  && fs.mkdir('src/infrastructure')

  use_infrastructure === 'yes'
  && fs.writeFile('src/infrastructure/config.js',  template_config_infrastructure('Infrastructure'))

  use_view === 'yes'
  && fs.mkdir('src/view')

  use_view === 'yes'
  && fs.writeFile('src/view/config.js',            template_config('View'))

  fs.writeFile('src/index.js',                     template_main(use_infrastructure, use_view))
  fs.writeFile('test/init.js',                     template_testInit())
  fs.writeFile('.gitignore',                       template_gitignore())
  fs.writeFile('Dockerfile',                       template_dockerfile(use_timezone))
  fs.writeFile('package.json',                     template_packageJson(use_name_dashed, use_description, use_repository, version))
  fs.writeFile('README.md',                        template_readme(use_name))

  cli.write(' -------------\n', 'blue')
}
