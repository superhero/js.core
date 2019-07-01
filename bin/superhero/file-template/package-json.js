module.exports = (name, description, repository, version) =>
`{
  "name": "${name}",
  "version": "0.0.1",
  "description": "${description.replace('"', '\\"')}",
  "repository": "${repository}",
  "license": "UNLICENSED",
  "main": "src/index.js",
  "scripts": {
    "docs-coverage": "nyc mocha './test/test.*.js' --opts ./test/mocha.opts && nyc report --reporter=html --report-dir=./docs/generated/coverage",
    "docs-tests": "mocha './test/test.*.js' --opts ./test/mocha.opts --reporter mochawesome --reporter-options reportDir=docs/generated/test,reportFilename=index,showHooks=always",
    "test": "nyc mocha './test/test.*.js' --opts ./test/mocha.opts",
    "start": "node ./src/index.js"
  },
  "dependencies": {
    "superhero": "${version}"
  },
  "devDependencies": {
    "mocha": "5.1.0",
    "mochawesome": "3.0.2",
    "chai": "4.1.2",
    "nyc": "11.7.1"
  }
}
`
