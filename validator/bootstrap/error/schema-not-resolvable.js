class SchemaNotResolvableError extends ReferenceError
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_SCHEMA_NOT_RESOLVABLE'
  }
}

module.exports = SchemaNotResolvableError
