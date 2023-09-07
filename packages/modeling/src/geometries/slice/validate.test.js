import test from 'ava'

import * as vec3 from '../../maths/vec3/index.js'
import { create, validate } from './index.js'

// points of a triangle
const a = vec3.fromValues(0, 0, 2)
const b = vec3.fromValues(1, 0, 2)
const c = vec3.fromValues(1, 1, 2)
// non-coplanar
const d = vec3.fromValues(0, 0, 0)

test('validate: allow valid slice', (t) => {
  const geometry = create([[a, b, c]])
  t.notThrows(() => validate(geometry))
})

test('validate: throw exception for non-coplanar contours', (t) => {
  const geometry = create([[a, b, c], [a, b, d]])
  t.throws(() => validate(geometry))
})

test('validate: throw exception for duplicate points', (t) => {
  const geometry = create([[a, b, c, a]])
  t.throws(() => validate(geometry))
})

test('validate: throw exception for NaN', (t) => {
  const geometry = create([[a, b, c, [0, 0, NaN]]])
  t.throws(() => validate(geometry))
})

test('validate: throw exception for infinity', (t) => {
  const geometry = create([[a, b, c, [0, 0, Infinity]]])
  t.throws(() => validate(geometry))
})
