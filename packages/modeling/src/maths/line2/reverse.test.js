const test = require('ava')
const { reverse, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: reverse() called with two parameters should update a line2 with proper values', (t) => {
  const line1 = create()
  const obs1 = create()
  const ret1 = reverse(obs1, line1)
  t.true(compareVectors(ret1, [0, -1, 0]))
  t.true(compareVectors(obs1, [0, -1, 0]))

  const line2 = fromPoints(create(), [1, 0], [0, 1])
  const obs2 = create()
  const ret2 = reverse(obs2, line2)
  t.true(compareVectors(ret2, [0.7071067811865476, 0.7071067811865475, 0.7071067811865476]))
  t.true(compareVectors(obs2, [0.7071067811865476, 0.7071067811865475, 0.7071067811865476]))

  const line3 = fromPoints(create(), [0, 1], [1, 0])
  const obs3 = create()
  const ret3 = reverse(obs3, line3)
  t.true(compareVectors(ret3, [-0.7071067811865476, -0.7071067811865475, -0.7071067811865475]))
  t.true(compareVectors(obs3, [-0.7071067811865476, -0.7071067811865475, -0.7071067811865475]))

  const line4 = fromPoints(create(), [0, 6], [6, 0])
  const obs4 = create()
  const ret4 = reverse(obs4, line4)
  t.true(compareVectors(ret4, [-0.7071067811865476, -0.7071067811865476, -4.242640687119286]))
  t.true(compareVectors(obs4, [-0.7071067811865476, -0.7071067811865476, -4.242640687119286]))

  const line5 = fromPoints(create(), [-5, 5], [5, -5])
  const obs5 = create()
  const ret5 = reverse(obs5, line5)
  t.true(compareVectors(ret5, [-0.7071067811865475, -0.7071067811865475, -0]))
  t.true(compareVectors(obs5, [-0.7071067811865475, -0.7071067811865475, -0]))
})
