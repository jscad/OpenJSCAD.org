const generate = require('../core/geometry-generator')
const generateTree = require('../core/geometry-tree-generator')

function runCompare (basePath) {
  let results
  const precision = 3 // 3 decimal places
  let elapsed
  let start
  // example user code
  /* results = require(basePath + '-vtree')()
  generate(results)

  elapsed = process.hrtime(start)[1] / 1000000// nano to milli
  console.log('vtree gen ' + process.hrtime(start)[0] + ' s, ' + elapsed.toFixed(precision) + ' ms - ') // print message + time

  start = process.hrtime() */

  // vtree variant 2
  start = process.hrtime()
  results = require(basePath + '-vtree')()
  generateTree(results)

  elapsed = process.hrtime(start)[1] / 1000000
  console.log('vtree treegen ' + process.hrtime(start)[0] + ' s, ' + elapsed.toFixed(precision) + ' ms - ')

  // vanilla jscad
  start = process.hrtime()
  results = require(basePath + '-base')()
  // measure
  elapsed = process.hrtime(start)[1] / 1000000
  console.log('base ' + process.hrtime(start)[0] + ' s, ' + elapsed.toFixed(precision) + ' ms - ')
}

module.exports = runCompare
