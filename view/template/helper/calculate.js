module.exports = (a, operator, b) =>
{
  a = parseFloat(a)
  b = parseFloat(b)

  switch(operator)
  {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return a / b
    case '%': return a % b
  }
  return ''
}
