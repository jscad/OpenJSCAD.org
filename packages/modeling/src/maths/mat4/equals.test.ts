import test from 'ava'
import equals from './equals'

import Mat4 from '../mat4/type'

test('vec3: equals() should return correct booleans', (t) => {
  const veca: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const vecb: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  t.true(equals(veca, vecb))

  const vecb0: Mat4 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb0))

  const vecb1: Mat4 = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb1))

  const vecb2: Mat4 = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb2))

  const vecb3: Mat4 = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb3))

  const vecb4: Mat4 = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb4))

  const vecb5: Mat4 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb5))

  const vecb6: Mat4 = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb6))

  const vecb7: Mat4 = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb7))

  const vecb8: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb8))

  const vecb9: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb9))

  const vecb10: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
  t.false(equals(veca, vecb10))

  const vecb11: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
  t.false(equals(veca, vecb11))

  const vecb12: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
  t.false(equals(veca, vecb12))

  const vecb13: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
  t.false(equals(veca, vecb13))

  const vecb14: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
  t.false(equals(veca, vecb14))

  const vecb15: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  t.false(equals(veca, vecb15))
})
