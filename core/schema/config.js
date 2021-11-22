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
        'email'     : 'core/schema/filter/email',
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
        'email'     : 'core/schema/validator/email',
        'timestamp' : 'core/schema/validator/timestamp'
      }
    },
    locator:
    {
      'core/schema/composer'    : __dirname + '/composer',
      'core/schema/bootstrap'   : __dirname + '/bootstrap',
      'core/schema/filter/*'    : __dirname + '/filter/*',
      'core/schema/validator/*' : __dirname + '/validator/*',
    }
  }
}
