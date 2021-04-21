const test = require('ava')
const { fromPoints, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: fromPoints() should return a new line3 with correct values', (t) => {
  let obs = fromPoints(create(), [0, 0, 0], [1, 0, 0])
  let pnt = obs[0]
  let dir = obs[1]
  t.true(compareVectors(pnt, [0, 0, 0]))
  t.true(compareVectors(dir, [1, 0, 0]))

  obs = fromPoints(create(), [1, 0, 0], [0, 1, 0])
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [1, 0, 0]))
  t.true(compareVectors(dir, [-0.7071067811865475, 0.7071067811865475, 0]))

  obs = fromPoints(create(), [0, 1, 0], [1, 0, 0])
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [0, 1, 0]))
  t.true(compareVectors(dir, [0.7071067811865475, -0.7071067811865475, 0]))

  obs = fromPoints(obs, [0, 6, 0], [0, 0, 6])
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [0, 6, 0]))
  t.true(compareVectors(dir, [0, -0.7071067811865475, 0.7071067811865475]))

  // line3 created from the same points results in an invalid line3
  obs = fromPoints(obs, [0, 5, 0], [0, 5, 0])
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [0, 5, 0]))
  t.true(compareVectors(dir, [NaN, NaN, NaN]))
})
