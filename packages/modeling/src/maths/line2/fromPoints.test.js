const test = require('ava')
const { fromPoints, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: fromPoints() should return a new line2 with correct values', (t) => {
  const out = create()

  const obs1 = fromPoints(out, [0, 0], [0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))

  const obs2 = fromPoints(out, [1, 0], [0, 1])
  t.true(compareVectors(obs2, [-0.7071067811865476, -0.7071067811865475, -0.7071067811865476]))

  const obs3 = fromPoints(out, [0, 1], [1, 0])
  t.true(compareVectors(obs3, [0.7071067811865476, 0.7071067811865475, 0.7071067811865475]))

  const obs4 = fromPoints(out, [0, 6], [6, 0])
  t.true(compareVectors(obs4, [0.7071067811865476, 0.7071067811865476, 4.242640687119286]))

  // line2 created from the same points results in an invalid line2
  const obs9 = fromPoints(out, [0, 5], [0, 5])
  t.true(compareVectors(obs9, [0, 0, 0]))
})
