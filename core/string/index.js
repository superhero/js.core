class CoreString
{
  trim(s, charToRemove)
  {
    s = ltrim(s, charToRemove)
    s = rtrim(s, charToRemove)

    return s
  }

  ltrim(s, charToRemove)
  {
    let start = 0

    while (start < s.length && s[start] === charToRemove) 
    {
      start++
    }

    return s.slice(start)
  }

  rtrim(s, charToRemove)
  {
    let end = s.length
 
    while (end > 0 && s[end - 1] === charToRemove) 
    {
      end--
    }

    return s.slice(0, end)
  }

  /**
   * @example "foobar" => "Foobar"
   * @param {string} s input to be manipulated
   * @returns {string}
   */
  composeFirstUpperCase(s)
  {
    return s[0].toUpperCase() + s.slice(1)
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
   * @example "Foo-BAR-baz" => "fooBarBaz" or "Foo BAR baz" => "fooBarBaz"
   * @param {string} s input to be manipulated
   * @param {string} [seperator='-'] string to be used as the seperator
   * @param {boolean} [firstUpperCase=false] if first letter also should be upper cased
   * @returns {string} A string that has replaced the spaces with dashes and lowercased the string
   */
  composeCamelCase(s, seperator = '-', firstUpperCase = false)
  {
    s = this.composeSeperatedLowerCase(s, seperator)
    s = s.split(seperator).map((part, i) => i === 0 && !firstUpperCase ? part : this.composeFirstUpperCase(part)).join('')

    return s
  }
}

module.exports = CoreString
