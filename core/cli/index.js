class Cli
{
  /**
   * @param {readline} readline
   * @param {string} prompt
   */
  constructor(readline, prompt)
  {
    this.readline = readline
    this.prompt   = prompt
  }

  /**
   * @param {string} question
   * @param {function} completer @see https://nodejs.org/api/readline.html#readline_use_of_the_completer_function
   */
  question(question, completer)
  {
    return new Promise((accept, reject) =>
    {
      const rl = this.readline.createInterface(
      {
        prompt    : this.prompt,
        input     : process.stdin,
        output    : process.stdout,
        completer
      })

      rl.question(question, (input) =>
      {
        rl.close()
        accept(input)
      })
    })
  }

  /**
   * @param {string|Buffer|Uint8Array|any}  chunk     not null...
   * @param {string}                        encoding  utf8
   */
  write(chunk, encoding = 'utf8')
  {
    return new Promise((accept) =>
         process.stdout.write(chunk, encoding, () => accept())
      || process.stdout.emit('drain'))
  }
}

module.exports = Cli
