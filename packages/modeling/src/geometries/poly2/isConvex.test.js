import test from 'ava'

import { isConvex, create } from './index.js'

test('poly3: isConvex() should return correct values', (t) => {
  const ply1 = create()
  t.true(isConvex(ply1))

  const ply2 = create([[0, 0], [1, 0], [1, 1]])
  t.true(isConvex(ply2))

  // Counter Clockwise
  const ply3 = create([[5, 5], [5, -5], [-5, -5], [-5, 5]])
  t.true(isConvex(ply3))

  // Clockwise
  const ply4 = create([[5, 5], [-5, 5], [-5, -5], [5, -5]])
  t.true(isConvex(ply4))

  // CCW With V-side
  const ply5 = create([[5, 5], [5, -5], [0, 0], [-5, -5], [-5, 5]])
  t.false(isConvex(ply5))

  // STAR
  const ply6 = create([[0, 0], [5, 5], [5, -5], [0, 0], [-5, -5], [-5, 5]])
  t.false(isConvex(ply6))
})
