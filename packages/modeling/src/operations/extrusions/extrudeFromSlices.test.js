import test from 'ava'

import { comparePolygonsAsPoints } from '../../../test/helpers/index.js'

import { TAU } from '../../maths/constants.js'
import { mat4 } from '../../maths/index.js'

import { geom2, geom3, poly3, slice } from '../../geometries/index.js'

import { measureVolume } from '../../measurements/index.js'

import { circle, square } from '../../primitives/index.js'

import { extrudeFromSlices } from './index.js'

test('extrudeFromSlices (defaults)', (t) => {
  const geometry2 = square({ size: 20 })

  let geometry3 = extrudeFromSlices({ }, geometry2)
  let pts = geom3.toPoints(geometry3)
  const exp = [
    [[-10, -10, 0], [10, -10, 0], [10, -10, 1]],
    [[-10, -10, 0], [10, -10, 1], [-10, -10, 1]],
    [[10, -10, 0], [10, 10, 0], [10, 10, 1]],
    [[10, -10, 0], [10, 10, 1], [10, -10, 1]],
    [[10, 10, 0], [-10, 10, 0], [-10, 10, 1]],
    [[10, 10, 0], [-10, 10, 1], [10, 10, 1]],
    [[-10, 10, 0], [-10, -10, 0], [-10, -10, 1]],
    [[-10, 10, 0], [-10, -10, 1], [-10, 10, 1]],
    [[10, 10, 1], [-10, 10, 1], [-10, -10, 1]],
    [[-10, -10, 1], [10, -10, 1], [10, 10, 1]],
    [[-10, -10, 0], [-10, 10, 0], [10, 10, 0]],
    [[10, 10, 0], [10, -10, 0], [-10, -10, 0]]
  ]
  t.is(pts.length, 12)
  t.true(comparePolygonsAsPoints(pts, exp))

  const poly2 = poly3.create([[-10, -10, 0], [10, -10, 0], [10, 10, 0], [-10, 10, 0]])
  geometry3 = extrudeFromSlices({ }, poly2)
  pts = geom3.toPoints(geometry3)

  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureVolume(geometry3), 400.00000000000006)
  t.is(pts.length, 12)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('extrudeFromSlices (torus)', (t) => {
  const sqrt3 = Math.sqrt(3) / 2
  const radius = 10

  let hex = poly3.create([
    [radius, 0, 0],
    [radius / 2, radius * sqrt3, 0],
    [-radius / 2, radius * sqrt3, 0],
    [-radius, 0, 0],
    [-radius / 2, -radius * sqrt3, 0],
    [radius / 2, -radius * sqrt3, 0]
  ])
  hex = poly3.transform(mat4.fromTranslation(mat4.create(), [0, 20, 0]), hex)
  hex = slice.fromVertices(poly3.toVertices(hex))

  const angle = TAU / 8
  const geometry3 = extrudeFromSlices(
    {
      numberOfSlices: TAU / angle,
      capStart: false,
      capEnd: false,
      close: true,
      callback: function (progress, index, base) {
        return slice.transform(mat4.fromXRotation(mat4.create(), angle * index), base)
      }
    }, hex
  )
  const pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureVolume(geometry3), 29393.876913398108)
  t.is(pts.length, 96)
})

test('extrudeFromSlices (same shape, changing dimensions)', (t) => {
  const base = slice.fromVertices([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]])
  const geometry3 = extrudeFromSlices(
    {
      numberOfSlices: 4,
      capStart: true,
      capEnd: false,
      callback: function (progress, count, base) {
        let newSlice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, count * 2]), base)
        newSlice = slice.transform(mat4.fromScaling(mat4.create(), [1 + count, 1 + (count / 2), 1]), newSlice)
        return newSlice
      }
    }, base
  )
  const pts = geom3.toPoints(geometry3)
  // expected to throw because capEnd is false (non-closed geometry)
  t.throws(() => geom3.validate(geometry3))
  t.is(measureVolume(geometry3), 8.5)
  t.is(pts.length, 26)
})

