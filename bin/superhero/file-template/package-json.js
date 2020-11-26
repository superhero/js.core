module.exports = (name, description, repository, version) =>
`{
  "name": "${name}",
  "version": "0.0.1",
  "description": "${description.replace('"', '\\"')}",
  "repository": "${repository}",
  "license": "UNLICENSED",
  "main": "src/index.js",
  "scripts": {
    "docs-coverage": "nyc mocha && nyc report --reporter=html --report-dir=./docs/generated/coverage",
    "docs-tests": "mocha --reporter mochawesome --reporter-options reportDir=docs/generated/test,reportFilename=index,showHooks=always",
    "test": "nyc mocha",
    "start": "node ./src/index.js"
  },
  "dependencies": {
    "superhero": "${version}"
  },
  "devDependencies": {
    "mocha": "7.1.2",
    "mochawesome": "6.1.1",
    "mocha-steps": "1.3.0",
    "chai": "4.2.0",
    "nyc": "14.1.1"
  },
  "mocha": {
    "require": [
      "test/init.js",
      "mocha-steps"
    ],
    "ui": "bdd",
    "full-trace": true,
    "timeout": 5000,
    "spec": [
      "./test/**/*.test.js",
      "./src/**/*.test.js"
    ]
  }
}
`
