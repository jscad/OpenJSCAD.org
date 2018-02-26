const generate = require('../core/geometry-generator')
const generateTree = require('../core/geometry-tree-generator')
const findDisconnectedSubGraphs = require('../core/findDisconnectedSubGraphs')
const writeOutput = require('../io/writeOutput')


const makeBuildCachedGeometryFromTree = require('../core/buildCachedGeometryFromTree')
const {runCompare, runVTreeTree} = require('./runCompare')
/* runCompare('./examples/logo')
runCompare('./examples/basic')
runCompare('./examples/union')
runCompare('./examples/shapes-array') */

//
/*let fooVtree = require('./examples/transforms-vtree')()
const subTrees = findDisconnectedSubGraphs(fooVtree)
console.log('foo', JSON.stringify(subTrees))
return */

const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree()

let start = process.hrtime()
console.log('start optimised, first iteration')
let vtree = require('./examples/complex-vtree')()
let final = buildCachedGeometryFromTree(vtree)
let elapsed = process.hrtime(start)[1] / 1000000

console.log('optimised time', elapsed, 'ms')

console.log('start optimised, changed one of output of main() (array of csgs)')
start = process.hrtime()
vtree = require('./examples/complex-vtree-changed')()
final = buildCachedGeometryFromTree(vtree)

elapsed = process.hrtime(start)[1] / 1000000
console.log('optimised time', elapsed, 'ms')

// measure vanilla
const decache = require('decache')
decache('./examples/complex-base')
require('./examples/complex-base')()

console.log('start vanilla')
start = process.hrtime()
decache('./examples/complex-base')
require('./examples/complex-base')()

elapsed = process.hrtime(start)[1] / 1000000
console.log('vanilla time', elapsed, 'ms')

//
/* writeOutput('foo.stl', generate(results))
console.log('output written')

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
