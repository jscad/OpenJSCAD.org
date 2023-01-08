import test from 'ava'

import { isA, create } from './index.js'

test('isA: identifies created poly3', (t) => {
  const p1 = create()
  const p2 = create([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  t.true(isA(p1))
  t.true(isA(p2))
})

test('isA: identifies non poly3', (t) => {
  const p1 = null
  const p2 = {}
  const p3 = { vertices: 1 }
  t.false(isA(p1))
  t.false(isA(p2))
  t.false(isA(p3))
})
