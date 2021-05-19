const test = require('ava')
const { fromPointAndDirection, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: fromPointAndDirection() should return a new line3 with correct values', (t) => {
  let obs = fromPointAndDirection(create(), [0, 0, 0], [1, 0, 0])
  let pnt = obs[0]
  let dir = obs[1]
  t.true(compareVectors(pnt, [0, 0, 0]))
  t.true(compareVectors(dir, [1, 0, 0]))

  obs = fromPointAndDirection(create(), [1, 0, 0], [0, 2, 0])
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [1, 0, 0]))
  t.true(compareVectors(dir, [0, 1, 0]))

  obs = fromPointAndDirection(create(), [0, 1, 0], [3, 0, 0])
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [0, 1, 0]))
  t.true(compareVectors(dir, [1, 0, 0]))

  obs = fromPointAndDirection(create(), [0, 0, 1], [0, 0, 4])
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [0, 0, 1]))
  t.true(compareVectors(dir, [0, 0, 1]))

  // line3 created from a bad direction results in an invalid line3
  obs = fromPointAndDirection(create(), [0, 5, 0], [0, 0, 0])
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [0, 5, 0]))
  t.true(compareVectors(dir, [NaN, NaN, NaN]))
})
