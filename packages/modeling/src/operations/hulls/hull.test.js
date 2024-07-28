const test = require('ava')

const { geom2, geom3, path2 } = require('../../geometries')

const { measureVolume } = require('../../measurements')

const { sphere, cuboid, ellipsoid, torus } = require('../../primitives')

const { center } = require('../transforms/center')

const { hull } = require('./index')

const comparePolygonsAsPoints = require('../../../test/helpers/comparePolygonsAsPoints')

test('hull (single, geom2)', (t) => {
  let geometry = geom2.create()

  let obs = hull(geometry)
  let pts = geom2.toPoints(obs)

  t.notThrows(() => geom2.validate(geometry))
  t.is(pts.length, 0)

  geometry = geom2.fromPoints([[5, 5], [-5, 5], [-5, -5], [5, -5]])
  obs = hull(geometry)
  pts = geom2.toPoints(obs)

  t.notThrows(() => geom2.validate(geometry))
  t.is(pts.length, 4)

  // convex C shape
  geometry = geom2.fromPoints([
    [5.00000, 8.66025],
    [-5.00000, 8.66025],
    [-10.00000, 0.00000],
    [-5.00000, -8.66025],
    [5.00000, -8.66025],
    [6.00000, -6.92820],
    [-2.00000, -6.92820],
    [-6.00000, 0.00000],
    [-2.00000, 6.92820],
    [6.00000, 6.92820]
  ])
  obs = hull(geometry)
  pts = geom2.toPoints(obs)

  t.notThrows(() => geom2.validate(geometry))
  t.is(pts.length, 7)
})

test('hull (multiple, overlapping, geom2)', (t) => {
  const geometry1 = geom2.fromPoints([[5, 5], [-5, 5], [-5, -5], [5, -5]])
  const geometry2 = geom2.fromPoints([[3, 3], [-3, 3], [-3, -3], [3, -3]])
  const geometry3 = geom2.fromPoints([[6, 3], [-6, 3], [-6, -3], [6, -3]])

  // convex C shape
  const geometry4 = geom2.fromPoints([
    [5.00000, 8.66025],
    [-5.00000, 8.66025],
    [-10.00000, 0.00000],
    [-5.00000, -8.66025],
    [5.00000, -8.66025],
    [6.00000, -6.92820],
    [-2.00000, -6.92820],
    [-6.00000, 0.00000],
    [-2.00000, 6.92820],
    [6.00000, 6.92820]
  ])

  // same
  let obs = hull(geometry1, geometry1)
  let pts = geom2.toPoints(obs)

  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 4)

  // one inside another
  obs = hull(geometry1, geometry2)
  pts = geom2.toPoints(obs)

  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 4)

  // one overlapping another
  obs = hull(geometry1, geometry3)
  pts = geom2.toPoints(obs)

  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 8)

  obs = hull(geometry2, geometry4)
  pts = geom2.toPoints(obs)

  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 7)
})

test('hull (multiple, various, geom2)', (t) => {
  const geometry1 = geom2.fromPoints([[6, 6], [0, 6], [0, 0], [6, 0]])
  const geometry2 = geom2.fromPoints([[6, 3], [-6, 3], [-6, -3], [6, -3]])
  const geometry3 = geom2.fromPoints([[-10, -10], [0, -20], [10, -10]])

  // convex C shape
  const geometry4 = geom2.fromPoints([
    [5.00000, 8.66025],
    [-5.00000, 8.66025],
    [-10.00000, 0.00000],
    [-5.00000, -8.66025],
    [5.00000, -8.66025],
    [6.00000, -6.92820],
    [-2.00000, -6.92820],
    [-6.00000, 0.00000],
    [-2.00000, 6.92820],
    [6.00000, 6.92820]
  ])
  const geometry5 = geom2.fromPoints([[-17, -17], [-23, -17], [-23, -23], [-17, -23]])

  let obs = hull(geometry1, geometry2)
  let pts = geom2.toPoints(obs)
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 5)

  obs = hull(geometry1, geometry3)
  pts = geom2.toPoints(obs)
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 5)

  obs = hull(geometry2, geometry3)
  pts = geom2.toPoints(obs)
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 5)

  obs = hull(geometry1, geometry2, geometry3)
  pts = geom2.toPoints(obs)
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 6)

  obs = hull(geometry5, geometry4)
  pts = geom2.toPoints(obs)
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 8)
})

test('hull (single, path2)', (t) => {
  let geometry = path2.create()

  let obs = hull(geometry)
  let pts = path2.toPoints(obs)

  t.notThrows(() => path2.validate(obs))
  t.is(pts.length, 0)

  geometry = path2.fromPoints({}, [[0, 0], [5, 0], [5, 10], [4, 1]])

  obs = hull(geometry)
  pts = path2.toPoints(obs)

  t.notThrows(() => path2.validate(obs))
  t.is(pts.length, 3)
})

