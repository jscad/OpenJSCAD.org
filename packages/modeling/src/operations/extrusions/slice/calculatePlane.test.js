const test = require('ava')

const { mat4 } = require('../../../maths')

const { calculatePlane, fromPoints, transform } = require('./index')

const { compareVectors } = require('../../../../test/helpers/index')

test('slice: calculatePlane() returns correct plans for various slices', (t) => {
  // do not do this... it's an error
  // const slice1 = create()
  // const plane1 = calculatePlane(slice1)

  const slice2 = fromPoints([[0, 0], [1, 0], [1, 1]])
  const plane2 = calculatePlane(slice2)
  t.true(compareVectors(plane2, [0, 0, 1, 0]))

  const slice3 = transform(mat4.fromXRotation(Math.PI / 2), slice2)
  const plane3 = calculatePlane(slice3)
  t.true(compareVectors(plane3, [0, -1, 0, 0]))

  const slice4 = transform(mat4.fromZRotation(Math.PI / 2), slice3)
  const plane4 = calculatePlane(slice4)
  t.true(compareVectors(plane4, [1, 0, 0, 0]))
})
