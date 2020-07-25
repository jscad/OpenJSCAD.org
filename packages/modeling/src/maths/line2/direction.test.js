const test = require('ava')

const { direction, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: direction() should return proper direction', (t) => {
  const line1 = create()
  const dir1 = direction(line1)
  t.true(compareVectors(dir1, [1, 0]))

  const line2 = fromPoints([1, 0], [0, 1])
  const dir2 = direction(line2)
  t.true(compareVectors(dir2, [-0.7071067811865475, 0.7071067811865476]))

  const line3 = fromPoints([0, 1], [1, 0])
  const dir3 = direction(line3)
  t.true(compareVectors(dir3, [0.7071067811865475, -0.7071067811865476]))

  const line4 = fromPoints([0, 0], [6, 0])
  const dir4 = direction(line4)
  t.true(compareVectors(dir4, [1, 0], 1e-15))

  const line5 = fromPoints([-5, 5], [5, -5])
  const dir5 = direction(line5)
  t.true(compareVectors(dir5, [0.7071067811865475, -0.7071067811865475]))
})
