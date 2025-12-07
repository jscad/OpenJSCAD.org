import test from 'ava'

import { vec3 } from '../../maths/index.js'

import { fromVertices, toVertices, toString } from './index.js'

test('fromVertices: creating a path from no vertices produces an open, empty non-canonical path', (t) => {
  const created = fromVertices({}, [])
  t.false(created.isClosed)
  t.deepEqual(toVertices(created), [])
})

test('fromVertices: creating a path from one point produces a open, non-canonical path', (t) => {
  const created = fromVertices({}, [[1, 1, 0]])
  toString(created)

  t.false(created.isClosed)
  t.deepEqual(toVertices(created), [vec3.fromValues(1, 1, 0)])
})

test('fromVertices: creating a closed path from one point produces a closed, non-canonical path', (t) => {
  const created = fromVertices({ closed: true }, [[1, 1, 0]])
  t.true(created.isClosed)
  t.deepEqual(toVertices(created), [vec3.fromValues(1, 1, 0)])

  toString(created)
})

test('fromVertices: creating a path from a closed set of vertices creates a closed, non-canonical path', (t) => {
  const created = fromVertices({ closed: false }, [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 0, 0]])
  t.true(created.isClosed)
  t.is(3, created.vertices.length) // the last given point is dropped
})
