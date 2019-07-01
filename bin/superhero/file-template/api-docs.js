module.exports = (wd, api_config) =>
{
  let output = '<style>table, tr, td { border: 1px solid #000; border-collapse: collapse; padding: 8px; margin: -1px; }</style>'

  output += '<table>'
  output += `<thead>`
  output += `<tr>`
  output += `<th>`
  output += `Endpoint`
  output += `</th>`
  output += `<th>`
  output += `Input`
  output += `</th>`
  output += `<th>`
  output += `Output`
  output += `</th>`
  output += `</tr>`
  output += `</thead>`
  output += `<tbody>`

  for(const endpoint in api_config)
  {
    const url = api_config[endpoint].url

    if('endpoint' in api_config[endpoint])
    {
      delete api_config[endpoint].endpoint

      if('input' in api_config[endpoint])
      {
        api_config[endpoint].input = require(wd + '/src/domain/' + api_config[endpoint].input)

        for(const key in api_config[endpoint].input)
        {
          if(api_config[endpoint].input[key].type === 'schema')
          {
            delete api_config[endpoint].input[key].type
            api_config[endpoint].input[key].schema = require(wd + '/src/domain/' + api_config[endpoint].input[key].schema)
          }
        }
      }

      if('output' in api_config[endpoint])
      {
        api_config[endpoint].output = require(wd + '/src/domain/' + api_config[endpoint].output)

        for(const key in api_config[endpoint].output)
        {
          if(api_config[endpoint].output[key].type === 'schema')
          {
            delete api_config[endpoint].output[key].type
            api_config[endpoint].output[key].schema = require(wd + '/src/domain/' + api_config[endpoint].output[key].schema)
          }
        }
      }

      output += `<tr>`

      // ...
      output += `<td>`
      output += api_config[endpoint].url
      output += `</td>`

      // ...
      output += `<td class="input">`
      if('input' in api_config[endpoint])
      {
        output += `<table>`
        for(const input_key in api_config[endpoint].input)
        {
          output += `<tr>`

          output += `<td>`
          output += `${input_key}`
          output += `</td>`

          output += `<td>`
          output += `<table>`
          for(const attribute_key in api_config[endpoint].input[input_key])
          {
            output += `<tr>`

            output += `<td>`
            output += `${attribute_key}`
            output += `</td>`

            if(attribute_key === 'schema')
            {
              output += `<td>`
              output += `<table>`
              for(const nested_attribute_key in api_config[endpoint].input[input_key][attribute_key])
              {
                output += `<tr>`

                output += `<td>`
                output += `${nested_attribute_key}`
                output += `</td>`

                output += `<td>`
                output += `<table>`
                for(const final_nested_attribute_key in api_config[endpoint].input[input_key][attribute_key][nested_attribute_key])
                {
                  output += `<tr>`

                  output += `<td>`
                  output += `${final_nested_attribute_key}`
                  output += `</td>`

                  output += `<td>`
                  output += `${api_config[endpoint].input[input_key][attribute_key][nested_attribute_key][final_nested_attribute_key]}`
                  output += `</td>`

                  output += `</tr>`
                }
                output += `</table>`
                output += `</td>`
                output += `</tr>`
              }
              output += `</table>`
              output += `</td>`
            }
            else
            {
              output += `<td>`
              output += `${api_config[endpoint].input[input_key][attribute_key]}`
              output += `</td>`
            }
            output += `</tr>`
          }
          output += `</table>`
          output += `</td>`
          output += `</tr>`
        }
        output += `</table>`
        output += `</td>`
      }

      // ...
      output += `<td class="output">`
      if('output' in api_config[endpoint])
      {
        output += `<table>`
        for(const output_key in api_config[endpoint].output)
        {
          output += `<tr>`

          output += `<td>`
          output += `${output_key}`
          output += `</td>`

          output += `<td>`
          output += `<table>`
          for(const attribute_key in api_config[endpoint].output[output_key])
          {
            output += `<tr>`

            output += `<td>`
            output += `${attribute_key}`
            output += `</td>`

            if(attribute_key === 'schema')
            {
              output += `<td>`
              output += `<table>`
              for(const nested_attribute_key in api_config[endpoint].output[output_key][attribute_key])
              {
                output += `<tr>`

                output += `<td>`
                output += `${nested_attribute_key}`
                output += `</td>`

                output += `<td>`
                output += `<table>`
                for(const final_nested_attribute_key in api_config[endpoint].output[output_key][attribute_key][nested_attribute_key])
                {
                  output += `<tr>`

                  output += `<td>`
                  output += `${final_nested_attribute_key}`
                  output += `</td>`

                  output += `<td>`
                  output += `${api_config[endpoint].output[output_key][attribute_key][nested_attribute_key][final_nested_attribute_key]}`
                  output += `</td>`

                  output += `</tr>`
                }
                output += `</table>`
                output += `</td>`
                output += `</tr>`
              }
              output += `</table>`
              output += `</td>`
            }
            else
            {
              output += `<td>`
              output += `${api_config[endpoint].output[output_key][attribute_key]}`
              output += `</td>`
            }
            output += `</tr>`
          }
          output += `</table>`
          output += `</td>`
          output += `</tr>`
        }
        output += `</table>`
      }
      output += `</td>`
      output += `</tr>`
    }
    else
    {
      delete api_config[endpoint]
    }
  }

  output += `</tbody>`
  output += `</table>`

  return output
}
