const test = require('ava')
const { direction, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: direction() should return proper direction', (t) => {
  const line1 = create()
  const dir1 = direction(line1)
  t.true(compareVectors(dir1, [0, 0, 1]))

  const line2 = fromPoints(line1, [1, 0, 0], [0, 1, 0])
  const dir2 = direction(line2)
  t.true(compareVectors(dir2, [-0.7071067811865475, 0.7071067811865475, 0]))

  const line3 = fromPoints(line1, [0, 1, 0], [1, 0, 0])
  const dir3 = direction(line3)
  t.true(compareVectors(dir3, [0.7071067811865475, -0.7071067811865475, 0]))

  const line4 = fromPoints(line1, [0, 0, 1], [0, 0, -6])
  const dir4 = direction(line4)
  t.true(compareVectors(dir4, [0, 0, -1]))

  const line5 = fromPoints(line1, [-5, -5, -5], [5, 5, 5])
  const dir5 = direction(line5)
  t.true(compareVectors(dir5, [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))
})
