import test from 'ava'

import { geom2, geom3, path2, slice } from '../geometries/index.js'

import { line, rectangle, cuboid } from '../primitives/index.js'

import { mirror, scale } from '../operations/transforms/index.js'

import { measureBoundingBox } from './index.js'

test('measureBoundingBox (single objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle()
  const acube = cuboid()

  const apath2 = path2.create()
  const ageom2 = geom2.create()
  const ageom3 = geom3.create()
  const aslice = slice.create()

  const n = null
  const o = {}
  const x = 'hi'

  const lbounds = measureBoundingBox(aline)
  const rbounds = measureBoundingBox(arect)
  const cbounds = measureBoundingBox(acube)

  const p2bounds = measureBoundingBox(apath2)
  const g2bounds = measureBoundingBox(ageom2)
  const g3bounds = measureBoundingBox(ageom3)
  const slbounds = measureBoundingBox(aslice)

  const nbounds = measureBoundingBox(n)
  const obounds = measureBoundingBox(o)
  const xbounds = measureBoundingBox(x)

  t.deepEqual(lbounds, [[10, 10, 0], [15, 15, 0]])
  t.deepEqual(rbounds, [[-1, -1, 0], [1, 1, 0]])
  t.deepEqual(cbounds, [[-1, -1, -1], [1, 1, 1]])

  t.deepEqual(p2bounds, [[0, 0, 0], [0, 0, 0]])
  t.deepEqual(g2bounds, [[0, 0, 0], [0, 0, 0]])
  t.deepEqual(g3bounds, [[0, 0, 0], [0, 0, 0]])
  t.deepEqual(slbounds, [[0, 0, 0], [0, 0, 0]])

  t.deepEqual(nbounds, [[0, 0, 0], [0, 0, 0]])
  t.deepEqual(obounds, [[0, 0, 0], [0, 0, 0]])
  t.deepEqual(xbounds, [[0, 0, 0], [0, 0, 0]])
})

test('measureBoundingBox (multiple objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ size: [10, 20] })
  const acube = cuboid()
  const o = {}

  let allbounds = measureBoundingBox(aline, arect, acube, o)
  t.deepEqual(allbounds, [[[10, 10, 0], [15, 15, 0]], [[-5, -10, 0], [5, 10, 0]], [[-1, -1, -1], [1, 1, 1]], [[0, 0, 0], [0, 0, 0]]])

  allbounds = measureBoundingBox(aline, arect, acube, o)
  t.deepEqual(allbounds, [[[10, 10, 0], [15, 15, 0]], [[-5, -10, 0], [5, 10, 0]], [[-1, -1, -1], [1, 1, 1]], [[0, 0, 0], [0, 0, 0]]])
})

test('measureBoundingBox invert', (t) => {
  const acube = mirror({}, cuboid())
  const cbounds = measureBoundingBox(acube)
  t.deepEqual(cbounds, [[-1, -1, -1], [1, 1, 1]])
})

test('measureBoundingBox empty', (t) => {
  const empty = [[0, 0, 0], [0, 0, 0]]
  t.deepEqual(measureBoundingBox(geom2.create()), empty)
  t.deepEqual(measureBoundingBox(geom3.create()), empty)
  t.deepEqual(measureBoundingBox(path2.create()), empty)
  t.deepEqual(measureBoundingBox(slice.create()), empty)
})

test('measureBoundingBox scaled', (t) => {
  const arect = scale([2, 2, 2], rectangle())
  const rbounds = measureBoundingBox(arect)
  t.deepEqual(rbounds, [[-2, -2, 0], [2, 2, 0]])

  const acube = scale([2, 2, 2], cuboid())
  const cbounds = measureBoundingBox(acube)
  t.deepEqual(cbounds, [[-2, -2, -2], [2, 2, 2]])
})
