module.exports = () =>
`--require test/init.js
--require mocha-steps
--ui bdd
--full-trace
--timeout 5000
`
