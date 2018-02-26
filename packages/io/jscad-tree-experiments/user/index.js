const generate = require('../core/geometry-generator')
const generateTree = require('../core/geometry-tree-generator')
const findDisconnectedSubGraphs = require('../core/findDisconnectedSubGraphs')
const writeOutput = require('../io/writeOutput')

const {runCompare, runVTreeTree} = require('./runCompare')
/* runCompare('./examples/logo')
runCompare('./examples/basic')
runCompare('./examples/union')
runCompare('./examples/shapes-array') */

//
const hash = require('object-hash')
const lookup = {}
const buildFinalResult = (subTrees) => {
  const finalResult = []
  subTrees.forEach(function (indy, index) {
    const subTreeHash = hash(indy)
    const foundData = lookup[subTreeHash]
    if (foundData !== undefined) {
      // console.log('foundData', foundData.subTree)
      finalResult.push(foundData.geom)
    } else {
      const subTreeGeom = generate(indy)
      lookup[subTreeHash] = subTreeGeom
      finalResult.push(subTreeGeom)
    }
  })
  return finalResult
}

let start = process.hrtime()
console.log('start optimised, first iteration')
let results = require('./examples/complex-vtree')()
const subTrees = findDisconnectedSubGraphs(results)
buildFinalResult(subTrees)
let elapsed = process.hrtime(start)[1] / 1000000

console.log('optimised time', elapsed, 'ms')

console.log('start optimised, changed one of output of main() (array of csgs)')
start = process.hrtime()
let resultsChanged = require('./examples/complex-vtree-changed')()
const subTreesChanged = findDisconnectedSubGraphs(resultsChanged)
buildFinalResult(subTreesChanged)

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

// let geomResults = generateTree(results)

/* writeOutput('foo.stl', generate(results))
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
