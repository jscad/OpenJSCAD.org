import test from 'ava'

import { equals, fromValues } from './index.js'

test('vec2: equals() should return correct booleans', (t) => {
  const vec0 = fromValues(0, 0)
  const vec1 = fromValues(0, 0)
  t.true(equals(vec0, vec1))

  const vec2 = fromValues(1, 1)
  t.false(equals(vec0, vec2))

  const vec3 = fromValues(1, 0)
  t.false(equals(vec0, vec3))

  const vec4 = fromValues(0, 1)
  t.false(equals(vec0, vec4))
})
