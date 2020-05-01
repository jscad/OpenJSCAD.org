const { toArray } = require('@jscad/array-utils')
const decache = require('decache')
const child_process = require('child_process')

function runBenchMark (runFn, name, runs = 10) {
  console.log('running benchmarks for ' + name + ' ' + runs + ' times')

  // first verify they all have the same output
  /* const baseLinePolyCounts = runVanilla(moduleNameVanilla)
  if (!samePolygonCount(baseLinePolyCounts, runVTreeTree(moduleNameVtree))) {
    throw new Error(`Mismatch of polygon count in vtree-tree mode!! should be ${baseLinePolyCounts}`)
  }
  if (!samePolygonCount(baseLinePolyCounts, runVTree(moduleNameVtree))) {
    throw new Error(`Mismatch of polygon count in vtree-base mode!! should be ${baseLinePolyCounts}`)
  } */

  // run passes of each variants multiple times
  runPass(runFn, runs, name)
}

function spawnBenchMark (path, runs = 100) {
  const usage = require('usage')
  let cpuNumbers = []
  let memNumbers = []

  const process = child_process.spawn('node', [path, runs])

  const pid = process.pid // you can use any valid PID instead
  const measureInterval = setInterval(function () {
    usage.lookup(pid, function (err, result) {
      if (err) {
        console.log('error?', err)
      }
      let { cpu, memory } = result
      cpuNumbers.push(cpu)
      memNumbers.push(memory / (1024 * 1024))
      // console.log('result' + path, 'memory:',memory/1000, 'cpu:', cpu)
    })
  }, 1000)

  process.stdout.on('data', function (data) {
    console.log('' + data)
  })

  process.stderr.on('data', function (data) {
    console.log('' + data)
  })

  process.on('close', function (code) {
    // console.log('Child process is exiting with exit code: ' + code)
    clearInterval(measureInterval)

    const cpuMedian = median(cpuNumbers)
    const memMedian = Math.floor(median(memNumbers))
    console.log('median CPU for ', path, cpuMedian, '%')
    console.log('median MEM for ', path, memMedian, 'MB')
  })
}

const runPass = (runFn, runs, name) => {
  const precision = 3 // 3 decimal places
  let elapsed
  let start

  let numbers = []
  for (var i = 0; i < runs; i++) {
    // decache(moduleName)

    start = process.hrtime()
    runFn()
    // measure
    elapsed = process.hrtime(start)[1] / 1000000
    numbers.push(elapsed)
  }
  const total = median(numbers)
  console.log(name + ' ' + total.toFixed(precision) + ' ms')
  // console.log(name + process.hrtime(start)[0] + ' s, ' + elapsed.toFixed(precision) + ' ms - ')
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
  runBenchMark,
  spawnBenchMark
}