test('extrudeFromSlices (changing shape, changing dimensions)', (t) => {
  const base = circle({ radius: 4, segments: 4 })
  const geometry3 = extrudeFromSlices(
    {
      numberOfSlices: 5,
      callback: (progress, count, base) => {
        const newShape = circle({ radius: 5 + count, segments: 4 + count })
        let newSlice = slice.fromGeom2(newShape)
        newSlice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, count * 10]), newSlice)
        return newSlice
      }
    }, base
  )
  const pts = geom3.toPoints(geometry3)
  t.notThrows.skip(() => geom3.validate(geometry3))
  t.is(measureVolume(geometry3), 5260.067107417433)
  t.is(pts.length, 304)
})

test('extrudeFromSlices (holes)', (t) => {
  const geometry2 = geom2.create([
    [[-10, 10], [-10, -10], [10, -10], [10, 10]],
    [[-5, -5], [-5, 5], [5, 5], [5, -5]]
  ])
  const geometry3 = extrudeFromSlices({ }, geometry2)
  const pts = geom3.toPoints(geometry3)
  const exp = [
    [[-10, 10, 0], [-10, -10, 0], [-10, -10, 1]],
    [[-10, 10, 0], [-10, -10, 1], [-10, 10, 1]],
    [[-10, -10, 0], [10, -10, 0], [10, -10, 1]],
    [[-10, -10, 0], [10, -10, 1], [-10, -10, 1]],
    [[10, -10, 0], [10, 10, 0], [10, 10, 1]],
    [[10, -10, 0], [10, 10, 1], [10, -10, 1]],
    [[10, 10, 0], [-10, 10, 0], [-10, 10, 1]],
    [[10, 10, 0], [-10, 10, 1], [10, 10, 1]],
    [[-5, -5, 0], [-5, 5, 0], [-5, 5, 1]],
    [[-5, -5, 0], [-5, 5, 1], [-5, -5, 1]],
    [[-5, 5, 0], [5, 5, 0], [5, 5, 1]],
    [[-5, 5, 0], [5, 5, 1], [-5, 5, 1]],
    [[5, 5, 0], [5, -5, 0], [5, -5, 1]],
    [[5, 5, 0], [5, -5, 1], [5, 5, 1]],
    [[5, -5, 0], [-5, -5, 0], [-5, -5, 1]],
    [[5, -5, 0], [-5, -5, 1], [5, -5, 1]],
    [[-5, 5, 1], [5, 5, 1], [10, 10, 1]],
    [[10, -10, 1], [10, 10, 1], [5, 5, 1]],
    [[-5, 5, 1], [10, 10, 1], [-10, 10, 1]],
    [[10, -10, 1], [5, 5, 1], [5, -5, 1]],
    [[-5, -5, 1], [-5, 5, 1], [-10, 10, 1]],
    [[-10, -10, 1], [10, -10, 1], [5, -5, 1]],
    [[-5, -5, 1], [-10, 10, 1], [-10, -10, 1]],
    [[-10, -10, 1], [5, -5, 1], [-5, -5, 1]],
    [[10, 10, 0], [5, 5, 0], [-5, 5, 0]],
    [[5, 5, 0], [10, 10, 0], [10, -10, 0]],
    [[-10, 10, 0], [10, 10, 0], [-5, 5, 0]],
    [[5, -5, 0], [5, 5, 0], [10, -10, 0]],
    [[-10, 10, 0], [-5, 5, 0], [-5, -5, 0]],
    [[5, -5, 0], [10, -10, 0], [-10, -10, 0]],
    [[-10, -10, 0], [-10, 10, 0], [-5, -5, 0]],
    [[-5, -5, 0], [5, -5, 0], [-10, -10, 0]]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureVolume(geometry3), 300)
  t.is(pts.length, 32)
  t.true(comparePolygonsAsPoints(pts, exp))
})
