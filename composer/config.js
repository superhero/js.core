module.exports =
{
  bootstrap:
  {
    'composer' : 'composer/bootstrap'
  },
  composer:
  {
    filter:
    {
      'boolean' : 'composer/filter/boolean',
      'decimal' : 'composer/filter/decimal',
      'integer' : 'composer/filter/integer',
      'string'  : 'composer/filter/string'
    },
    validator:
    {
      'boolean' : 'composer/validator/boolean',
      'decimal' : 'composer/validator/decimal',
      'integer' : 'composer/validator/integer',
      'string'  : 'composer/validator/string'
    }
  },
  locator:
  {
    'composer'                    : __dirname,
    'composer/bootstrap'          : __dirname + '/bootstrap',
    'composer/filter/boolean'     : __dirname + '/filter/boolean',
    'composer/filter/decimal'     : __dirname + '/filter/decimal',
    'composer/filter/integer'     : __dirname + '/filter/integer',
    'composer/filter/string'      : __dirname + '/filter/string',
    'composer/validator/boolean'  : __dirname + '/validator/boolean',
    'composer/validator/decimal'  : __dirname + '/validator/decimal',
    'composer/validator/integer'  : __dirname + '/validator/integer',
    'composer/validator/string'   : __dirname + '/validator/string'
  }
}
