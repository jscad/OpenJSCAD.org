import test from 'ava'

import { vec2 } from '../../maths/index.js'

import { toPoints, fromPoints } from './index.js'

test('toPoints: An empty path produces an empty point array', (t) => {
  t.deepEqual(toPoints(fromPoints({}, [])), [])
})

test('toPoints: An non-empty open path produces a matching point array', (t) => {
  t.deepEqual(toPoints(fromPoints({}, [[1, 1]])), [vec2.fromValues(1, 1)])
})
