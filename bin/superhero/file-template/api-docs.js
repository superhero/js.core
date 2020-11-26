module.exports = (wd, api_config, schemas) =>
{
  const MIN_DEPTH = 1

  function buildParameters(schemaName)
  {
    if(schemaName)
    {
      let htmlOutput = `<h3>Parameters</h3>
      <div class="parameters">
        <div class="parameters__header clearfix">
          <div class="parameter__header name">
            Name
          </div>
          <div class="parameter__header description">
            Description
          </div>
        </div>`

      const
      schemaPath = schemas[schemaName],
      parameters = buildParametersFromSchema(schemaPath)

      for(const parameter of parameters)
      {
        htmlOutput += `<div class="parameter">
          <div class="parameter__name">
            <div class="parameter__key ${parameter.required ? 'required' : ''}">
              ${parameter.name}
            </div>
            <div class="parameter__type">
              ${parameter.type} ${parameter.schema ? `(<a class="schema-link" data-schema="${parameter.schema}" href="#${parameter.schema}">${parameter.schema}</a>)` : ''}
            </div>
          </div>
          <div class="parameter__description">
            ${parameter.description ? parameter.description : ''}
            ${buildValidationRulesOutput(parameter.validationRules)}
          </div>
        </div>`
      }

      htmlOutput += '</div>'

      return htmlOutput
    }

    return ''
  }

  function buildJSONExample(schemaName, stringify = true, depth = 0)
  {
    if(schemaName)
    {
      const
      schemaPath = schemas[schemaName],
      parameters = buildParametersFromSchema(schemaPath)

      if(parameters.length > 0)
      {
        let example = {}
        for(const parameter of parameters)
        {
          const
          isSameSchema = parameter.schema === schemaName,
          isCollection = parameter.collection

          if(parameter.example !== undefined)
          {
            example[parameter.name] = parameter.example
          }
          else if(parameter.schema)
          {
            if(!isSameSchema)
            {
              if(isCollection)
              {
                example[parameter.name] = [buildJSONExample(parameter.schema, false)]
              }
              else
              {
                example[parameter.name] = buildJSONExample(parameter.schema, false)
              }
            }
            else if(isSameSchema)
            {
              if(depth <= MIN_DEPTH)
              {
                const nextLevel = depth + 1
                if(isCollection)
                {
                  example[parameter.name] = [buildJSONExample(parameter.schema, false, nextLevel)]
                }
                else
                {
                  example[parameter.name] = buildJSONExample(parameter.schema, false, nextLevel)
                }
              }
              else
              {
                if(isCollection)
                {
                  if(parameter.default && Array.isArray(parameter.default))
                    example[parameter.name] = parameter.default
                  else if(parameter.default)
                    example[parameter.name] = [parameter.default]
                  else
                    example[parameter.name] = []
                }
                else
                {
                  example[parameter.name] = parameter.default ? parameter.default : undefined
                }
              }
            }
          }
        }

        return stringify ? JSON.stringify(example, null, 2).replace(/\n/gi, '&#10;').replace(/\\"/gi, '"') : example
      }
    }

    return '// none'
  }

  function buildOutputExample(output)
  {
    let htmlOutput = `<h3>Output</h3>
    <div class="input">
      <textarea class="code-example">${buildJSONExample(output)}</textarea>
    </div>`

    return htmlOutput
  }

  function buildInputExample(input)
  {
    let htmlOutput = `<h3>Input</h3>
    <div class="input">
      <textarea class="code-example">${buildJSONExample(input)}</textarea>
    </div>`

    return htmlOutput
  }

  function buildValidationRulesOutput(validationRules)
  {
    if(Object.keys(validationRules).length !== 0)
    {
      let output = `<h4>Validation rules</h4>
      <ul class="parameter__validation">`

      for(const rule in validationRules)
      {
        output += `<li><span class="parameter__validation__rule">${rule}</span> ${validationRules[rule]}</li>`
      }

      output += '</ul>'

      return output
    }

    return ''
  }

  function getValidationRules(parameter)
  {
    const validationRules = { ...parameter }

    delete validationRules.description
    delete validationRules.optional
    delete validationRules.type
    delete validationRules.example
    delete validationRules.schema
    delete validationRules.trait

    return validationRules
  }

  function buildParametersFromSchema(schemaPath)
  {
    let parameters = []

    if(schemaPath)
    {
      const schema = require(schemaPath)

      for(const attribute in schema)
      {
        if(attribute === '@meta' && schema[attribute].extends)
        {
          if(Array.isArray(schema[attribute].extends))
          {
            for(const s of schema[attribute].extends)
            {
              const
              schemaPath       = schemas[s],
              schemaParameters = buildParametersFromSchema(schemaPath)

              parameters       = parameters.concat(schemaParameters)
            }
          }
          else if(typeof schema[attribute].extends === 'string')
          {
            const
            schemaPath       = schemas[schema[attribute].extends],
            schemaParameters = buildParametersFromSchema(schemaPath)

            parameters = parameters.concat(schemaParameters)
          }
        }
        else if(schema[attribute].type === 'schema' && schema[attribute].hasOwnProperty('trait'))
        {
          const
          traitSchema = require(schemas[schema[attribute].schema]),
          trait       = schema[attribute].trait

          parameters.push({
            name: attribute,
            description: schema[attribute].description? schema[attribute].description : traitSchema[trait].description,
            required: schema[attribute].optional ? false : true,
            type: traitSchema[trait].type,
            example: traitSchema[trait].example,
            validationRules: getValidationRules(traitSchema[trait])
          })
        }
        else if(schema[attribute].type === 'schema')
        {
          parameters.push({
            name: attribute,
            description: schema[attribute].description,
            required: schema[attribute].optional ? false : true,
            type: schema[attribute].type,
            schema: schema[attribute].schema,
            collection : schema[attribute].collection,
            validationRules: getValidationRules(schema[attribute])
          })
        }
        else if(typeof schema[attribute].extends === 'string')
        {
          parameters.push({
            name: attribute,
            description: schema[attribute].description,
            required: schema[attribute].optional ? false : true,
            type: schema[attribute].type,
            example: schema[attribute].example,
            validationRules: getValidationRules(schema[attribute])
          })
        }
        else
        {
          parameters.push({
            name: attribute,
            description: schema[attribute].description,
            required: schema[attribute].optional ? false : true,
            type: schema[attribute].type,
            example: schema[attribute].example,
            validationRules: getValidationRules(schema[attribute])
          })
        }
      }
    }

    return parameters
  }

  let html = `<!doctype html>

  <html lang="en">
  <head>
    <meta charset="utf-8">

    <title>API Documentation</title>
    <meta name="description" content="API Documentation">
    <meta name="author" content="Adamo">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/theme/eclipse.css"/>
  </head>

  <style>
  html, body
  {
    font-size: 16px;
    font-family: 'Arial'
  }

  .panel {
    border: 1px solid #ccc;
    background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }

  .panel.open
  {
    padding: 0 1em 1em 1em;
  }

  .accordion:after {
    content: "\u2795"; /* Unicode character for "plus" sign (+) */
    color: #777;
    position: absolute;
    top: 50%;
    right: 1em;
    transform: translateY(-50%);
  }

  /* Style the buttons that are used to open and close the accordion panel */
  .accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
    font-weight: bold;
    position: relative;
  }

  /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
  .active, .accordion:hover {
    background-color: #ccc;
  }

  .active:after {
    content: "\u2796";
  }

  .html-method {
    text-transform: uppercase;
    border-radius: 0.5em;
    padding: 1em;
    color: white;
    margin-right: 0.5em;
    text-shadow: 0 1px 0 rgba(0,0,0,.1);
    width: 55px;
    display: inline-block;
    text-align: center;
  }

  .html-method.get
  {
    background: LimeGreen;
  }

  .html-method.post
  {
    background: SteelBlue;
  }

  .html-method.put
  {
    background: DarkOrange;
  }

  .html-method.delete
  {
    background: FireBrick;
  }

  .html-method.delete:before
  {
    content: 'DELETE'
  }

  .html-method.get:before
  {
    content: 'GET'
  }

  .html-method.post:before
  {
    content: 'POST'
  }

  .html-method.put:before
  {
    content: 'PUT'
  }

  .parameters__header,
  .parameter
  {
    width: 100%;
  }

  .parameters
  {
    padding: 1em;
  }

  .parameters__header
  {
    border-bottom: 1px solid Black;
  }

  .clearfix {
    overflow: auto;
  }

  .parameter,
  .parameter__header,
  .parameter__name,
  .parameter__description
  {
    float: left;
  }

  .parameter__name,
  .parameter__header.name
  {
    width:40%;
  }

  .parameter__description,
  .parameter__header.description
  {
    width:60%;
  }

  .parameter
  {
    padding: 1em;
    box-sizing: border-box;
  }

  .parameter__header
  {
    font-weight: bold;
    padding: 0.5em;
    box-sizing: border-box;
  }

  .parameter__type
  {
    padding: 0.5em 0;
    font-family: monospace;
    text-transform: lowercase;
    font-weight: 600;
    color: #3b4151;
  }

  .parameter__validation__rule
  {
    font-weight: bold;
  }

  .parameter__validation__rule::after
  {
    content: ':'
  }

  .parameter__key.required::after
  {
    content: 'required';
    font-size: 0.8em;
    color: red
  }

  .CodeMirror {
    border: 1px solid #eee;
    height: auto;
  }
  </style>
  <body>`

  let baseView
  html += '<h1>Endpoints</h1>'
  for(const route in api_config)
  {
    if(api_config[route].hasOwnProperty('url'))
    {
      html += `<button class="accordion"><span class="html-method ${api_config[route].method}"></span>${api_config[route].url}</button>
      <div class="panel">
        ${api_config[route].description ? `<p class="description">${api_config[route].description}</p>` : ''}
        <h3>View</h3>
        <p class="view">${api_config[route].view ? api_config[route].view : baseView}</p>
        ${buildParameters(api_config[route].input)}
        ${buildInputExample(api_config[route].input)}
        ${buildOutputExample(api_config[route].output)}
      </div>`
    }
    else if(api_config[route].hasOwnProperty('view'))
    {
      baseView = api_config[route].view
    }
  }

  html += '<h1>Schemas</h1>'
  for(const schema in schemas)
  {
    html += `<button id="${schema}" class="accordion">${schema}</button>
    <div class="panel">
      ${buildParameters(schema)}
      ${buildInputExample(schema)}
    </div>`
  }

  html += `<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/javascript/javascript.min.js"></script>

  <script>
    const initializeCodeMirror = (textareas = []) =>
    {
      textareas.forEach(textarea =>
      {
        if(!textarea.getAttribute('data-code-mirror'))
        {
          CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            theme: 'eclipse',
            readOnly: true,
            mode: 'javascript'
          })

          textarea.setAttribute('data-code-mirror', true)
        }
      })
    }

    const tooglePanel = (panel) =>
    {
      const textareas = panel.querySelectorAll('textarea.code-example')

      initializeCodeMirror(textareas)

      panel.classList.toggle('open')

      if(panel.style.maxHeight)
        panel.style.maxHeight = null
      else
        panel.style.maxHeight = panel.scrollHeight + 'px'
    }

    const toogleAccordion = (node) =>
    {
      node.classList.toggle('active')
      const panel = node.nextElementSibling
      tooglePanel(panel)
    }

    document.addEventListener('click', function({ target })
    {
      let accordion
      if(target.classList.contains('accordion'))
      {
        accordion = target
      }
      else if(target.classList.contains('schema-link'))
      {
        const
        schemaName = target.getAttribute('data-schema'),
        accordion  = document.getElementById(schemaName)
      }

      if(accordion)
        toogleAccordion(accordion)
    })

  </script>
</body>
</html>`
  return html
}
