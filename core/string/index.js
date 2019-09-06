class CoreString
{
  /**
   * @example "foobar" => "Foobar"
   * @param {string} s input to be manipulated
   * @returns {string}
   */
  composeFirstUpperCase(s)
  {
    return foo[0].toUpperCase() + foo.slice(1)
  }

  /**
   * @example "Foo BAR baz" => "foo-bar-baz"
   * @param {string} s input to be manipulated
   * @param {string} [seperator='-'] string to be used as the seperator
   * @returns {string} A string that has replaced the spaces with dashes and lowercased the string
   */
  composeSeperatedLowerCase(s, seperator = '-')
  {
    return s.replace(/\W+/g, seperator).toLowerCase()
  }

  /**
   * @example "Foo BAR baz" => "fooBarBaz"
   * @param {string} s input to be manipulated
   * @returns {string} A string that has replaced the spaces with dashes and lowercased the string
   */
  composeCamelCase(s)
  {
    s = this.composeSeperatedLowerCase(s)
    s = s.split('-').map((part) => this.composeFirstUpperCase(part)).join('')

    return s
  }
}

module.exports = CoreString
