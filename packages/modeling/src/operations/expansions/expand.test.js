const test = require('ava')

const { comparePoints, nearlyEqual } = require('../../../test/helpers')

const { geom2, geom3, path2 } = require('../../geometries')
const measureBoundingBox = require('../../measurements/measureBoundingBox')
const area = require('../../maths/utils/area')
const { TAU } = require('../../maths/constants')
const sphere = require('../../primitives/sphere')

const { expand } = require('./index')

test('expand: edge-expanding a straight line produces rectangle', (t) => {
  const points = [[0, 0], [0, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = expand({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  t.is(area(expandedPoints), 40)
  t.true(comparePoints(measureBoundingBox(expandedPathGeom2), [[-2, 0, 0], [2, 10, 0]]))
})

test('expand: edge-expanding a bent line produces expected geometry', (t) => {
  const points = [[0, 0], [0, 10], [-5, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = expand({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  t.is(area(expandedPoints), 60)
  const boundingBox = measureBoundingBox(expandedPathGeom2)
  t.true(comparePoints(boundingBox, [[-5, 0, 0], [2, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('expand: edge-expanding a bent line, reversed points, produces expected geometry', (t) => {
  const points = [[-5, 10], [0, 10], [0, 0]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = expand({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  t.is(area(expandedPoints), 60)
  const boundingBox = measureBoundingBox(expandedPathGeom2)
  t.true(comparePoints(boundingBox, [[-5, 0, 0], [2, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('expand: round-expanding a bent line produces expected geometry', (t) => {
  const delta = 2
  const points = [[0, 0], [0, 10], [-5, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = expand({ delta, corners: 'round', segments: 128 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  const expectedArea = 56 + TAU * delta * 1.25 // shape will have 1 and 1/4 circles
  nearlyEqual(t, area(expandedPoints), expectedArea, 0.01, 'Measured area should be pretty close')
  const boundingBox = measureBoundingBox(expandedPathGeom2)
  t.true(comparePoints(boundingBox, [[-7, -2, 0], [2, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('expand: chamfer-expanding a bent line produces expected geometry', (t) => {
  const delta = 2
  const points = [[0, 0], [0, 10], [-5, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = expand({ delta, corners: 'chamfer', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  t.is(area(expandedPoints), 58)
  const boundingBox = measureBoundingBox(expandedPathGeom2)
  t.true(comparePoints(boundingBox, [[-5, 0, 0], [2, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('expand: expanding of a geom2 produces expected changes to points', (t) => {
  const geometry = geom2.fromPoints([[-8, -8], [8, -8], [8, 8], [-8, 8]])

  const obs = expand({ delta: 2, corners: 'round', segments: 8 }, geometry)
  const pts = geom2.toPoints(obs)
  const exp = [
    [-9.414213562373096, -9.414213562373096],
    [-8, -10],
    [8, -10],
    [9.414213562373096, -9.414213562373096],
    [10, -8],
    [10, 8],
    [9.414213562373096, 9.414213562373096],
    [8, 10],
    [-8, 10],
    [-9.414213562373096, 9.414213562373096],
    [-10, 8],
    [-10, -8]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 12)
  t.true(comparePoints(pts, exp))
})

test('expand: expanding of a geom3 produces expected changes to polygons', (t) => {
  const polygonsAsPoints = [
    [[-5, -5, -5], [-5, -5, 15], [-5, 15, 15], [-5, 15, -5]],
    [[15, -5, -5], [15, 15, -5], [15, 15, 15], [15, -5, 15]],
    [[-5, -5, -5], [15, -5, -5], [15, -5, 15], [-5, -5, 15]],
    [[-5, 15, -5], [-5, 15, 15], [15, 15, 15], [15, 15, -5]],
    [[-5, -5, -5], [-5, 15, -5], [15, 15, -5], [15, -5, -5]],
    [[-5, -5, 15], [15, -5, 15], [15, 15, 15], [-5, 15, 15]]
  ]
  const geometry = geom3.fromPoints(polygonsAsPoints)

  const obs = expand({ delta: 2, corners: 'round', segments: 8 }, geometry)
  const pts = geom3.toPoints(obs)
  const exp0 = [
    [-7, -5, -5],
    [-7, -5, 15],
    [-7, 15, 15],
    [-7, 15, -5]
  ]
  const exp61 = [
    [15, -7, 15],
    [16.414213562373096, -6.414213562373095, 15],
    [16, -6.414213562373095, 16]
  ]

  t.notThrows.skip(() => geom3.validate(obs))
  t.is(pts.length, 62)
  t.true(comparePoints(pts[0], exp0))
  t.true(comparePoints(pts[61], exp61))

  const geometry2 = sphere({ radius: 5, segments: 8 })
  const obs2 = expand({ delta: 5 }, geometry2)
  const pts2 = geom3.toPoints(obs2)
  t.notThrows.skip(() => geom3.validate(obs2))
  t.is(pts2.length, 864)
})

test('expand (options): offsetting of a complex geom2 produces expected offset geom2', (t) => {
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
  const obs = expand({ delta: 2, corners: 'edge' }, geometry)
  const pts = geom2.toPoints(obs)
  const exp = [
    [77, -77],
    [77, 77],
    [38, 77],
    [38, 2],
    [-38, 2],
    [-37.99999999999999, 77],
    [-77, 77],
    [16.999999999999996, -42],
    [6, -42],
    [6, -27],
    [-6, -27],
    [-6.000000000000001, -42],
    [-17, -42],
    [-16.999999999999996, -8],
    [17, -8.000000000000004],
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