test('hull (multiple, various, path2)', (t) => {
  const geometry1 = path2.fromPoints({ closed: true }, [[6, 6], [0, 6], [0, 0], [6, 0]])
  const geometry2 = path2.fromPoints({}, [[6, 3], [-6, 3], [-6, -3], [6, -3]])
  const geometry3 = path2.fromPoints({ closed: true }, [[-10, -10], [0, -20], [10, -10]])

  // convex C shape
  const geometry4 = path2.fromPoints({}, [
    [5.00000, 8.66025],
    [-5.00000, 8.66025],
    [-10.00000, 0.00000],
    [-5.00000, -8.66025],
    [5.00000, -8.66025],
    [6.00000, -6.92820],
    [-2.00000, -6.92820],
    [-6.00000, 0.00000],
    [-2.00000, 6.92820],
    [6.00000, 6.92820]
  ])
  const geometry5 = path2.fromPoints({ closed: true }, [[-17, -17], [-23, -17], [-23, -23], [-17, -23]])

  let obs = hull(geometry1, geometry2)
  let pts = path2.toPoints(obs)
  t.notThrows(() => path2.validate(obs))
  t.is(pts.length, 5)

  obs = hull(geometry1, geometry3)
  pts = path2.toPoints(obs)
  t.notThrows(() => path2.validate(obs))
  t.is(pts.length, 5)

  obs = hull(geometry2, geometry3)
  pts = path2.toPoints(obs)
  t.notThrows(() => path2.validate(obs))
  t.is(pts.length, 5)

  obs = hull(geometry1, geometry2, geometry3)
  pts = path2.toPoints(obs)
  t.notThrows(() => path2.validate(obs))
  t.is(pts.length, 6)

  obs = hull(geometry5, geometry4)
  pts = path2.toPoints(obs)
  t.notThrows(() => path2.validate(obs))
  t.is(pts.length, 8)
})

test('hull (single, geom3)', (t) => {
  let geometry = geom3.create()

  let obs = hull(geometry)
  let pts = geom3.toPoints(obs)

  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 0)

  geometry = sphere({ radius: 2, segments: 8 })

  obs = hull(geometry)
  pts = geom3.toPoints(obs)

  t.notThrows.skip(() => geom3.validate(obs))
  t.is(pts.length, 32)
})

test('hull (multiple, geom3)', (t) => {
  const geometry1 = cuboid({ size: [2, 2, 2] })

  let obs = hull(geometry1, geometry1) // same
  let pts = geom3.toPoints(obs)
  let exp = [
    [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
    [[-1, 1, -1], [1, 1, -1], [1, -1, -1], [-1, -1, -1]],
    [[-1, 1, -1], [-1, -1, -1], [-1, -1, 1], [-1, 1, 1]],
    [[1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]],
    [[1, -1, 1], [1, 1, 1], [-1, 1, 1], [-1, -1, 1]],
    [[1, -1, 1], [-1, -1, 1], [-1, -1, -1], [1, -1, -1]]
  ]

  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))

  const geometry2 = center({ relativeTo: [5, 5, 5] }, cuboid({ size: [3, 3, 3] }))

  obs = hull(geometry1, geometry2)
  pts = geom3.toPoints(obs)
  exp = [
    [[1, -1, -1], [6.5, 3.5, 3.5], [6.5, 3.5, 6.5], [1, -1, 1]],
    [[-1, -1, 1], [-1, -1, -1], [1, -1, -1], [1, -1, 1]],
    [[-1, -1, 1], [1, -1, 1], [6.5, 3.5, 6.5], [3.5, 3.5, 6.5]],
    [[-1, -1, 1], [3.5, 3.5, 6.5], [3.5, 6.5, 6.5], [-1, 1, 1]],
    [[-1, 1, -1], [-1, 1, 1], [3.5, 6.5, 6.5], [3.5, 6.5, 3.5]],
    [[-1, 1, -1], [-1, -1, -1], [-1, -1, 1], [-1, 1, 1]],
    [[6.5, 6.5, 6.5], [6.5, 3.5, 6.5], [6.5, 3.5, 3.5], [6.5, 6.5, 3.5]],
    [[6.5, 6.5, 6.5], [6.5, 6.5, 3.5], [3.5, 6.5, 3.5], [3.5, 6.5, 6.5]],
    [[6.5, 6.5, 6.5], [3.5, 6.5, 6.5], [3.5, 3.5, 6.5], [6.5, 3.5, 6.5]],
    [[1, 1, -1], [1, -1, -1], [-1, -1, -1], [-1, 1, -1]],
    [[1, 1, -1], [-1, 1, -1], [3.5, 6.5, 3.5], [6.5, 6.5, 3.5]],
    [[1, 1, -1], [6.5, 6.5, 3.5], [6.5, 3.5, 3.5], [1, -1, -1]]
  ]

  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 12)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('hull (multiple, overlapping, geom3)', (t) => {
  const geometry1 = ellipsoid({ radius: [2, 2, 2], segments: 12 })
  const geometry2 = center({ relativeTo: [3, -3, 3] }, ellipsoid({ radius: [3, 3, 3], segments: 12 }))
  const geometry3 = center({ relativeTo: [-3, -3, -3] }, ellipsoid({ radius: [3, 3, 3], segments: 12 }))

  const obs = hull(geometry1, geometry2, geometry3)
  const pts = geom3.toPoints(obs)

  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 92)
})

test('hull (single, unconvex, geom3)', (t) => {
  const geometry = torus()
  const obs = hull(geometry)
  t.assert(measureVolume(obs) > measureVolume(geometry))
})
