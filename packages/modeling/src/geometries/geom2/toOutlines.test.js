const test = require('ava')

const { create } = require('./index')

const { comparePoints } = require('../../../test/helpers')

const toOutlines = require('./toOutlines')

test('geom2: toOutlines() should return no outlines for empty geom2', (t) => {
  const shp1 = create()
  const exp1 = []
  const ret1 = toOutlines(shp1)
  t.true(comparePoints(exp1, ret1))
})

test('geom2: toOutlines() should return one or more outlines', (t) => {
  const shp1 = create([[[-1, -1], [1, -1]],
    [[1, -1], [1, 1]],
    [[1, 1], [-1, -1]]])
  const ret1 = toOutlines(shp1)
  const exp1 = [
    [[1, -1], [1, 1], [-1, -1]]
  ]
  t.true(comparePoints(ret1[0], exp1[0]))

  const shp2 = create([[[-1, -1], [1, -1]],
    [[1, -1], [1, 1]],
    [[1, 1], [-1, -1]],
    [[4, 4], [6, 4]],
    [[6, 4], [6, 6]],
    [[6, 6], [4, 4]]])
  const ret2 = toOutlines(shp2)
  const exp2 = [
    [[1, -1], [1, 1], [-1, -1]],
    [[6, 4], [6, 6], [4, 4]]
  ]
  t.true(comparePoints(ret2[0], exp2[0]))
  t.true(comparePoints(ret2[1], exp2[1]))
})

test('geom2: toOutlines() should return outlines for holes in geom2', (t) => {
  const shp1 = create([[[10, 10], [-10, -10]],
    [[-10, -10], [10, -10]],
    [[10, -10], [10, 10]],
    [[5, -5], [6, -4]],
    [[6, -5], [5, -5]],
    [[6, -4], [6, -5]]])
  const ret1 = toOutlines(shp1)
  const exp1 = [
    [[-10, -10], [10, -10], [10, 10]],
    [[6, -4], [6, -5], [5, -5]]
  ]
  t.true(comparePoints(ret1[0], exp1[0]))
  t.true(comparePoints(ret1[1], exp1[1]))

  const shp2 = create([[[6, -4], [5, -5]],
    [[5, -5], [6, -5]],
    [[6, -5], [6, -4]],
    [[10, 10], [-10, -10]],
    [[-10, -10], [10, -10]],
    [[10, -10], [10, 10]],
    [[-6, -8], [8, 6]],
    [[8, -8], [-6, -8]],
    [[8, 6], [8, -8]]])
  const ret2 = toOutlines(shp2)
  const exp2 = [
    [[5, -5], [6, -5], [6, -4]],
    [[-10, -10], [10, -10], [10, 10]],
    [[8, 6], [8, -8], [-6, -8]]
  ]
  t.true(comparePoints(ret2[0], exp2[0]))
  t.true(comparePoints(ret2[1], exp2[1]))
  t.true(comparePoints(ret2[2], exp2[2]))
})

test('geom2: toOutlines() should return outlines for edges that touch in geom2', (t) => {
  const shp1 = create([
    [[5, 15], [5, 5]],
    [[5, 5], [15, 5]],
    [[15, 5], [15, 15]],
    [[15, 15], [5, 15]],
    [[-5, 5], [-5, -5]],
    [[-5, -5], [5, -5]],
    [[5, -5], [5, 5]],
    [[5, 5], [-5, 5]]
  ])
  const ret1 = toOutlines(shp1)
  const exp1 = [
    [[5, 5], [15, 5], [15, 15], [5, 15]],
    [[-5, 5], [-5, -5], [5, -5], [5, 5]]
  ]
  t.true(comparePoints(ret1[0], exp1[0]))
  t.true(comparePoints(ret1[1], exp1[1]))
})

test('geom2: toOutlines() should return outlines for holes that touch in geom2', (t) => {
  const shp1 = create([
    [[-20, 20], [-20, -20]],
    [[-20, -20], [20, -20]],
    [[20, -20], [20, 20]],
    [[20, 20], [-20, 20]],
    [[5, 5], [5, 15]],
    [[15, 5], [5, 5]],
    [[15, 15], [15, 5]],
    [[5, 15], [15, 15]],
    [[-5, -5], [-5, 5]],
    [[5, -5], [-5, -5]],
    [[5, 5], [5, -5]],
    [[-5, 5], [5, 5]]
  ])
  const ret1 = toOutlines(shp1)
  const exp1 = [
    [[-20, -20], [20, -20], [20, 20], [-20, 20]],
    [[5, 15], [15, 15], [15, 5], [5, 5]],
    [[5, -5], [-5, -5], [-5, 5], [5, 5]]
  ]
  t.true(comparePoints(ret1[0], exp1[0]))
  t.true(comparePoints(ret1[1], exp1[1]))
  t.true(comparePoints(ret1[2], exp1[2]))
})

// touching holes
