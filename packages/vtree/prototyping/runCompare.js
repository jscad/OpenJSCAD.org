const generate = require('../core/geometry-generator-cached')
const decache = require('decache')
const { toArray } = require('@jscad/array-utils')

function runCompare (basePath, runs = 10) {
  console.log('running benchmarks for ' + basePath)

  let moduleNameVanilla = basePath + '-base'
  let moduleNameVtree = basePath + '-vtree'
  // first verify they all have the same output
  const baseLinePolyCounts = runVanilla(moduleNameVanilla)
  if (!samePolygonCount(baseLinePolyCounts, runVTreeTree(moduleNameVtree))) {
    throw new Error(`Mismatch of polygon count in vtree-tree mode!! should be ${baseLinePolyCounts}`)
  }
  if (!samePolygonCount(baseLinePolyCounts, runVTree(moduleNameVtree))) {
    throw new Error(`Mismatch of polygon count in vtree-base mode!! should be ${baseLinePolyCounts}`)
  }

  // run passes of each variants multiple times
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
  const results = toArray(require(moduleName)())
  const resultPolys = results.map(r => r.polygons.length)
  return resultPolys
}
const runVTree = (moduleName) => {
  let results = require(moduleName)()
  results = toArray(generate(results))
  const resultPolys = results.map(r => r.polygons.length)
  return resultPolys
}

const median = sequence => {
  sequence.sort() // note that direction doesn't matter
  return sequence[Math.ceil(sequence.length / 2)]
}

const samePolygonCount = (a, b) => {
  if (a.length !== b.length) {
    return false
  }
  a.forEach((polycount, index) => {
    if (polycount !== b[index]) {
      return false
    }
  })
  return true
}

module.exports = {
  runCompare,
  runVanilla,
  runVTree
}
