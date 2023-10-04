const test = require('ava')

const { comparePoints, comparePolygonsAsPoints } = require('../../../test/helpers')

const { measureArea } = require('../../measurements')

const { geom2, geom3, path2 } = require('../../geometries')

const { mirror, mirrorX, mirrorY, mirrorZ } = require('./index')

test('mirror: mirroring of path2 about X/Y produces expected changes to points', (t) => {
  const geometry = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])

  // mirror about X
  let mirrored = mirror({ normal: [1, 0, 0] }, geometry)
  let obs = path2.toPoints(mirrored)
  let exp = [[5, 5], [-5, 5], [5, -5], [-10, -5]]
  t.notThrows(() => path2.validate(mirrored))
  t.true(comparePoints(obs, exp))

  mirrored = mirrorX(geometry)
  obs = path2.toPoints(mirrored)
  t.notThrows(() => path2.validate(mirrored))
  t.true(comparePoints(obs, exp))

  // mirror about Y
  mirrored = mirror({ normal: [0, 1, 0] }, geometry)
  obs = path2.toPoints(mirrored)
  exp = [[-5, -5], [5, -5], [-5, 5], [10, 5]]
  t.notThrows(() => path2.validate(mirrored))
  t.true(comparePoints(obs, exp))

  mirrored = mirrorY(geometry)
  obs = path2.toPoints(mirrored)
  t.notThrows(() => path2.validate(mirrored))
  t.true(comparePoints(obs, exp))
})

test('mirror: mirroring of geom2 about X/Y produces expected changes to points', (t) => {
  const geometry = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  // mirror about X
  let mirrored = mirror({ normal: [1, 0, 0] }, geometry)
  let obs = geom2.toPoints(mirrored)
  let exp = [[0, 5], [5, -5], [-10, -5]]
  t.notThrows(() => geom2.validate(mirrored))
  t.is(measureArea(mirrored), measureArea(geometry))
  t.true(comparePoints(obs, exp))

  mirrored = mirrorX(geometry)
  obs = geom2.toPoints(mirrored)
  t.notThrows(() => geom2.validate(mirrored))
  t.is(measureArea(mirrored), measureArea(geometry))
  t.true(comparePoints(obs, exp))

  // mirror about Y
  mirrored = mirror({ normal: [0, 1, 0] }, geometry)
  obs = geom2.toPoints(mirrored)
  exp = [[0, -5], [-5, 5], [10, 5]]
  t.notThrows(() => geom2.validate(mirrored))
  t.is(measureArea(mirrored), measureArea(geometry))
  t.true(comparePoints(obs, exp))

  mirrored = mirrorY(geometry)
  obs = geom2.toPoints(mirrored)
  t.notThrows(() => geom2.validate(mirrored))
  t.is(measureArea(mirrored), measureArea(geometry))
  t.true(comparePoints(obs, exp))
})

test('mirror: mirroring of geom3 about X/Y/Z produces expected changes to polygons', (t) => {
  const points = [
    [[-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12]],
    [[8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18]],
    [[-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18]],
    [[-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12]],
    [[-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12]],
    [[-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18]]
  ]
  const geometry = geom3.fromPoints(points)

  // mirror about X
  let mirrored = mirror({ normal: [1, 0, 0] }, geometry)
  let obs = geom3.toPoints(mirrored)
  let exp = [
    [[2, 13, -12], [2, 13, 18], [2, -7, 18], [2, -7, -12]],
    [[-8, -7, 18], [-8, 13, 18], [-8, 13, -12], [-8, -7, -12]],
    [[2, -7, 18], [-8, -7, 18], [-8, -7, -12], [2, -7, -12]],
    [[-8, 13, -12], [-8, 13, 18], [2, 13, 18], [2, 13, -12]],
    [[-8, -7, -12], [-8, 13, -12], [2, 13, -12], [2, -7, -12]],
    [[2, 13, 18], [-8, 13, 18], [-8, -7, 18], [2, -7, 18]]
  ]
  t.notThrows(() => geom3.validate(mirrored))
  t.true(comparePolygonsAsPoints(obs, exp))
  t.deepEqual(obs, exp)

  mirrored = mirrorX(geometry)
  obs = geom3.toPoints(mirrored)
  t.notThrows(() => geom3.validate(mirrored))
  t.true(comparePolygonsAsPoints(obs, exp))

  // mirror about Y
  mirrored = mirror({ normal: [0, 1, 0] }, geometry)
  obs = geom3.toPoints(mirrored)
  exp = [
    [[-2, -13, -12], [-2, -13, 18], [-2, 7, 18], [-2, 7, -12]],
    [[8, 7, 18], [8, -13, 18], [8, -13, -12], [8, 7, -12]],
    [[-2, 7, 18], [8, 7, 18], [8, 7, -12], [-2, 7, -12]],
    [[8, -13, -12], [8, -13, 18], [-2, -13, 18], [-2, -13, -12]],
    [[8, 7, -12], [8, -13, -12], [-2, -13, -12], [-2, 7, -12]],
    [[-2, -13, 18], [8, -13, 18], [8, 7, 18], [-2, 7, 18]]
  ]
  t.notThrows(() => geom3.validate(mirrored))
  t.true(comparePolygonsAsPoints(obs, exp))

  mirrored = mirrorY(geometry)
  obs = geom3.toPoints(mirrored)
  t.notThrows(() => geom3.validate(mirrored))
  t.true(comparePolygonsAsPoints(obs, exp))

  // mirror about Z
  mirrored = mirror({ normal: [0, 0, 1] }, geometry)
  obs = geom3.toPoints(mirrored)
  exp = [
    [[-2, 13, 12], [-2, 13, -18], [-2, -7, -18], [-2, -7, 12]],
    [[8, -7, -18], [8, 13, -18], [8, 13, 12], [8, -7, 12]],
    [[-2, -7, -18], [8, -7, -18], [8, -7, 12], [-2, -7, 12]],
    [[8, 13, 12], [8, 13, -18], [-2, 13, -18], [-2, 13, 12]],
    [[8, -7, 12], [8, 13, 12], [-2, 13, 12], [-2, -7, 12]],
    [[-2, 13, -18], [8, 13, -18], [8, -7, -18], [-2, -7, -18]]
  ]
  t.notThrows(() => geom3.validate(mirrored))
  t.true(comparePolygonsAsPoints(obs, exp))

  mirrored = mirrorZ(geometry)
  obs = geom3.toPoints(mirrored)
  t.notThrows(() => geom3.validate(mirrored))
  t.true(comparePolygonsAsPoints(obs, exp))
})

test('mirror: mirroring of multiple objects produces an array of mirrored objects', (t) => {
  const junk = 'hello'
  const geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  const geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  const mirrored = mirror({ normal: [0, 1, 0] }, junk, geometry1, geometry2)
  t.is(mirrored[0], junk)

  let obs = path2.toPoints(mirrored[1])
  let exp = [[-5, -5], [5, -5], [-5, 5], [10, 5]]
  t.notThrows(() => path2.validate(mirrored[1]))
  t.true(comparePoints(obs, exp))

  obs = geom2.toPoints(mirrored[2])
  exp = [[0, -5], [-5, 5], [10, 5]]
  t.notThrows(() => geom2.validate(mirrored[2]))
  t.true(comparePoints(obs, exp))
})
