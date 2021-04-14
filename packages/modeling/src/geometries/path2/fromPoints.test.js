const test = require('ava')

const vec2 = require('../../maths/vec2')

const { fromPoints, toPoints, toString } = require('./index')

test('fromPoints: creating a path from no points produces an open, empty non-canonical path', (t) => {
  const created = fromPoints({}, [])
  t.false(created.isClosed)
  t.deepEqual(toPoints(created), [])
})

test('fromPoints: creating a path from one point produces a open, non-canonical path', (t) => {
  const created = fromPoints({}, [[1, 1]])
  toString(created)

  t.false(created.isClosed)
  t.deepEqual(toPoints(created), [vec2.fromValues(1, 1)])
})

test('fromPoints: creating a closed path from one point produces a closed, non-canonical path', (t) => {
  const created = fromPoints({ closed: true }, [[1, 1]])
  t.true(created.isClosed)
  t.deepEqual(toPoints(created), [vec2.fromValues(1, 1)])

  toString(created)
})

test('fromPoints: creating a path from a closed set of points creates a closed, non-canonical path', (t) => {
  const created = fromPoints({ closed: false }, [[0, 0], [1, 0], [1, 1], [0, 0]])
  t.true(created.isClosed)
  t.is(3, created.points.length) // the last given point is dropped
})
