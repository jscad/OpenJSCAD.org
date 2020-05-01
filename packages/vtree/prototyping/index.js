const writeOutput = require('./io/writeOutput')
const { toArray } = require('@jscad/array-utils')

const makeBuildCachedGeometryFromTree = require('../core/buildCachedGeometryFromTree')
const { runCompare, runVTreeTree } = require('./runCompare')
const { runBenchMark, spawnBenchMark } = require('./runBenchmark')

// spawnBenchMark('user/run-optimised.js')
// spawnBenchMark('user/run-vanilla.js')
const vanillaApi = require('@jscad/csg/api')
const vtreeApi = require('../core/index').apiClone

let result
const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree()
let vtree = require('./examples/caching-shape-measurements')()
console.log('vtree', vtree)
result = buildCachedGeometryFromTree(undefined, vtree)
// result = vtree
console.log('result', toArray(result)[0].polygons.length)

/* runCompare('./examples/logo')
runCompare('./examples/basic')
runCompare('./examples/union')
runCompare('./examples/shapes-array') */

//
/* let fooVtree = require('./examples/transforms-vtree')()
const subTrees = findDisconnectedSubGraphs(fooVtree)
console.log('foo', JSON.stringify(subTrees))
return */
/*
const runOptimisedCached = () => {
  const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree()
  let vtree = require('./examples/caching-test-vtree')()
  buildCachedGeometryFromTree(undefined, vtree)

  vtree = require('./examples/caching-test-vtree-changed')()
  buildCachedGeometryFromTree(undefined, vtree)

  vtree = require('./examples/caching-test-vtree-changed2')()
  buildCachedGeometryFromTree(undefined, vtree)

  vtree = require('./examples/caching-test-vtree-changed2')()
  buildCachedGeometryFromTree(undefined, vtree)
}

const runVanilla = () => {
  require('./examples/caching-test-vanilla')()

  require('./examples/caching-test-vanilla-changed')()

  require('./examples/caching-test-vanilla-changed2')()

  require('./examples/caching-test-vanilla-changed2')()
}

runBenchMark(runOptimisedCached, 'OptimisedCached', 10)
runBenchMark(runVanilla, 'Vanilla', 10)
*/
/*
const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree()
let start = process.hrtime()
console.log('start optimised, first iteration')
let vtree = require('./examples/caching-test-vtree')()
buildCachedGeometryFromTree(undefined, vtree)
let elapsed = process.hrtime(start)[1] / 1000000

console.log('optimised time', elapsed, 'ms')

console.log('start optimised, changed one of output of main() (array of csgs)')
start = process.hrtime()
vtree = require('./examples/caching-test-vtree-changed')()
buildCachedGeometryFromTree(undefined, vtree)

elapsed = process.hrtime(start)[1] / 1000000
console.log('optimised time', elapsed, 'ms')

console.log('start optimised, removed a few shapes')
start = process.hrtime()
vtree = require('./examples/caching-test-vtree-changed2')()
buildCachedGeometryFromTree(undefined, vtree)

elapsed = process.hrtime(start)[1] / 1000000
console.log('optimised time', elapsed, 'ms')

console.log('start optimised, removed a few shapes (re-run)')
start = process.hrtime()
vtree = require('./examples/caching-test-vtree-changed2')()
buildCachedGeometryFromTree(undefined, vtree)

elapsed = process.hrtime(start)[1] / 1000000
console.log('optimised time', elapsed, 'ms') */
/*
let start = process.hrtime()
console.log('start optimised, first iteration')
let vtree = require('./examples/complex-vtree')()
let final = buildCachedGeometryFromTree(undefined, vtree)
let elapsed = process.hrtime(start)[1] / 1000000

console.log('optimised time', elapsed, 'ms')

console.log('start optimised, changed one of output of main() (array of csgs)')
start = process.hrtime()
vtree = require('./examples/complex-vtree-changed')()
final = buildCachedGeometryFromTree(undefined, vtree)

elapsed = process.hrtime(start)[1] / 1000000
console.log('optimised time', elapsed, 'ms')

console.log('start optimised, second pass')
start = process.hrtime()
vtree = require('./examples/complex-vtree-changed')()
final = buildCachedGeometryFromTree(undefined, vtree)

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
*/

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
