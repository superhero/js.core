/**
 * @extends Error
 */
class SchemaNotAnObjectError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_SCHEMA_NOT_AN_OBJECT'
  }
}

module.exports = SchemaNotAnObjectError
