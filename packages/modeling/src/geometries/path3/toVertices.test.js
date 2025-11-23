import test from 'ava'

import { vec3 } from '../../maths/index.js'

import { toVertices, fromVertices } from './index.js'

test('toVertices: An empty path produces an empty point array', (t) => {
  t.deepEqual(toVertices(fromVertices({}, [])), [])
})

test('toVertices: An non-empty open path produces a matching point array', (t) => {
  t.deepEqual(toVertices(fromVertices({}, [[1, 1, 0]])), [vec3.fromValues(1, 1, 0)])
})
