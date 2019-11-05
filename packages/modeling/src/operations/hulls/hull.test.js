const test = require('ava')

const { geom2, path2 } = require('../../geometry')

const hull = require('./hull')

test('hull (single, geom2)', t => {
  let geometry = geom2.create()

  let obs = hull(geometry)
  let pts = geom2.toPoints(obs)

  t.is(pts.length, 0)

  geometry = geom2.fromPoints([[5, 5], [-5, 5], [-5, -5], [5, -5]])
  obs = hull(geometry)
  pts = geom2.toPoints(obs)

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

  t.is(pts.length, 7)
})

test('hull (multiple, overlaping, geom2)', t => {
  let geometry1 = geom2.fromPoints([[5, 5], [-5, 5], [-5, -5], [5, -5]])
  let geometry2 = geom2.fromPoints([[3, 3], [-3, 3], [-3, -3], [3, -3]])
  let geometry3 = geom2.fromPoints([[6, 3], [-6, 3], [-6, -3], [6, -3]])

  // convex C shape
  let geometry4 = geom2.fromPoints([
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

  t.is(pts.length, 4)

  // one inside another
  obs = hull(geometry1, geometry2)
  pts = geom2.toPoints(obs)

  t.is(pts.length, 4)

  // one overlapping another
  obs = hull(geometry1, geometry3)
  pts = geom2.toPoints(obs)

  t.is(pts.length, 8)

  obs = hull(geometry2, geometry4)
  pts = geom2.toPoints(obs)

  t.is(pts.length, 7)
})

test('hull (multiple, various, geom2)', t => {
  let geometry1 = geom2.fromPoints([[6, 6], [0, 6], [0, 0], [6, 0]])
  let geometry2 = geom2.fromPoints([[6, 3], [-6, 3], [-6, -3], [6, -3]])
  let geometry3 = geom2.fromPoints([[-10, -10], [0, -20], [10, -10]])

  // convex C shape
  let geometry4 = geom2.fromPoints([
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
  let geometry5 = geom2.fromPoints([[-17, -17], [-23, -17], [-23, -23], [-17, -23]])

  let obs = hull(geometry1, geometry2)
  let pts = geom2.toPoints(obs)
  t.is(pts.length, 5)

  obs = hull(geometry1, geometry3)
  pts = geom2.toPoints(obs)
  t.is(pts.length, 5)

  obs = hull(geometry2, geometry3)
  pts = geom2.toPoints(obs)
  t.is(pts.length, 5)

  obs = hull(geometry1, geometry2, geometry3)
  pts = geom2.toPoints(obs)
  t.is(pts.length, 6)

  obs = hull(geometry5, geometry4)
  pts = geom2.toPoints(obs)
  t.is(pts.length, 8)
})

test('hull (single, path2)', t => {
  let geometry = path2.create()

  let obs = hull(geometry)
  let pts = path2.toPoints(obs)

  t.is(pts.length, 0)

  geometry = path2.fromPoints({}, [[0, 0], [5, 0], [5, 10], [4, 1]])

  obs = hull(geometry)
  pts = path2.toPoints(obs)

  t.is(pts.length, 3)
})

test('hull (multiple, various, path2)', t => {
  let geometry1 = path2.fromPoints({closed: true}, [[6, 6], [0, 6], [0, 0], [6, 0]])
  let geometry2 = path2.fromPoints({}, [[6, 3], [-6, 3], [-6, -3], [6, -3]])
  let geometry3 = path2.fromPoints({closed: true}, [[-10, -10], [0, -20], [10, -10]])

  // convex C shape
  let geometry4 = path2.fromPoints({}, [
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
  let geometry5 = path2.fromPoints({closed: true}, [[-17, -17], [-23, -17], [-23, -23], [-17, -23]])

  let obs = hull(geometry1, geometry2)
  let pts = path2.toPoints(obs)
  t.is(pts.length, 5)

  obs = hull(geometry1, geometry3)
  pts = path2.toPoints(obs)
  t.is(pts.length, 5)

  obs = hull(geometry2, geometry3)
  pts = path2.toPoints(obs)
  t.is(pts.length, 5)

  obs = hull(geometry1, geometry2, geometry3)
  pts = path2.toPoints(obs)
  t.is(pts.length, 6)

  obs = hull(geometry5, geometry4)
  pts = path2.toPoints(obs)
  t.is(pts.length, 8)
})
