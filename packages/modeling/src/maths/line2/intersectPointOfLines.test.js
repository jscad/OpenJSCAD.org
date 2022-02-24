const test = require('ava')
const { intersectPointOfLines, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: intersectPointOfLines() should return proper points', (t) => {
  const line1 = create()

  const line2 = fromPoints(create(), [1, 0], [0, 1])
  const int2 = intersectPointOfLines(line1, line2)
  t.true(compareVectors(int2, [1, 0]))

  // same lines opposite directions
  const line3 = fromPoints(create(), [0, 1], [1, 0])
  const int3 = intersectPointOfLines(line3, line2)
  t.true(compareVectors(int3, [NaN, NaN]))

  // parallel lines
  const line4 = fromPoints(create(), [0, 6], [6, 0])
  const int4 = intersectPointOfLines(line4, line3)
  t.true(compareVectors(int4, [Infinity, -Infinity]))

  // intersecting lines
  const line5 = fromPoints(create(), [0, -6], [6, 0])
  const int5 = intersectPointOfLines(line5, line4)
  t.true(compareVectors(int5, [6, 0], 1e-15))

  const line6 = fromPoints(create(), [-6, 0], [0, -6])
  const int6 = intersectPointOfLines(line6, line5)
  t.true(compareVectors(int6, [0, -6], 1e-15))
})
