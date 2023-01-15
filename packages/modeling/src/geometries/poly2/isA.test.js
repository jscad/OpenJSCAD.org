import test from 'ava'

import * as geom2 from '../geom2/index.js'
import * as geom3 from '../geom3/index.js'
import * as poly3 from '../poly3/index.js'
import { isA, create } from './index.js'

test('isA: identifies created poly2', (t) => {
  const p1 = create()
  const p2 = create([[0, 0], [1, 0], [1, 1]])
  t.true(isA(p1))
  t.true(isA(p2))
})

test('isA: identifies non poly2', (t) => {
  const p1 = null
  const p2 = {}
  const p3 = { points: 1 }
  const p4 = { vertices: 1 }
  const p5 = geom2.create()
  const p6 = geom3.create()
  const p7 = poly3.create()
  t.false(isA(p1))
  t.false(isA(p2))
  t.false(isA(p3))
  t.false(isA(p4))
  t.false(isA(p5))
  t.false(isA(p6))
  t.false(isA(p7))
})
