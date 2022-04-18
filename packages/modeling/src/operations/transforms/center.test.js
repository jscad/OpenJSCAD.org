const test = require('ava')

const { comparePoints, comparePolygonsAsPoints } = require('../../../test/helpers')

const { geom2, geom3, path2 } = require('../../geometries')

const { center, centerX, centerY, centerZ } = require('./index')

test('center: centering of a path2 produces expected changes to points', (t) => {
  const geometry = path2.fromPoints({}, [[5, 0], [0, 3], [-1, 0]])

  // center about X
  let centered = center({ axes: [true, false, false] }, geometry)
  let pts = path2.toPoints(centered)
  const exp = [[3, 0], [-2, 3], [-3, 0]]
  t.notThrows(() => path2.validate(centered))
  t.true(comparePoints(pts, exp))

  centered = centerX(geometry)
  pts = path2.toPoints(centered)
  t.notThrows(() => path2.validate(centered))
  t.true(comparePoints(pts, exp))
})

test('center: centering of a geom2 produces expected changes to points', (t) => {
  const geometry = geom2.fromPoints([[0, 0], [10, 0], [0, 10]])

  // center about Y
  let centered = center({ axes: [false, true, false] }, geometry)
  let pts = geom2.toPoints(centered)
  const exp = [[0, -5], [10, -5], [0, 5]]
  t.notThrows(() => geom2.validate(centered))
  t.true(comparePoints(pts, exp))

  centered = centerY(geometry)
  pts = geom2.toPoints(centered)
  t.notThrows(() => geom2.validate(centered))
  t.true(comparePoints(pts, exp))
})

test('center: centering of a geom3 produces expected changes to polygons', (t) => {
  const points = [
    [[-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12]],
    [[8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18]],
    [[-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18]],
    [[-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12]],
    [[-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12]],
    [[-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18]]
  ]
  const geometry = geom3.fromPoints(points)

  // center about X
  let centered = center({ axes: [true, false, false] }, geometry)
  let pts = geom3.toPoints(centered)
  let exp = [
    [[-5, -7, -12], [-5, -7, 18], [-5, 13, 18], [-5, 13, -12]],
    [[5, -7, -12], [5, 13, -12], [5, 13, 18], [5, -7, 18]],
    [[-5, -7, -12], [5, -7, -12], [5, -7, 18], [-5, -7, 18]],
    [[-5, 13, -12], [-5, 13, 18], [5, 13, 18], [5, 13, -12]],
    [[-5, -7, -12], [-5, 13, -12], [5, 13, -12], [5, -7, -12]],
    [[-5, -7, 18], [5, -7, 18], [5, 13, 18], [-5, 13, 18]]
  ]
  t.notThrows(() => geom3.validate(centered))
  t.true(comparePolygonsAsPoints(pts, exp))

  centered = centerX(geometry)
  pts = geom3.toPoints(centered)
  t.notThrows(() => geom3.validate(centered))
  t.true(comparePolygonsAsPoints(pts, exp))

  // center about Y
  centered = center({ axes: [false, true, false] }, geometry)
  pts = geom3.toPoints(centered)
  exp = [
    [[-2, -10, -12], [-2, -10, 18], [-2, 10, 18], [-2, 10, -12]],
    [[8, -10, -12], [8, 10, -12], [8, 10, 18], [8, -10, 18]],
    [[-2, -10, -12], [8, -10, -12], [8, -10, 18], [-2, -10, 18]],
    [[-2, 10, -12], [-2, 10, 18], [8, 10, 18], [8, 10, -12]],
    [[-2, -10, -12], [-2, 10, -12], [8, 10, -12], [8, -10, -12]],
    [[-2, -10, 18], [8, -10, 18], [8, 10, 18], [-2, 10, 18]]
  ]
  t.notThrows(() => geom3.validate(centered))
  t.true(comparePolygonsAsPoints(pts, exp))

  centered = centerY(geometry)
  pts = geom3.toPoints(centered)
  t.notThrows(() => geom3.validate(centered))
  t.true(comparePolygonsAsPoints(pts, exp))

  // center about Z
  centered = center({ axes: [false, false, true] }, geometry)
  pts = geom3.toPoints(centered)
  exp = [
    [[-2, -7, -15], [-2, -7, 15], [-2, 13, 15], [-2, 13, -15]],
    [[8, -7, -15], [8, 13, -15], [8, 13, 15], [8, -7, 15]],
    [[-2, -7, -15], [8, -7, -15], [8, -7, 15], [-2, -7, 15]],
    [[-2, 13, -15], [-2, 13, 15], [8, 13, 15], [8, 13, -15]],
    [[-2, -7, -15], [-2, 13, -15], [8, 13, -15], [8, -7, -15]],
    [[-2, -7, 15], [8, -7, 15], [8, 13, 15], [-2, 13, 15]]
  ]
  t.notThrows(() => geom3.validate(centered))
  t.true(comparePolygonsAsPoints(pts, exp))

  centered = centerZ(geometry)
  pts = geom3.toPoints(centered)
  t.notThrows(() => geom3.validate(centered))
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('center: centering of multiple objects produces expected changes', (t) => {
  const junk = 'hello'
  const geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  const geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  const centered = center({ axes: [true, true, false], relativeTo: [10, 15, 0] }, junk, geometry1, geometry2)

  t.is(centered[0], junk)

  const pts1 = path2.toPoints(centered[1])
  const exp1 = [[2.5, 20], [12.5, 20], [2.5, 10], [17.5, 10]]
  t.notThrows(() => path2.validate(centered[1]))
  t.true(comparePoints(pts1, exp1))

  const pts2 = geom2.toPoints(centered[2])
  const exp2 = [[2.5, 10], [7.5, 20], [17.5, 10]]
  t.notThrows(() => geom2.validate(centered[2]))
  t.true(comparePoints(pts2, exp2))
})
