const test = require('ava')

const comparePolygonsAsPoints = require('../../../test/helpers/comparePolygonsAsPoints')

const mat4 = require('../../maths/mat4')

const { geom2, geom3, poly3 } = require('../../geometries')

const { circle } = require('../../primitives')

const { extrudeFromSlices, slice } = require('./index')

test('extrudeFromSlices (defaults)', (t) => {
  const geometry2 = geom2.fromPoints([[10, 10], [-10, 10], [-10, -10], [10, -10]])

  let geometry3 = extrudeFromSlices({ }, geometry2)
  let pts = geom3.toPoints(geometry3)
  const exp = [
    [[10.0, -10.0, 0.0], [10.0, 10.0, 0.0], [10.0, 10.0, 1.0]],
    [[10.0, -10.0, 0.0], [10.0, 10.0, 1.0], [10.0, -10.0, 1.0]],
    [[10.0, 10.0, 0.0], [-10.0, 10.0, 0.0], [-10.0, 10.0, 1.0]],
    [[10.0, 10.0, 0.0], [-10.0, 10.0, 1.0], [10.0, 10.0, 1.0]],
    [[-10.0, 10.0, 0.0], [-10.0, -10.0, 0.0], [-10.0, -10.0, 1.0]],
    [[-10.0, 10.0, 0.0], [-10.0, -10.0, 1.0], [-10.0, 10.0, 1.0]],
    [[-10.0, -10.0, 0.0], [10.0, -10.0, 0.0], [10.0, -10.0, 1.0]],
    [[-10.0, -10.0, 0.0], [10.0, -10.0, 1.0], [-10.0, -10.0, 1.0]],
    [[10, 10, 1], [-10, 10, 1], [-10, -10, 1], [10, -10, 1]],
    [[10, -10, 0], [-10, -10, 0], [-10, 10, 0], [10, 10, 0]]
  ]
  t.is(pts.length, 10)
  t.true(comparePolygonsAsPoints(pts, exp))

  const poly2 = poly3.fromPoints([[10, 10, 0], [-10, 10, 0], [-10, -10, 0], [10, -10, 0]])
  geometry3 = extrudeFromSlices({ }, poly2)
  pts = geom3.toPoints(geometry3)

  t.is(pts.length, 10)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('extrudeFromSlices (torus)', (t) => {
  const sqrt3 = Math.sqrt(3) / 2
  const radius = 10

  let hex = poly3.fromPoints([
    [radius, 0, 0],
    [radius / 2, radius * sqrt3, 0],
    [-radius / 2, radius * sqrt3, 0],
    [-radius, 0, 0],
    [-radius / 2, -radius * sqrt3, 0],
    [radius / 2, -radius * sqrt3, 0]
  ])
  hex = poly3.transform(mat4.fromTranslation(mat4.create(), [0, 20, 0]), hex)
  hex = slice.fromPoints(poly3.toPoints(hex))

  const angle = Math.PI / 4
  const geometry3 = extrudeFromSlices(
    {
      numberOfSlices: Math.PI * 2 / angle,
      capStart: false,
      capEnd: false,
      close: true,
      callback: function (progress, index, base) {
        return slice.transform(mat4.fromXRotation(mat4.create(), angle * index), base)
      }
    }, hex
  )
  const pts = geom3.toPoints(geometry3)
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
  t.is(pts.length, 25)
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
  t.is(pts.length, 298)
})

test('extrudeFromSlices (holes)', (t) => {
  const geometry2 = geom2.create(
    [
      [[-10.0, 10.0], [-10.0, -10.0]],
      [[-10.0, -10.0], [10.0, -10.0]],
      [[10.0, -10.0], [10.0, 10.0]],
      [[10.0, 10.0], [-10.0, 10.0]],
      [[-5.0, -5.0], [-5.0, 5.0]],
      [[5.0, -5.0], [-5.0, -5.0]],
      [[5.0, 5.0], [5.0, -5.0]],
      [[-5.0, 5.0], [5.0, 5.0]]
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
    [[-10, -10, 1], [-5, -10, 1], [-5, 10, 1], [-10, 10, 1]],
    [[10, -10, 1], [10, -5, 1], [-5, -5, 1], [-5, -10, 1]],
    [[10, 10, 1], [5, 10, 1], [5, -5, 1], [10, -5, 1]],
    [[5, 5, 1], [5, 10, 1], [-5, 10, 1], [-5, 5, 1]],
    [[-10, 10, 0], [-5, 10, 0], [-5, -10, 0], [-10, -10, 0]],
    [[10, -10, 0], [-5, -10, 0], [-5, -5, 0], [10, -5, 0]],
    [[10, -5, 0], [5, -5, 0], [5, 10, 0], [10, 10, 0]],
    [[5, 10, 0], [5, 5, 0], [-5, 5, 0], [-5, 10, 0]]
  ]
  t.is(pts.length, 24)
  t.true(comparePolygonsAsPoints(pts, exp))
})
