import test from 'ava'

import { create } from './index.js'

import { comparePolygons } from '../../../test/helpers/index.js'

test('poly3: create() should return an empty poly3', (t) => {
  const obs = create()
  const exp = { vertices: [] }
  t.deepEqual(obs, exp)
})

test('poly3: create() should return a new poly3 with correct values', (t) => {
  const exp1 = { vertices: [[0, 0, 0], [1, 0, 0], [1, 1, 0]] }
  const obs1 = create([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  t.true(comparePolygons(obs1, exp1))

  const exp2 = { vertices: [[1, 1, 0], [1, 0, 0], [0, 0, 0]] }
  const obs2 = create([[1, 1, 0], [1, 0, 0], [0, 0, 0]]) // opposite orientation
  t.true(comparePolygons(obs2, exp2))
})
