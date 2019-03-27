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
      'boolean'   : 'composer/filter/boolean',
      'decimal'   : 'composer/filter/decimal',
      'integer'   : 'composer/filter/integer',
      'json'      : 'composer/filter/json',
      'schema'    : 'composer/filter/schema',
      'string'    : 'composer/filter/string',
      'timestamp' : 'composer/filter/timestamp'
    },
    validator:
    {
      'boolean'   : 'composer/validator/boolean',
      'decimal'   : 'composer/validator/decimal',
      'integer'   : 'composer/validator/integer',
      'json'      : 'composer/validator/json',
      'schema'    : 'composer/validator/schema',
      'string'    : 'composer/validator/string',
      'timestamp' : 'composer/validator/timestamp'
    }
  },
  locator:
  {
    'composer'                      : __dirname,
    'composer/bootstrap'            : __dirname + '/bootstrap',
    'composer/filter/boolean'       : __dirname + '/filter/boolean',
    'composer/filter/decimal'       : __dirname + '/filter/decimal',
    'composer/filter/integer'       : __dirname + '/filter/integer',
    'composer/filter/json'          : __dirname + '/filter/json',
    'composer/filter/schema'        : __dirname + '/filter/schema',
    'composer/filter/string'        : __dirname + '/filter/string',
    'composer/filter/timestamp'     : __dirname + '/filter/timestamp',
    'composer/validator/boolean'    : __dirname + '/validator/boolean',
    'composer/validator/decimal'    : __dirname + '/validator/decimal',
    'composer/validator/integer'    : __dirname + '/validator/integer',
    'composer/validator/json'       : __dirname + '/validator/json',
    'composer/validator/schema'     : __dirname + '/validator/schema',
    'composer/validator/string'     : __dirname + '/validator/string',
    'composer/validator/timestamp'  : __dirname + '/validator/timestamp'
  }
}
