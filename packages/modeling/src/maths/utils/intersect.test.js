import test from 'ava'

import { intersect } from './index.js'

//   A     __F
//  / \ __E
// B   D   \
//  \ /     \
//   C       G

const a = [0, 1]
const b = [-1, 0]
const c = [0, -1]
const d = [1, 0]
const e = [2, 0.5]
const f = [3, 1]
const g = [2, -1]

test('utils: intersect() for intersecting lines', (t) => {
  t.deepEqual(intersect(a, c, b, d), [0, 0])
  t.deepEqual(intersect(a, b, b, c), b)
  t.deepEqual(intersect(d, f, e, g), e)
})

test('utils: intersect() for non-intersecting lines', (t) => {
  t.is(intersect(a, a, b, c), undefined)
  t.is(intersect(a, d, b, c), undefined)
  t.is(intersect(a, b, d, e), undefined)
})

test('utils: intersect() endpointTouch parameter', (t) => {
  // endpoint touching
  t.deepEqual(intersect(a, b, b, c), b)
  t.deepEqual(intersect(a, b, b, c, true), b)
  t.deepEqual(intersect(a, b, b, c, false), undefined)
  t.deepEqual(intersect(d, f, e, g), e)
  t.deepEqual(intersect(d, f, e, g, true), e)
  t.deepEqual(intersect(d, f, e, g, false), undefined)
})
