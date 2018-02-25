const generate = require('../core/geometry-generator')
const generateTree = require('../core/geometry-tree-generator')

const writeOutput = require('../io/writeOutput')

const runCompare = require('./runCompare')
runCompare('./examples/logo')
runCompare('./examples/basic')
runCompare('./examples/union')


/*writeOutput('foo.stl', generate(results))
console.log('output written')

let curTree = results
//

const {diff} = require('just-diff')
// const diff = require('simple-diff')

const a = [
  sphere()
]

const b = [
  cube(),
  sphere()
]
a[0].id = 0
b[0].id = 0
b[1].id = 1

const whatDiff = diff(a, b)
console.log('prev', JSON.stringify(a))
console.log('cur', JSON.stringify(b))
console.log('what a diff', whatDiff)
*/