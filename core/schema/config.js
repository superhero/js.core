module.exports =
{
  core:
  {
    bootstrap:
    {
      'schema' : 'core/schema/bootstrap'
    },
    schema:
    {
      filter:
      {
        'boolean'   : 'core/schema/filter/boolean',
        'csv'       : 'core/schema/filter/csv',
        'decimal'   : 'core/schema/filter/decimal',
        'integer'   : 'core/schema/filter/integer',
        'json'      : 'core/schema/filter/json',
        'schema'    : 'core/schema/filter/schema',
        'string'    : 'core/schema/filter/string',
        'timestamp' : 'core/schema/filter/timestamp'
      },
      validator:
      {
        'boolean'   : 'core/schema/validator/boolean',
        'csv'       : 'core/schema/validator/csv',
        'decimal'   : 'core/schema/validator/decimal',
        'integer'   : 'core/schema/validator/integer',
        'json'      : 'core/schema/validator/json',
        'schema'    : 'core/schema/validator/schema',
        'string'    : 'core/schema/validator/string',
        'timestamp' : 'core/schema/validator/timestamp'
      }
    },
    locator:
    {
      'core/schema/composer'            : __dirname + '/composer',
      'core/schema/bootstrap'           : __dirname + '/bootstrap',
      'core/schema/filter/boolean'      : __dirname + '/filter/boolean',
      'core/schema/filter/csv'          : __dirname + '/filter/csv',
      'core/schema/filter/decimal'      : __dirname + '/filter/decimal',
      'core/schema/filter/integer'      : __dirname + '/filter/integer',
      'core/schema/filter/json'         : __dirname + '/filter/json',
      'core/schema/filter/schema'       : __dirname + '/filter/schema',
      'core/schema/filter/string'       : __dirname + '/filter/string',
      'core/schema/filter/timestamp'    : __dirname + '/filter/timestamp',
      'core/schema/validator/boolean'   : __dirname + '/validator/boolean',
      'core/schema/validator/csv'       : __dirname + '/validator/csv',
      'core/schema/validator/decimal'   : __dirname + '/validator/decimal',
      'core/schema/validator/integer'   : __dirname + '/validator/integer',
      'core/schema/validator/json'      : __dirname + '/validator/json',
      'core/schema/validator/schema'    : __dirname + '/validator/schema',
      'core/schema/validator/string'    : __dirname + '/validator/string',
      'core/schema/validator/timestamp' : __dirname + '/validator/timestamp'
    }
  }
}
