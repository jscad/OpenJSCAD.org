const generate = require('../core/geometry-generator')
const generateTree = require('../core/geometry-tree-generator')
const decache = require('decache')

function runCompare (basePath, runs = 10) {
  console.log('running benchmarks for ' + basePath)

  let moduleNameVanilla = basePath + '-base'
  let moduleNameVtree = basePath + '-vtree'
  // first verify they all have the same output
  const baseLinePolyCount = runVanilla(moduleNameVanilla)
  if (baseLinePolyCount !== runVTreeTree(moduleNameVtree)) {
    throw new Error(`Mismatch of polygon count in vtree-tree mode!! should be ${baseLinePolyCount}`)
  }
  if (baseLinePolyCount !== runVTree(moduleNameVtree)) {
    throw new Error(`Mismatch of polygon count in vtree-base mode!! should be ${baseLinePolyCount}`)
  }

  // run passes of each variants multiple times
  runPass(moduleNameVtree, runVTreeTree, runs, 'vtree treegen ')
  runPass(moduleNameVtree, runVTree, runs, 'vtree gen ')
  runPass(moduleNameVanilla, runVanilla, runs, 'vanilla ')
}

const runPass = (moduleName, runFn, runs, name) => {
  const precision = 3 // 3 decimal places
  let elapsed
  let start

  let numbers = []
  for (var i = 0; i < runs; i++) {
    // decache(moduleName)

    start = process.hrtime()
    runFn(moduleName)
    // measure
    elapsed = process.hrtime(start)[1] / 1000000
    numbers.push(elapsed)
  }
  const total = median(numbers)
  console.log(name + total.toFixed(precision) + ' ms')
  // console.log(name + process.hrtime(start)[0] + ' s, ' + elapsed.toFixed(precision) + ' ms - ')
}

const runVanilla = (moduleName) => {
  const resultPolys = require(moduleName)().polygons.length
  return resultPolys
}

const runVTreeTree = (moduleName) => {
  let results = require(moduleName)()
  const resultPolys = generateTree(results).geometry.polygons.length
  return resultPolys
}

const runVTree = (moduleName) => {
  let results = require(moduleName)()
  const resultPolys = generate(results).polygons.length
  return resultPolys
}

const median = sequence => {
  sequence.sort()  // note that direction doesn't matter
  return sequence[Math.ceil(sequence.length / 2)]
}

module.exports = runCompare
