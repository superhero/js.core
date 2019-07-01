const Debug = require('@superhero/debug')

class Cli extends Debug
{
  /**
   * @param {readline} readline
   */
  constructor(readline)
  {
    const options =
    {
      date            : false,
      maxStringLength : 0,
      separator       : '\n'
    }
    super(options)
    this.readline = readline
  }

  /**
   * @param {string} question
   * @param {string} alternatives
   * @see https://nodejs.org/api/readline.html#readline_use_of_the_completer_function
   */
  question(question, alternatives)
  {
    return new Promise((accept, reject) =>
    {
      const rl = this.readline.createInterface(
      {
        prompt    : this.prompt,
        input     : process.stdin,
        output    : process.stdout,
        completer : Array.isArray(alternatives) === false
                  ? undefined
                  : (line) =>
                    {
                      const completions = alternatives.filter((c) => c.startsWith(line))
                      return [ completions.length ? completions : alternatives, line ]
                    }
      })

      rl.question(question + ' ', async (input) =>
      {
        rl.close()

        if(Array.isArray(alternatives) && alternatives.length)
        {
          if(alternatives.includes(input))
          {
            accept(input)
          }
          else
          {
            if(alternatives.length === 1)
            {
              await this.write(`You must chose ${alternatives}`, 'red')
            }
            else if(alternatives.length < 10)
            {
              await this.write(`You must chose one of the alternatives ${alternatives.slice(0, -1).join(', ')} or ${alternatives.slice(-1)}`, 'red')
            }
            else
            {
              await this.write(`You must chose one of the ${alternatives.length} valid alternatives`, 'red')
              await this.write(`You can use the "tab" key to list all the alternatives `, 'red')
            }

            const answer = await this.question(question, alternatives)
            accept(answer)
          }
        }
        else
        {
          accept(input)
        }
      })
    })
  }

  /**
   * @param {*} chunk
   * @param {string} color
   */
  write(chunk, color)
  {
    this.color(color).log(chunk)
    this.color(false)
  }
}

module.exports = Cli
