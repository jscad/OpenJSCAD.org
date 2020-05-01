const esprima = require('esprima')
const estraverse = require('estraverse')
// const astring = require('astring')
// const astEval = require('static-eval')
const astUtils = require('esprima-ast-utils')
const astParents = require('./ast-parents')
console.log('astUtils', astUtils)

const { isCube, isDifference, isSphere, extractSimpleArgs } = require('./utils')

function astFromSource (source, options) {
  const defaults = {
    loc: true, range: true, tolerant: true, tokens: true
  }
  options = Object.assign({}, defaults, options)

  let ast
  try {
    ast = esprima.parse(source, options)
    // console.log("ast",ast,"scope", scope);
  } catch (error) {
    console.error('failed to generate ast:', error)
    ast = {}
  }
  return ast
}

function csgTree (ast) {
  console.log('foo')
  ast = astParents(ast)
  const results = []
  let currentItem
  let textStuff = ''
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      /* if (!isMainFunction(node) && node.type !== 'Program') {
        return estraverse.VisitorOption.Skip
      } */
      if (isDifference(node)) {
        // console.log('difference', node)
        if (!currentItem) {
          currentItem = { type: 'difference', args: [], children: [] }
          textStuff += 'difference('
        } else {

        }
      }
      if (isCube(node)) {
        const args = extractSimpleArgs(node)
        const leaf = { type: 'cube', args }
        if (currentItem) {
          currentItem.children.push(leaf)
        }
        const argsTxt = args ? `{${Object.keys(args).map(function (key) { return key + ':' + args[key] })}}` : ''
        textStuff += ` cube(${argsTxt}), `
        // const cubeAsProgram = astUtils.toProgram(node)
      }
      if (isSphere(node)) {
        const args = extractSimpleArgs(node)
        const leaf = { type: 'sphere', args }
        if (currentItem) {
          currentItem.children.push(leaf)
        }
        const argsTxt = args ? `{${Object.keys(args).map(function (key) { return key + ':' + args[key] })}}` : ''
        textStuff += ` sphere(${argsTxt}), `
      }
    },
    leave: function (node, parent) {
      // console.log('leaving')
      if (isDifference(node)) {
        textStuff += ')'
      }
    }
  })

  console.log('textStuff', textStuff)
  console.log(currentItem)
  return results
}

// function replaceIncludesInAst (ast, replacement = '') {
//   const result = estraverse.replace(ast, {
//     enter: function (node, parent) {
//       if (isInclude(node)) {
//         if (node.arguments && arguments.length > 0) {
//           return { type: 'Literal', value: replacement }
//         }
//         return estraverse.VisitorOption.Skip
//       }
//     }
//   })
//
//   return astring.generate(result, { indent: '  ', lineEnd: '\n' })
// }
/*
var gen = require('escodegen').generate

var ast = esprima.parse('[1, 2 === "2", 3+4*10, [2] === 2]')
ast = astEval(ast)

gen(ast) */

module.exports = {
  astFromSource,
  isDifference,
  isCube,
  isSphere,
  csgTree
}
