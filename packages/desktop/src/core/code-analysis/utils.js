const isDifference = node => (node.type === 'CallExpression' && node.callee && node.callee.name && node.callee.name === 'difference')
const isCube = node => (node.type === 'CallExpression' && node.callee && node.callee.name && node.callee.name === 'cube')
const isSphere = node => (node.type === 'CallExpression' && node.callee && node.callee.name && node.callee.name === 'sphere')

const returnsArray = node => node.type === 'ReturnStatement' && node.argument && node.argument.type === 'ArrayExpression'
const isMainFunction = node => node.type === 'FunctionDeclaration' && node.id && node.id.name === 'main'

const isInclude = node => node.type === 'CallExpression' && node.callee && node.callee.name && node.callee.name === 'include'

const extractSimpleArgs = node => {
  if (!node.arguments || node.arguments.length === 0) {
    return undefined
  }
  const argumentsNode = node.arguments[0]
  if (!(argumentsNode.type === 'ObjectExpression')) {
    return undefined
  }

  const argResults = {}
  argumentsNode.properties.forEach(function (property) {
    const name = property.key.name
    const value = property.value.value
    argResults[name] = value
  })
  return argResults
}

module.exports = {
  isDifference,
  isCube,
  isSphere,
  returnsArray,
  isMainFunction,
  isInclude,

  extractSimpleArgs
}
