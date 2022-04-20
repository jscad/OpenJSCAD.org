const test = require('ava')

const { comparePolygonLists } = require('../../../test/helpers')

const { geom3, poly3 } = require('../../geometries')

const { cuboid } = require('../../primitives')

const insertTjunctions = require('./insertTjunctions')

test('insertTjunctions: insertTjunctions produces expected polygons', (t) => {
  const geometry1 = geom3.create()
  const geometry2 = cuboid({ size: [2, 2, 2] })
  const geometry3 = geom3.fromPoints(
    [
      [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
      // T junction
      [[-1, -1, 1], [1, -1, 1], [1, 1, 1]],
      [[1, 1, 1], [-1, 1, 1], [0, 0, 1]],
      [[-1, 1, 1], [-1, -1, 1], [0, 0, 1]]
    ]
  )
  const geometry4 = geom3.fromPoints(
    [
      [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
      // T junctions
      [[-1, -1, 1], [0, -1, 1], [0, 0, 1]],
      [[-1, 0, 1], [-1, -1, 1], [0, 0, 1]],

      [[0, -1, 1], [1, -1, 1], [0, 0, 1]],
      [[1, -1, 1], [1, 0, 1], [0, 0, 1]],

      [[1, 0, 1], [1, 1, 1], [0, 0, 1]],
      [[1, 1, 1], [0, 1, 1], [0, 0, 1]],

      [[0, 1, 1], [-1, 1, 1], [0, 0, 1]],
      [[-1, 1, 1], [-1, 0, 1], [0, 0, 1]]
    ]
  )

  const result1 = insertTjunctions(geom3.toPolygons(geometry1))
  t.is(result1, geom3.toPolygons(geometry1)) // no T junctions

  const result2 = insertTjunctions(geom3.toPolygons(geometry2))
  t.is(result2, geom3.toPolygons(geometry2)) // no T junctions

  // NOTE: insertTjunctions does NOT split the polygon, it just adds a new point at each T

  const result3 = insertTjunctions(geom3.toPolygons(geometry3))
  let exp = [
    poly3.create([[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]]),
    poly3.create([[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]]),
    poly3.create([[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]]),
    poly3.create([[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]]),
    poly3.create([[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]]),
    poly3.create([[0, 0, 1], [-1, -1, 1], [1, -1, 1], [1, 1, 1]]),
    poly3.create([[1, 1, 1], [-1, 1, 1], [0, 0, 1]]),
    poly3.create([[-1, 1, 1], [-1, -1, 1], [0, 0, 1]])
  ]
  t.not(result3, geom3.toPolygons(geometry3))
  t.true(comparePolygonLists(result3, exp))

  const result4 = insertTjunctions(geom3.toPolygons(geometry4))
  exp = [
    poly3.create([[-1, -1, -1], [-1, -1, 1], [-1, 0, 1], [-1, 1, 1], [-1, 1, -1]]),
    poly3.create([[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, 0, 1], [1, -1, 1]]),
    poly3.create([[-1, -1, -1], [1, -1, -1], [1, -1, 1], [0, -1, 1], [-1, -1, 1]]),
    poly3.create([[-1, 1, -1], [-1, 1, 1], [0, 1, 1], [1, 1, 1], [1, 1, -1]]),
    poly3.create([[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]]),
    poly3.create([[-1, -1, 1], [0, -1, 1], [0, 0, 1]]),
    poly3.create([[-1, 0, 1], [-1, -1, 1], [0, 0, 1]]),
    poly3.create([[0, -1, 1], [1, -1, 1], [0, 0, 1]]),
    poly3.create([[1, -1, 1], [1, 0, 1], [0, 0, 1]]),
    poly3.create([[1, 0, 1], [1, 1, 1], [0, 0, 1]]),
    poly3.create([[1, 1, 1], [0, 1, 1], [0, 0, 1]]),
    poly3.create([[0, 1, 1], [-1, 1, 1], [0, 0, 1]]),
    poly3.create([[-1, 1, 1], [-1, 0, 1], [0, 0, 1]])
  ]
  t.not(result4, geometry4)
  t.true(comparePolygonLists(result4, exp))
})
