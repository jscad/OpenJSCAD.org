import test from 'ava'

import { cube, square } from '../primitives/index.js'

import { areAllShapesTheSameType } from './index.js'

test('utils: areAllShapesTheSameType() should return correct values', (t) => {
  const geometry2 = square()
  const geometry3 = cube()

  t.true(areAllShapesTheSameType([]))
  t.true(areAllShapesTheSameType([geometry2]))
  t.true(areAllShapesTheSameType([geometry3]))
  t.true(areAllShapesTheSameType([geometry2, geometry2]))
  t.true(areAllShapesTheSameType([geometry3, geometry3]))
  t.false(areAllShapesTheSameType([geometry2, geometry3]))
})
