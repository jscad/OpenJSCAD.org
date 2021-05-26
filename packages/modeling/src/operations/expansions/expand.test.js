const test = require('ava')

const { comparePoints, nearlyEqual } = require('../../../test/helpers')
const { geom2, geom3, path2 } = require('../../geometries')
const measureBoundingBox = require('../../measurements/measureBoundingBox')
const area = require('../../maths/utils/area')
const sphere = require('../../primitives/sphere')

const { expand } = require('./index')

test('expand: edge-expanding a straight line produces rectangle', (t) => {
  const points = [[0, 0], [0, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = expand({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.is(area(expandedPoints), 40)
  t.true(comparePoints(measureBoundingBox(expandedPathGeom2), [[-2, 0, 0], [2, 10, 0]]))
})

test('expand: edge-expanding a bent line produces expected geometry', (t) => {
  const points = [[0, 0], [0, 10], [-5, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = expand({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.is(area(expandedPoints), 60)
  const boundingBox = measureBoundingBox(expandedPathGeom2)
  t.true(comparePoints(boundingBox, [[-5, 0, 0], [2, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('expand: edge-expanding a bent line, reversed points, produces expected geometry', (t) => {
  const points = [[-5, 10], [0, 10], [0, 0]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = expand({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

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

  const expectedArea = 56 + 2 * Math.PI * delta * 1.25 // shape will have 1 and 1/4 circles
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

  t.is(pts.length, 62)
  t.true(comparePoints(pts[0], exp0))
  t.true(comparePoints(pts[61], exp61))

  const geometry2 = sphere({ radius: 5, segments: 8 })
  const obs2 = expand({ delta: 5 }, geometry2)
  const pts2 = geom3.toPoints(obs2)
  t.is(pts2.length, 2061)
})

test('expand (options): offsetting of a complex geom2 produces expected offset geom2', (t) => {
  const geometry = geom2.create([
    [[-75.00000, 75.00000], [-75.00000, -75.00000]],
    [[-75.00000, -75.00000], [75.00000, -75.00000]],
    [[75.00000, -75.00000], [75.00000, 75.00000]],
    [[-40.00000, 75.00000], [-75.00000, 75.00000]],
    [[75.00000, 75.00000], [40.00000, 75.00000]],
    [[40.00000, 75.00000], [40.00000, 0.00000]],
    [[40.00000, 0.00000], [-40.00000, 0.00000]],
    [[-40.00000, 0.00000], [-40.00000, 75.00000]],
    [[15.00000, -10.00000], [15.00000, -40.00000]],
    [[-15.00000, -10.00000], [15.00000, -10.00000]],
    [[-15.00000, -40.00000], [-15.00000, -10.00000]],
    [[-8.00000, -40.00000], [-15.00000, -40.00000]],
    [[15.00000, -40.00000], [8.00000, -40.00000]],
    [[-8.00000, -25.00000], [-8.00000, -40.00000]],
    [[8.00000, -25.00000], [-8.00000, -25.00000]],
    [[8.00000, -40.00000], [8.00000, -25.00000]],
    [[-2.00000, -15.00000], [-2.00000, -19.00000]],
    [[-2.00000, -19.00000], [2.00000, -19.00000]],
    [[2.00000, -19.00000], [2.00000, -15.00000]],
    [[2.00000, -15.00000], [-2.00000, -15.00000]]
  ])

  // expand +
  const obs = expand({ delta: 2, corners: 'edge' }, geometry)
  const pts = geom2.toPoints(obs)
  const exp = [
    [-77, -77],
    [-75, -77],
    [75, -77],
    [77, -77],
    [77, -75],
    [77, 75],
    [77, 77],
    [75, 77],
    [40, 77],
    [38, 77],
    [38, 75],
    [38, 2],
    [-38, 2],
    [-38, 75],
    [-37.99999999999999, 77],
    [-40, 77],
    [-75, 77],
    [-77, 77],
    [-77, 75],
    [17, -40],
    [16.999999999999996, -42],
    [15, -42],
    [8, -42],
    [6, -42],
    [6, -40],
    [6, -27],
    [-6, -27],
    [-6, -40],
    [-6.000000000000001, -42],
    [-8, -42],
    [-15, -42],
    [-17, -42],
    [-17, -40],
    [-17, -10],
    [-16.999999999999996, -8],
    [-15, -8],
    [15, -8],
    [17, -8.000000000000004],
    [17, -10],
    [-4, -19],
    [-4, -21],
    [-2, -21],
    [1.9999999999999998, -21],
    [3.9999999999999996, -21],
    [4, -19],
    [4, -15],
    [4, -13],
    [2, -13],
    [-1.9999999999999998, -13],
    [-4, -13],
    [-4, -15],
    [-77, -75]
  ]
  t.is(pts.length, 52)
  t.true(comparePoints(pts, exp))
})
