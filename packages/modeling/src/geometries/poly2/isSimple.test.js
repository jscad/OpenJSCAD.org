import test from 'ava'

import { isSimple, create } from './index.js'

test('poly2: isSimple() should return correct values', (t) => {
  const ply1 = create()
  t.false(isSimple(ply1))

  const ply2 = create([[0, 0], [1, 0], [1, 1]])
  t.true(isSimple(ply2))

  // Clockwise
  const ply3 = create([[5, 5], [5, -5], [-5, -5], [-5, 5]])
  t.true(isSimple(ply3))

  // Counter Clockwise
  const ply4 = create([[5, 5], [-5, 5], [-5, -5], [5, -5]])
  t.true(isSimple(ply4))

  // CW With V-side
  const ply5 = create([[5, 5], [5, -5], [0, 0], [-5, -5], [-5, 5]])
  t.true(isSimple(ply5))

  // STAR
  const ply6 = create([[0, 0], [5, 5], [5, -5], [0, 0], [-5, -5], [-5, 5]])
  t.false(isSimple(ply6))

  // CROSSING
  const ply7 = create([[5, 5], [5, -5], [-5, 5], [-5, -5]])
  t.false(isSimple(ply7))
})
