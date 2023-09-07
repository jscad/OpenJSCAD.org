import test from 'ava'

import * as vec2 from '../vec2/index.js'
import { intersect } from './intersect.js'

//   A     __F
//  / \ __E
// B   D   \
//  \ /     \
//   C       G

const a = vec2.fromValues(0, 1)
const b = vec2.fromValues(-1, 0)
const c = vec2.fromValues(0, -1)
const d = vec2.fromValues(1, 0)
const e = vec2.fromValues(2, 0.5)
const f = vec2.fromValues(3, 1)
const g = vec2.fromValues(2, -1)

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
