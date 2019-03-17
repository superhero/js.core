module.exports =
{
  validator:
  {
    constituents:
    {
      'decimal'           : 'validator/constituent/decimal',
      'decimal-unsigned'  : 'validator/constituent/decimal-unsigned',
      'email'             : 'validator/constituent/email',
      'enum'              : 'validator/constituent/enum',
      'integer'           : 'validator/constituent/integer',
      'integer-unsigned'  : 'validator/constituent/integer-unsigned',
      'ip'                : 'validator/constituent/ip',
      'string'            : 'validator/constituent/string',
    }
  },
  locator:
  {
    'validator/constituent/decimal'           : __dirname + '/constituent/decimal',
    'validator/constituent/decimal-unsigned'  : __dirname + '/constituent/decimal-unsigned',
    'validator/constituent/email'             : __dirname + '/constituent/email',
    'validator/constituent/enum'              : __dirname + '/constituent/enum',
    'validator/constituent/integer'           : __dirname + '/constituent/integer',
    'validator/constituent/integer-unsigned'  : __dirname + '/constituent/integer-unsigned',
    'validator/constituent/ip'                : __dirname + '/constituent/ip',
    'validator/constituent/string'            : __dirname + '/constituent/string',
    'validator'                               : __dirname
  }
}
