module.exports =
{
  bootstrap:
  {
    'validator' : 'validator/bootstrap'
  },
  validator:
  {
    constituents:
    {
      'decimal' : 'validator/constituent/decimal',
      'integer' : 'validator/constituent/integer',
      'string'  : 'validator/constituent/string'
    }
  },
  locator:
  {
    'validator'                     : __dirname,
    'validator/bootstrap'           : __dirname + '/bootstrap',
    'validator/constituent/decimal' : __dirname + '/constituent/decimal',
    'validator/constituent/integer' : __dirname + '/constituent/integer',
    'validator/constituent/string'  : __dirname + '/constituent/string'
  }
}
