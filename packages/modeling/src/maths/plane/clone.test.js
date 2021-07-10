const test = require('ava')
const { clone, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('plane: clone() with one param should update a new plane with same values', (t) => {
  const plane1 = fromValues(0, 0, 0, 0)
  const ret1 = clone(plane1)
  t.true(compareVectors(plane1, [0, 0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0, 0]))
  t.not(ret1, plane1)

  const plane2 = fromValues(1, 2, 3, 4)
  const ret2 = clone(plane2)
  t.true(compareVectors(plane2, [1, 2, 3, 4]))
  t.true(compareVectors(ret2, [1, 2, 3, 4]))
  t.not(ret2, plane2)

  const plane3 = fromValues(-1, -2, -3, -4)
  const ret3 = clone(plane3)
  t.true(compareVectors(plane3, [-1, -2, -3, -4]))
  t.true(compareVectors(ret3, [-1, -2, -3, -4]))
  t.not(ret3, plane3)
})
