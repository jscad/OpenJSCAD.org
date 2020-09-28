const test = require('ava')

const { EPS } = require('../maths/constants')
const calculateEpsilonFromBounds = require('./calculateEpsilonFromBounds')

test('calculateEpsilonFromBounds: 2 dimension', (t) => {
  const bounds = [[-10, -100], [100, 10]]
  const calculatedEpsilon = calculateEpsilonFromBounds(bounds, 2)
  const expectedEpsilon = EPS * 110
  t.is(calculatedEpsilon, expectedEpsilon)
})

test('calculateEpsilonFromBounds: 3 dimension', (t) => {
  const bounds = [[-500, 0, -100], [0, 500, 100]]
  const calculatedEpsilon = calculateEpsilonFromBounds(bounds, 3)
  const expectedEpsilon = EPS * 400
  t.is(calculatedEpsilon, expectedEpsilon)
})
