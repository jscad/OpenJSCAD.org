const test = require('ava')

const comparePolygonsAsPoints = require('../../../test/helpers/comparePolygonsAsPoints')

const { TAU } = require('../../maths/constants')
const mat4 = require('../../maths/mat4')

const { geom2, geom3, poly3 } = require('../../geometries')

const { circle } = require('../../primitives')

const { extrudeFromSlices, slice } = require('./index')

test('extrudeFromSlices (defaults)', (t) => {
  const geometry2 = geom2.fromPoints([[10, 10], [-10, 10], [-10, -10], [10, -10]])

  let geometry3 = extrudeFromSlices({ }, geometry2)
  let pts = geom3.toPoints(geometry3)
  const exp = [
    [[10, -10, 0], [10, 10, 0], [10, 10, 1]],
    [[10, -10, 0], [10, 10, 1], [10, -10, 1]],
    [[10, 10, 0], [-10, 10, 0], [-10, 10, 1]],
    [[10, 10, 0], [-10, 10, 1], [10, 10, 1]],
    [[-10, 10, 0], [-10, -10, 0], [-10, -10, 1]],
    [[-10, 10, 0], [-10, -10, 1], [-10, 10, 1]],
    [[-10, -10, 0], [10, -10, 0], [10, -10, 1]],
    [[-10, -10, 0], [10, -10, 1], [-10, -10, 1]],
    [[-10, -10, 1], [10, -10, 1], [10, 10, 1]],
    [[10, 10, 1], [-10, 10, 1], [-10, -10, 1]],
    [[10, 10, 0], [10, -10, 0], [-10, -10, 0]],
    [[-10, -10, 0], [-10, 10, 0], [10, 10, 0]]
  ]
  t.is(pts.length, 12)
  t.true(comparePolygonsAsPoints(pts, exp))

  const poly2 = poly3.create([[10, 10, 0], [-10, 10, 0], [-10, -10, 0], [10, -10, 0]])
  geometry3 = extrudeFromSlices({ }, poly2)
  pts = geom3.toPoints(geometry3)

  t.notThrows(() => geom3.validate(geometry3))
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
  hex = slice.fromPoints(poly3.toPoints(hex))

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
  t.is(pts.length, 96)
})

test('extrudeFromSlices (same shape, changing dimensions)', (t) => {
  const base = slice.fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]])
  const geometry3 = extrudeFromSlices(
    {
      numberOfSlices: 4,
      capStart: true,
      capEnd: false,
      callback: function (progress, count, base) {
        let newslice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, count * 2]), base)
        newslice = slice.transform(mat4.fromScaling(mat4.create(), [1 + count, 1 + (count / 2), 1]), newslice)
        return newslice
      }
    }, base
  )
  const pts = geom3.toPoints(geometry3)
  // expected to throw because capEnd is false (non-closed geometry)
  t.throws(() => geom3.validate(geometry3))
  t.is(pts.length, 26)
})

test('extrudeFromSlices (changing shape, changing dimensions)', (t) => {
  const base = circle({ radius: 4, segments: 4 })
  const geometry3 = extrudeFromSlices(
    {
      numberOfSlices: 5,
      callback: (progress, count, base) => {
        const newshape = circle({ radius: 5 + count, segments: 4 + count })
        let newslice = slice.fromSides(geom2.toSides(newshape))
        newslice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, count * 10]), newslice)
        return newslice
      }
    }, base
  )
  const pts = geom3.toPoints(geometry3)
  t.notThrows.skip(() => geom3.validate(geometry3))
  t.is(pts.length, 304)
})

test('extrudeFromSlices (holes)', (t) => {
  const geometry2 = geom2.create(
    [
      [[-10, 10], [-10, -10]],
      [[-10, -10], [10, -10]],
      [[10, -10], [10, 10]],
      [[10, 10], [-10, 10]],
      [[-5, -5], [-5, 5]],
      [[5, -5], [-5, -5]],
      [[5, 5], [5, -5]],
      [[-5, 5], [5, 5]]
    ]
  )
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
    [[5, -5, 0], [-5, -5, 0], [-5, -5, 1]],
    [[5, -5, 0], [-5, -5, 1], [5, -5, 1]],
    [[5, 5, 0], [5, -5, 0], [5, -5, 1]],
    [[5, 5, 0], [5, -5, 1], [5, 5, 1]],
    [[-5, 5, 0], [5, 5, 0], [5, 5, 1]],
    [[-5, 5, 0], [5, 5, 1], [-5, 5, 1]],
    [[10, -10, 1], [10, 10, 1], [5, 5, 1]],
    [[-5, 5, 1], [5, 5, 1], [10, 10, 1]],
    [[10, -10, 1], [5, 5, 1], [5, -5, 1]],
    [[-5, 5, 1], [10, 10, 1], [-10, 10, 1]],
    [[-10, -10, 1], [10, -10, 1], [5, -5, 1]],
    [[-5, -5, 1], [-5, 5, 1], [-10, 10, 1]],
    [[-10, -10, 1], [5, -5, 1], [-5, -5, 1]],
    [[-5, -5, 1], [-10, 10, 1], [-10, -10, 1]],
    [[5, 5, 0], [10, 10, 0], [10, -10, 0]],
    [[10, 10, 0], [5, 5, 0], [-5, 5, 0]],
    [[5, -5, 0], [5, 5, 0], [10, -10, 0]],
    [[-10, 10, 0], [10, 10, 0], [-5, 5, 0]],
    [[5, -5, 0], [10, -10, 0], [-10, -10, 0]],
    [[-10, 10, 0], [-5, 5, 0], [-5, -5, 0]],
    [[-5, -5, 0], [5, -5, 0], [-10, -10, 0]],
    [[-10, -10, 0], [-10, 10, 0], [-5, -5, 0]]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 32)
  t.true(comparePolygonsAsPoints(pts, exp))
})
