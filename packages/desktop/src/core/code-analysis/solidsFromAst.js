const astring = require('astring')
const estraverse = require('estraverse')
const { isCube, isDifference, isSphere, extractSimpleArgs, returnsArray } = require('./utils')

function liveNode (node) {
  let pieceCode = astring.generate(node, { indent: '  ', lineEnd: '\n' })
  pieceCode = `
  const {cube, sphere} = require('@jscad/scad-api').primitives3d
  const {union, difference, intersection} = require('@jscad/scad-api').booleanOps

  ${pieceCode}
  `
  // console.log('pieceCode', pieceCode)
  // const {requireFromString} = require('../scripLoading')
  const solid = eval(pieceCode)// requireFromString(pieceCode, 'foo.js')
  // console.log('solid', solid)
  // const foo = astEval(node)
  // console.log('foo', foo)
  return solid
}

function solidsFromAst (ast) {
  const results = []
  let currentItem
  let textStuff = ''
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (returnsArray(node)) {
        console.log('returns array', node)
        const independantSolids = node.argument.elements.map(liveNode)
        console.log('independantSolids', independantSolids)
      }
      if (isDifference(node)) {
        // console.log('difference', node)
        if (!currentItem) {
          currentItem = { type: 'difference', args: [] }
          textStuff += 'difference('
        } else {

        }
        // liveNode(node)
        // results.push(dataExtractor(node))
        // return estraverse.VisitorOption.Skip
      }
      if (isCube(node)) {
        currentItem = { type: 'cube', args: [] }
        const args = extractSimpleArgs(node)
        const argsTxt = args ? `{${Object.keys(args).map(function (key) { return key + ':' + args[key] })}}` : ''
        textStuff += ` cube(${argsTxt}), `
        // liveNode(node)
      }
      if (isSphere(node)) {
        currentItem = { type: 'sphere', args: [] }
        const args = JSON.stringify(extractSimpleArgs(node))
        textStuff += ` sphere(${args || ''}), `
        // liveNode(node)
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
  return results
}
