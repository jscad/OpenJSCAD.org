const test = require('ava')

const { subtract } = require('../../../operations/booleans')
const rectangle = require('../../../primitives/rectangle')
const toTrees = require('./toTrees')

test('slice: toTrees() should return a polygon hierarchy', (t) => {
  const exp1 = [{
    solid: [
      [-3.000013333333334, -3.000013333333334],
      [3.000013333333334, -3.000013333333334],
      [3.000013333333334, 3.000013333333334],
      [-3.000013333333334, 3.000013333333334]
    ],
    holes: [[
      [-1.9999933333333335, 1.9999933333333335],
      [1.9999933333333335, 1.9999933333333335],
      [1.9999933333333335, -1.9999933333333335],
      [-1.9999933333333335, -1.9999933333333335]
    ]]
  }]
  const geometry = subtract(
    rectangle({ size: [6, 6] }),
    rectangle({ size: [4, 4] })
  )
  const obs1 = toTrees(geometry)
  t.deepEqual(obs1, exp1)
})
