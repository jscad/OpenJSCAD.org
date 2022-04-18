const test = require('ava')

const { geom2, path2 } = require('../../geometries')
const { offset } = require('./index')
const { comparePoints } = require('../../../test/helpers')
const measureBoundingBox = require('../../measurements/measureBoundingBox')

test('offset: offsetting a straight line produces expected geometry', (t) => {
  const points = [[0, 0], [0, 10]]
  let linePath2 = path2.fromPoints({ closed: false }, points)

  // offset it by 2.
  let offsetLinePath2 = offset({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  let offsetPoints = path2.toPoints(offsetLinePath2)
  t.notThrows(() => path2.validate(offsetLinePath2))
  t.is(offsetPoints.length, 2)
  let boundingBox = measureBoundingBox(offsetLinePath2)
  t.true(comparePoints(boundingBox, [[2, 0, 0], [2, 10, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))

  // offset it by -2.
  offsetLinePath2 = offset({ delta: -2, corners: 'edge', segments: 8 }, linePath2)
  offsetPoints = path2.toPoints(offsetLinePath2)
  t.notThrows(() => path2.validate(offsetLinePath2))
  t.is(offsetPoints.length, 2)
  boundingBox = measureBoundingBox(offsetLinePath2)
  t.true(comparePoints(boundingBox, [[-2, 0, 0], [-2, 10, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))

  // reverse the points, offset it by 2.
  linePath2 = path2.fromPoints({ closed: false }, points.reverse())
  offsetLinePath2 = offset({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  offsetPoints = path2.toPoints(offsetLinePath2)
  t.notThrows(() => path2.validate(offsetLinePath2))
  t.is(offsetPoints.length, 2)
  boundingBox = measureBoundingBox(offsetLinePath2)
  t.true(comparePoints(boundingBox, [[-2, 0, 0], [-2, 10, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('offset: offsetting a bent line produces expected geometry', (t) => {
  const points = [[0, 0], [0, 5], [0, 10], [5, 10], [10, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)

  // offset it by 2.
  let offsetLinePath2 = offset({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  let offsetPoints = path2.toPoints(offsetLinePath2)
  t.notThrows(() => path2.validate(offsetLinePath2))
  t.is(offsetPoints.length, 5)
  let boundingBox = measureBoundingBox(offsetLinePath2)
  t.true(comparePoints(boundingBox, [[2, 0, 0], [10, 8, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))

  // offset it by -2.
  offsetLinePath2 = offset({ delta: -2, corners: 'edge', segments: 8 }, linePath2)
  offsetPoints = path2.toPoints(offsetLinePath2)
  t.notThrows(() => path2.validate(offsetLinePath2))
  t.is(offsetPoints.length, 5)
  boundingBox = measureBoundingBox(offsetLinePath2)
  t.true(comparePoints(boundingBox, [[-2, 0, 0], [10, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('offset: offsetting a 2 segment straight line produces expected geometry', (t) => {
  const points = [[0, 0], [0, 5], [0, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const offsetLinePath2 = offset({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const offsetPoints = path2.toPoints(offsetLinePath2)
  t.notThrows(() => path2.validate(offsetLinePath2))
  t.is(offsetPoints.length, 3)
  const boundingBox = measureBoundingBox(offsetLinePath2)
  t.true(comparePoints(boundingBox, [[2, 0, 0], [2, 10, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('offset (corners: chamfer): offset of a path2 produces expected offset path2', (t) => {
  const openline = path2.fromPoints({ }, [[0, 0], [5, 0], [0, 5]])
  const closeline = path2.fromPoints({ }, [[0, 0], [5, 0], [0, 5], [0, 0]])

  // empty path2
  const empty = path2.create()
  let obs = offset({ delta: 1 }, empty)
  let pts = path2.toPoints(obs)
  let exp = [
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))

  // expand +
  obs = offset({ delta: 1, corners: 'chamfer' }, openline)
  pts = path2.toPoints(obs)
  exp = [
    [-6.123233995736766e-17, -1],
    [5, -1],
    [5.707106781186548, 0.7071067811865475],
    [0.7071067811865475, 5.707106781186548]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))

  obs = offset({ delta: 1, corners: 'chamfer' }, closeline)
  pts = path2.toPoints(obs)
  exp = [
    [-6.123233995736766e-17, -1],
    [5, -1],
    [5.707106781186548, 0.7071067811865475],
    [0.7071067811865475, 5.707106781186548],
    [-1, 5],
    [-1, 6.123233995736766e-17]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))

  // contract -
  obs = offset({ delta: -1, corners: 'chamfer' }, openline)
  pts = path2.toPoints(obs)
  exp = [
    [6.123233995736766e-17, 1],
    [2.5857864376269046, 1],
    [-0.7071067811865475, 4.292893218813452]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))

  obs = offset({ delta: -1, corners: 'chamfer' }, closeline)
  pts = path2.toPoints(obs)
  exp = [
    [1, 1],
    [2.5857864376269046, 1],
    [0.9999999999999996, 2.585786437626905]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))
})

test('offset (corners: edge): offset of a path2 produces expected offset path2', (t) => {
  const openline = path2.fromPoints({ }, [[-5, -5], [5, -5], [5, 5], [3, 5], [3, 0], [-3, 0], [-3, 5], [-5, 5]])
  const closeline = path2.fromPoints({ }, [[-5, -5], [5, -5], [5, 5], [3, 5], [3, 0], [-3, 0], [-3, 5], [-5, 5], [-5, -5]])

  let obs = offset({ delta: 1, corners: 'edge' }, openline)
  let pts = path2.toPoints(obs)
  let exp = [
    [-5, -6],
    [6, -6],
    [6, 6],
    [2, 6],
    [2, 1],
    [-2, 1],
    [-1.9999999999999996, 6],
    [-5, 6]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))

  obs = offset({ delta: 1, corners: 'edge' }, closeline)
  pts = path2.toPoints(obs)
  exp = [
    [6, -6],
    [6, 6],
    [2, 6],
    [2, 1],
    [-2, 1],
    [-1.9999999999999996, 6],
    [-6, 6],
    [-6, -6]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))

  obs = offset({ delta: -0.5, corners: 'edge' }, openline)
  pts = path2.toPoints(obs)
  exp = [
    [-5, -4.5],
    [4.5, -4.5],
    [4.5, 4.5],
    [3.5, 4.5],
    [3.4999999999999996, -0.5],
    [-3.5, -0.4999999999999996],
    [-3.5, 4.5],
    [-5, 4.5]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))

  obs = offset({ delta: -0.5, corners: 'edge' }, closeline)
  pts = path2.toPoints(obs)
  exp = [
    [-4.5, -4.5],
    [4.5, -4.5],
    [4.5, 4.5],
    [3.5, 4.5],
    [3.4999999999999996, -0.5],
    [-3.5, -0.4999999999999996],
    [-3.5, 4.5],
    [-4.5, 4.5]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))
})

test('offset (corners: round): offset of a path2 produces expected offset path2', (t) => {
  const openline = path2.fromPoints({ }, [[-5, -5], [5, -5], [5, 5], [3, 5], [3, 0], [-3, 0], [-3, 5], [-5, 5]])
  const closeline = path2.fromPoints({ }, [[-5, -5], [5, -5], [5, 5], [3, 5], [3, 0], [-3, 0], [-3, 5], [-5, 5], [-5, -5]])

  let obs = offset({ delta: 1, corners: 'round', segments: 16 }, openline)
  let pts = path2.toPoints(obs)
  let exp = [
    [-5, -6],
    [5, -6],
    [5.38268343236509, -5.923879532511287],
    [5.707106781186548, -5.707106781186548],
    [5.923879532511287, -5.38268343236509],
    [6, -5],
    [6, 5],
    [5.923879532511287, 5.38268343236509],
    [5.707106781186548, 5.707106781186548],
    [5.38268343236509, 5.923879532511287],
    [5, 6],
    [3, 6],
    [2.6173165676349104, 5.923879532511287],
    [2.2928932188134525, 5.707106781186548],
    [2.076120467488713, 5.38268343236509],
    [2, 5],
    [2, 1],
    [-2, 1],
    [-2, 5],
    [-2.076120467488713, 5.38268343236509],
    [-2.2928932188134525, 5.707106781186548],
    [-2.6173165676349104, 5.923879532511287],
    [-3, 6],
    [-5, 6]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))

  obs = offset({ delta: 1, corners: 'round', segments: 16 }, closeline)
  pts = path2.toPoints(obs)
  exp = [
    [-5.923879532511287, -5.38268343236509],
    [-5.707106781186548, -5.707106781186548],
    [-5.3826834323650905, -5.923879532511286],
    [-5, -6],
    [5, -6],
    [5.38268343236509, -5.923879532511287],
    [5.707106781186548, -5.707106781186548],
    [5.923879532511287, -5.38268343236509],
    [6, -5],
    [6, 5],
    [5.923879532511287, 5.38268343236509],
    [5.707106781186548, 5.707106781186548],
    [5.38268343236509, 5.923879532511287],
    [5, 6],
    [3, 6],
    [2.6173165676349104, 5.923879532511287],
    [2.2928932188134525, 5.707106781186548],
    [2.076120467488713, 5.38268343236509],
    [2, 5],
    [2, 1],
    [-2, 1],
    [-2, 5],
    [-2.076120467488713, 5.38268343236509],
    [-2.2928932188134525, 5.707106781186548],
    [-2.6173165676349104, 5.923879532511287],
    [-3, 6],
    [-5, 6],
    [-5.38268343236509, 5.923879532511287],
    [-5.707106781186548, 5.707106781186548],
    [-5.923879532511287, 5.38268343236509],
    [-6, 5],
    [-6, -5]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))
})

test('offset (corners: round): offset of a CW path2 produces expected offset path2', (t) => {
  const closeline = path2.fromPoints({ }, [[-5, -5], [5, -5], [5, 5], [3, 5], [3, 0], [-3, 0], [-3, 5], [-5, 5], [-5, -5]].reverse())

  const obs = offset({ delta: 1, corners: 'round', segments: 16 }, closeline)
  const pts = path2.toPoints(obs)
  const exp = [
    [-5.38268343236509, -5.923879532511287],
    [-5.707106781186548, -5.707106781186548],
    [-5.923879532511287, -5.38268343236509],
    [-6, -5],
    [-6, 5],
    [-5.923879532511287, 5.38268343236509],
    [-5.707106781186548, 5.707106781186548],
    [-5.38268343236509, 5.923879532511287],
    [-5, 6],
    [-3, 6],
    [-2.6173165676349104, 5.923879532511287],
    [-2.2928932188134525, 5.707106781186548],
    [-2.076120467488713, 5.38268343236509],
    [-2, 5],
    [-2, 1],
    [2, 1],
    [2, 5],
    [2.076120467488713, 5.38268343236509],
    [2.2928932188134525, 5.707106781186548],
    [2.6173165676349104, 5.923879532511287],
    [3, 6],
    [5, 6],
    [5.38268343236509, 5.923879532511287],
    [5.707106781186548, 5.707106781186548],
    [5.923879532511287, 5.38268343236509],
    [6, 5],
    [6, -5],
    [5.923879532511287, -5.38268343236509],
    [5.707106781186548, -5.707106781186548],
    [5.38268343236509, -5.923879532511287],
    [5, -6],
    [-5, -6]
  ]
  t.notThrows(() => path2.validate(obs))
  t.true(comparePoints(pts, exp))
})

test('offset (options): offsetting of a simple geom2 produces expected offset geom2', (t) => {
  const geometry = geom2.fromPoints([[-5, -5], [5, -5], [5, 5], [3, 5], [3, 0], [-3, 0], [-3, 5], [-5, 5]])

  // empty
  const empty = geom2.create()
  let obs = offset({ delta: 1 }, empty)
  let pts = geom2.toPoints(obs)
  let exp = [
  ]
  t.notThrows(() => geom2.validate(obs))
  t.true(comparePoints(pts, exp))

  // expand +
  obs = offset({ delta: 1, corners: 'round' }, geometry)
  pts = geom2.toPoints(obs)
  exp = [
    [-5, -6],
    [5, -6],
    [6, -5],
    [6, 5],
    [5, 6],
    [3, 6],
    [2, 5],
    [2, 1],
    [-2, 1],
    [-2, 5],
    [-3, 6],
    [-5, 6],
    [-6, 5],
    [-6, -5]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.true(comparePoints(pts, exp))

  // contract -
  obs = offset({ delta: -0.5, corners: 'round' }, geometry)
  pts = geom2.toPoints(obs)
  exp = [
    [-4.5, -4.5],
    [4.5, -4.5],
    [4.5, 4.5],
    [3.5, 4.5],
    [3.5, -3.0616171314629196e-17],
    [3, -0.5],
    [-3, -0.5],
    [-3.5, 3.0616171314629196e-17],
    [-3.5, 4.5],
    [-4.5, 4.5]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.true(comparePoints(pts, exp))

  // segments 1 - sharp points at corner
  obs = offset({ delta: 1, corners: 'edge' }, geometry)
  pts = geom2.toPoints(obs)
  exp = [
    [6, -6],
    [6, 6],
    [2, 6],
    [2, 1],
    [-2, 1],
    [-1.9999999999999996, 6],
    [-6, 6],
    [-6, -6]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.true(comparePoints(pts, exp))

  // segments 16 - rounded corners
  obs = offset({ delta: -0.5, corners: 'round', segments: 16 }, geometry)
  pts = geom2.toPoints(obs)
  exp = [
    [-4.5, -4.5],
    [4.5, -4.5],
    [4.5, 4.5],
    [3.5, 4.5],
    [3.5, -3.061616997868383e-17],
    [3.4619397662556435, -0.19134171618254492],
    [3.353553390593274, -0.3535533905932738],
    [3.191341716182545, -0.46193976625564337],
    [3, -0.5],
    [-3, -0.5],
    [-3.191341716182545, -0.46193976625564337],
    [-3.353553390593274, -0.3535533905932738],
    [-3.4619397662556435, -0.19134171618254495],
    [-3.5, 3.061616997868383e-17],
    [-3.5, 4.5],
    [-4.5, 4.5]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.true(comparePoints(pts, exp))
})

test('offset (options): offsetting of a complex geom2 produces expected offset geom2', (t) => {
  const geometry = geom2.create([
    [[-75, 75], [-75, -75]],
    [[-75, -75], [75, -75]],
    [[75, -75], [75, 75]],
    [[-40, 75], [-75, 75]],
    [[75, 75], [40, 75]],
    [[40, 75], [40, 0]],
    [[40, 0], [-40, 0]],
    [[-40, 0], [-40, 75]],
    [[15, -10], [15, -40]],
    [[-15, -10], [15, -10]],
    [[-15, -40], [-15, -10]],
    [[-8, -40], [-15, -40]],
    [[15, -40], [8, -40]],
    [[-8, -25], [-8, -40]],
    [[8, -25], [-8, -25]],
    [[8, -40], [8, -25]],
    [[-2, -15], [-2, -19]],
    [[-2, -19], [2, -19]],
    [[2, -19], [2, -15]],
    [[2, -15], [-2, -15]]
  ])

  // expand +
  const obs = offset({ delta: 2, corners: 'edge' }, geometry)
  const pts = geom2.toPoints(obs)
  const exp = [
    [77, -77],
    [77, 77],
    [38, 77],
    [38, 2],
    [-38, 2],
    [-37.99999999999999, 77],
    [-77, 77],
    [13, -12],
    [13, -38],
    [10, -38],
    [10, -23],
    [-10, -23],
    [-10, -38],
    [-13, -38],
    [-13, -12],
    [-4, -21],
    [3.9999999999999996, -21],
    [4, -13],
    [-4, -13],
    [-77, -77]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 20)
  t.true(comparePoints(pts, exp))
})

test('offset (options): offsetting of round geom2 produces expected offset geom2', (t) => {
  const geometry = geom2.fromPoints([
    [10.00000, 0.00000],
    [9.23880, 3.82683],
    [7.07107, 7.07107],
    [3.82683, 9.23880],
    [0.00000, 10.00000],
    [-3.82683, 9.23880],
    [-7.07107, 7.07107],
    [-9.23880, 3.82683],
    [-10.00000, 0.00000],
    [-9.23880, -3.82683],
    [-7.07107, -7.07107],
    [-3.82683, -9.23880],
    [-0.00000, -10.00000],
    [3.82683, -9.23880],
    [7.07107, -7.07107],
    [9.23880, -3.82683]
  ])

  const obs = offset({ delta: -0.5, corners: 'round' }, geometry)
  const pts = geom2.toPoints(obs)
  const exp = [
    [9.490204518135641, 0],
    [8.767810140100096, 3.6317399864658007],
    [6.710590060510285, 6.7105900605102855],
    [3.6317399864658024, 8.767810140100096],
    [-4.440892098500626e-16, 9.490204518135641],
    [-3.6317399864658007, 8.767810140100096],
    [-6.7105900605102855, 6.710590060510285],
    [-8.767810140100096, 3.6317399864658024],
    [-9.490204518135641, -4.440892098500626e-16],
    [-8.767810140100096, -3.6317399864658007],
    [-6.710590060510285, -6.7105900605102855],
    [-3.6317399864658024, -8.767810140100096],
    [4.440892098500626e-16, -9.490204518135641],
    [3.6317399864658007, -8.767810140100096],
    [6.7105900605102855, -6.710590060510285],
    [8.767810140100096, -3.6317399864658024]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 16)
  t.true(comparePoints(pts, exp))
})
