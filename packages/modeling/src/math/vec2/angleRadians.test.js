const test = require('ava')
const { angleRadians } = require('./index')

const { nearlyEqual } = require('../../../test/helpers/index')
const { EPS } = require('../constants')

test('vec2: angleRadians() should return correct values', (t) => {
  const distance1 = angleRadians([0, 0])
  nearlyEqual(t, distance1, 0.0, EPS)

  const distance2 = angleRadians([1, 2])
  nearlyEqual(t, distance2, 1.1071487177940904, EPS)

  const distance3 = angleRadians([1, -2])
  nearlyEqual(t, distance3, -1.1071487177940904, EPS)

  const distance4 = angleRadians([-1, -2])
  nearlyEqual(t, distance4, -2.0344439357957027, EPS)

  const distance5 = angleRadians([-1, 2])
  nearlyEqual(t, distance5, 2.0344439357957027, EPS)

  t.true(true)
})
