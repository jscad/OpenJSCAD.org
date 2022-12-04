import test from 'ava'

import { create, toOutlines } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

test('geom2: toOutlines() should return no outlines for empty geom2', (t) => {
  const shp1 = create()
  const exp1 = []
  const ret1 = toOutlines(shp1)
  t.true(comparePoints(exp1, ret1))
})

test('geom2: toOutlines() should return one or more outlines', (t) => {
  const shp1 = create([{vertices: [[-1, -1], [1, -1], [1, 1]]}])
  const ret1 = toOutlines(shp1)
  const exp1 = [
    [[-1, -1], [1, -1], [1, 1]]
  ]
  t.true(comparePoints(ret1[0].vertices, exp1[0]))

  const shp2 = create([
    {vertices: [[-1, -1], [1, -1], [1, 1]]},
    {vertices: [[4, 4], [6, 4], [6, 6]]}
  ])
  const ret2 = toOutlines(shp2)
  const exp2 = [
    [[-1, -1], [1, -1], [1, 1]],
    [[4, 4], [6, 4], [6, 6]]
  ]
  t.true(comparePoints(ret2[0].vertices, exp2[0]))
  t.true(comparePoints(ret2[1].vertices, exp2[1]))
})

test('geom2: toOutlines() should return outlines for holes in geom2', (t) => {
  const shp1 = create([
    {vertices: [[10, 10], [-10, -10], [10, -10]]},
    {vertices: [[5, -5], [6, -4], [6, -4]]}
  ])
  const ret1 = toOutlines(shp1)
  const exp1 = [
    [[10, 10], [-10, -10], [10, -10]],
    [[5, -5], [6, -4], [6, -4]]
  ]
  t.true(comparePoints(ret1[0].vertices, exp1[0]))
  t.true(comparePoints(ret1[1].vertices, exp1[1]))

  const shp2 = create([
    {vertices: [[6, -4], [5, -5], [6, -5]]},
    {vertices: [[10, 10], [-10, -10], [10, -10]]},
    {vertices: [[-6, -8], [8, 6], [8, -8]]}
  ])
  const ret2 = toOutlines(shp2)
  const exp2 = [
    [[6, -4], [5, -5], [6, -5]],
    [[10, 10], [-10, -10], [10, -10]],
    [[-6, -8], [8, 6], [8, -8]]
  ]
  t.true(comparePoints(ret2[0].vertices, exp2[0]))
  t.true(comparePoints(ret2[1].vertices, exp2[1]))
  t.true(comparePoints(ret2[2].vertices, exp2[2]))
})

test('geom2: toOutlines() should return outlines for edges that touch in geom2', (t) => {
  const shp1 = create([
    {vertices: [[5, 15], [5, 5], [15, 5], [15, 15]]},
    {vertices: [[-5, 5], [-5, -5], [5, -5], [5, 5]]}
  ])
  const ret1 = toOutlines(shp1)
  const exp1 = [
    [[5, 15], [5, 5], [15, 5], [15, 15]],
    [[-5, 5], [-5, -5], [5, -5], [5, 5]]
  ]
  t.true(comparePoints(ret1[0].vertices, exp1[0]))
  t.true(comparePoints(ret1[1].vertices, exp1[1]))
})

test('geom2: toOutlines() should return outlines for holes that touch in geom2', (t) => {
  const shp1 = create([
    {vertices: [[-20, 20], [-20, -20], [20, -20], [20, 20]]},
    {vertices: [[5, 5], [5, 15], [15, 15], [15, 5]]},
    {vertices: [[-5, -5], [-5, 5], [5, 5], [5, -5]]}
  ])
  const ret1 = toOutlines(shp1)
  const exp1 = [
    [[-20, 20], [-20, -20], [20, -20], [20, 20]],
    [[5, 5], [5, 15], [15, 15], [15, 5]],
    [[-5, -5], [-5, 5], [5, 5], [5, -5]]
  ]
  t.true(comparePoints(ret1[0].vertices, exp1[0]))
  t.true(comparePoints(ret1[1].vertices, exp1[1]))
  t.true(comparePoints(ret1[2].vertices, exp1[2]))
})

// touching holes
