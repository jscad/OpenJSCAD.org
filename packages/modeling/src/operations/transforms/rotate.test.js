const test = require('ava')

const { TAU } = require('../../maths/constants')

const { geom2, geom3, path2 } = require('../../geometries')

const { rotate, rotateX, rotateY, rotateZ } = require('./index')

const { comparePoints, comparePolygonsAsPoints } = require('../../../test/helpers')

test('rotate: rotating of a path2 produces expected changes to points', (t) => {
  const geometry = path2.fromPoints({}, [[1, 0], [0, 1], [-1, 0]])

  // rotate about Z
  let rotated = rotate([0, 0, TAU / 4], geometry)
  let obs = path2.toPoints(rotated)
  const exp = [
    new Float32Array([0, 1]),
    new Float32Array([-1, 0]),
    new Float32Array([-0, -1])
  ]
  t.true(comparePoints(obs, exp))

  rotated = rotateZ(TAU / 4, geometry)
  obs = path2.toPoints(rotated)
  t.notThrows(() => path2.validate(rotated))
  t.true(comparePoints(obs, exp))
})

test('rotate: rotating of a geom2 produces expected changes to points', (t) => {
  const geometry = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])

  // rotate about Z
  let rotated = rotate([0, 0, -TAU / 4], geometry)
  let obs = geom2.toPoints(rotated)
  const exp = [
    new Float32Array([0, 0]),
    new Float32Array([0, -1]),
    new Float32Array([1, 0])
  ]
  t.notThrows(() => geom2.validate(rotated))
  t.true(comparePoints(obs, exp))

  rotated = rotateZ(-TAU / 4, geometry)
  obs = geom2.toPoints(rotated)
  t.notThrows(() => geom2.validate(rotated))
  t.true(comparePoints(obs, exp))
})

test('rotate: rotating of a geom3 produces expected changes to polygons', (t) => {
  const points = [
    [[-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12]],
    [[8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18]],
    [[-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18]],
    [[-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12]],
    [[-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12]],
    [[-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18]]
  ]
  const geometry = geom3.fromPoints(points)

  // rotate about X
  let rotated = rotate([TAU / 4], geometry)
  let obs = geom3.toPoints(rotated)
  let exp = [
    [[-2, 12, -7.000000000000001], [-2, -18, -6.999999999999999],
      [-2, -18, 13.000000000000002], [-2, 12, 13]],
    [[8, 12, -7.000000000000001], [8, 12, 13],
      [8, -18, 13.000000000000002], [8, -18, -6.999999999999999]],
    [[-2, 12, -7.000000000000001], [8, 12, -7.000000000000001],
      [8, -18, -6.999999999999999], [-2, -18, -6.999999999999999]],
    [[-2, 12, 13], [-2, -18, 13.000000000000002],
      [8, -18, 13.000000000000002], [8, 12, 13]],
    [[-2, 12, -7.000000000000001], [-2, 12, 13],
      [8, 12, 13], [8, 12, -7.000000000000001]],
    [[-2, -18, -6.999999999999999], [8, -18, -6.999999999999999],
      [8, -18, 13.000000000000002], [-2, -18, 13.000000000000002]]
  ]
  t.notThrows(() => geom3.validate(rotated))
  t.true(comparePolygonsAsPoints(obs, exp))

  rotated = rotateX(TAU / 4, geometry)
  obs = geom3.toPoints(rotated)
  t.notThrows(() => geom3.validate(rotated))
  t.true(comparePolygonsAsPoints(obs, exp))

  // rotate about Y
  rotated = rotate([0, -TAU / 4], geometry)
  obs = geom3.toPoints(rotated)
  exp = [
    [[12, -7, -2.000000000000001], [-18, -7, -1.999999999999999],
      [-18, 13, -1.999999999999999], [12, 13, -2.000000000000001]],
    [[12, -7, 7.999999999999999], [12, 13, 7.999999999999999],
      [-18, 13, 8.000000000000002], [-18, -7, 8.000000000000002]],
    [[12, -7, -2.000000000000001], [12, -7, 7.999999999999999],
      [-18, -7, 8.000000000000002], [-18, -7, -1.999999999999999]],
    [[12, 13, -2.000000000000001], [-18, 13, -1.999999999999999],
      [-18, 13, 8.000000000000002], [12, 13, 7.999999999999999]],
    [[12, -7, -2.000000000000001], [12, 13, -2.000000000000001],
      [12, 13, 7.999999999999999], [12, -7, 7.999999999999999]],
    [[-18, -7, -1.999999999999999], [-18, -7, 8.000000000000002],
      [-18, 13, 8.000000000000002], [-18, 13, -1.999999999999999]]
  ]
  t.notThrows(() => geom3.validate(rotated))
  t.true(comparePolygonsAsPoints(obs, exp))

  rotated = rotateY(-TAU / 4, geometry)
  obs = geom3.toPoints(rotated)
  t.true(comparePolygonsAsPoints(obs, exp))

  // rotate about Z
  rotated = rotate([0, 0, TAU / 2], geometry)
  obs = geom3.toPoints(rotated)
  exp = [
    [[2.000000000000001, 7, -12], [2.000000000000001, 7, 18],
      [1.9999999999999984, -13, 18], [1.9999999999999984, -13, -12]],
    [[-7.999999999999999, 7.000000000000001, -12], [-8.000000000000002, -12.999999999999998, -12],
      [-8.000000000000002, -12.999999999999998, 18], [-7.999999999999999, 7.000000000000001, 18]],
    [[2.000000000000001, 7, -12], [-7.999999999999999, 7.000000000000001, -12],
      [-7.999999999999999, 7.000000000000001, 18], [2.000000000000001, 7, 18]],
    [[1.9999999999999984, -13, -12], [1.9999999999999984, -13, 18],
      [-8.000000000000002, -12.999999999999998, 18], [-8.000000000000002, -12.999999999999998, -12]],
    [[2.000000000000001, 7, -12], [1.9999999999999984, -13, -12],
      [-8.000000000000002, -12.999999999999998, -12], [-7.999999999999999, 7.000000000000001, -12]],
    [[2.000000000000001, 7, 18], [-7.999999999999999, 7.000000000000001, 18],
      [-8.000000000000002, -12.999999999999998, 18], [1.9999999999999984, -13, 18]]
  ]
  t.notThrows(() => geom3.validate(rotated))
  t.true(comparePolygonsAsPoints(obs, exp))

  rotated = rotateZ(TAU / 2, geometry)
  obs = geom3.toPoints(rotated)
  t.notThrows(() => geom3.validate(rotated))
  t.true(comparePolygonsAsPoints(obs, exp))
})

test('rotate: rotating of multiple objects produces expected changes', (t) => {
  const junk = 'hello'
  const geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  const geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  const rotated = rotate([0, 0, TAU / 4], junk, geometry1, geometry2)

  t.is(rotated[0], junk)

  const obs1 = path2.toPoints(rotated[1])
  const exp1 = [[-5, -5], [-5, 5], [5, -5], [5.000000000000001, 10]]
  t.notThrows(() => path2.validate(rotated[1]))
  t.true(comparePoints(obs1, exp1))

  const obs2 = geom2.toPoints(rotated[2])
  const exp2 = [[5, -5], [-5, 3.061616997868383e-16], [5.000000000000001, 10]]
  t.notThrows(() => geom2.validate(rotated[2]))
  t.true(comparePoints(obs2, exp2))
})
