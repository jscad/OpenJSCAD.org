const generate = require('../core/geometry-generator')
const generateTree = require('../core/geometry-tree-generator')
const decache = require('decache')

function runCompare (basePath) {
  console.log('running benchmarks for ' + basePath)

  let moduleNameVanilla = basePath + '-base'
  let moduleNameVtree = basePath + '-vtree'
  // example user code

  runPass(moduleNameVtree, runVTreeTree, 'vtree treegen ')
  runPass(moduleNameVtree, runVTree, 'vtree gen ')
  runPass(moduleNameVanilla, runVanilla, 'vanilla ')
}

const runPass = (moduleName, runFn, name) => {
  const precision = 3 // 3 decimal places
  let elapsed
  let start

  decache(moduleName)
  start = process.hrtime()
  runFn(moduleName)
  // measure
  elapsed = process.hrtime(start)[1] / 1000000
  console.log(name + process.hrtime(start)[0] + ' s, ' + elapsed.toFixed(precision) + ' ms - ')
}

const runVanilla = (moduleName) => {
  require(moduleName)()
}

const runVTreeTree = (moduleName) => {
  let results = require(moduleName)()
  generateTree(results)
}

const runVTree = (moduleName) => {
  let results = require(moduleName)()
  generate(results)
}

module.exports = runCompare
