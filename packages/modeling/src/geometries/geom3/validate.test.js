import test from 'ava'

import * as vec3 from '../../maths/vec3/index.js'
import { fromPoints, validate } from './index.js'

// tetrahedron
const a = vec3.fromValues(-1, -1, 1)
const b = vec3.fromValues(-1, 1, -1)
const c = vec3.fromValues(1, -1, -1)
const d = vec3.fromValues(1, 1, 1)

test('validate: allow valid geom3', (t) => {
  // simplest valid geometry
  const geometry = fromPoints([[a, b, c], [d, b, a], [d, a, c], [c, b, d]])
  t.notThrows(() => validate(geometry))
})

test('validate: throw exception for nan', (t) => {
  const geometry = fromPoints([[a, b, c], [d, b, a], [d, a, c], [c, b, [1, 1, NaN]]])
  t.throws(() => validate(geometry))
})

test('validate: throw exception for infinity', (t) => {
  const geometry = fromPoints([[a, b, c], [d, b, a], [d, a, c], [c, b, [1, 1, Infinity]]])
  t.throws(() => validate(geometry))
})
