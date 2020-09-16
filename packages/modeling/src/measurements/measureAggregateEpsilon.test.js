const test = require('ava')
const { EPS } = require('../maths/constants')

const { cube, square } = require('../primitives')
const measureAggregateEpsilon = require('./measureAggregateEpsilon')

test('measureAggregateEpsilon (single objects)', (t) => {
  const aCube = cube({ size: 4, center: [4, 10, 20] })
  const calculatedEpsilon = measureAggregateEpsilon(aCube)
  const expectedEpsilon = EPS * 4
  t.is(calculatedEpsilon, expectedEpsilon)
})

test('measureAggregateEpsilon (multiple objects)', (t) => {
  const highCube = cube({ size: 4, center: [-40, 100, 20] })
  const lowCube = cube({ size: 60, center: [20, -10, 20] })
  const calculatedEpsilon = measureAggregateEpsilon(highCube, lowCube)
  const expectedEpsilon = EPS * 98
  t.is(calculatedEpsilon, expectedEpsilon)
})

test('measureAggregateEpsilon (multiple 2D objects)', (t) => {
  const highCube = cube({ size: 4, center: [-42, 100, 20] })
  const lowCube = square({ size: 60, center: [20, -10, 0] })
  const calculatedEpsilon = measureAggregateEpsilon(highCube, lowCube)
  const expectedEpsilon = EPS * 86
  t.is(calculatedEpsilon, expectedEpsilon)
})
