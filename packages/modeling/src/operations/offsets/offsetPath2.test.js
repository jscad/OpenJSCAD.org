import test from 'ava'

import { comparePoints, nearlyEqual } from '../../../test/helpers/index.js'

import { geom2, geom3, path2 } from '../../geometries/index.js'
import { measureBoundingBox } from '../../measurements/index.js'
import { area } from '../../maths/utils/index.js'
import { TAU } from '../../maths/constants.js'
import { sphere, square } from '../../primitives/index.js'

import { offset } from './index.js'

test('offset: edge-expanding a straight line produces rectangle', (t) => {
  const points = [[0, 0], [0, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = offset({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  t.is(area(expandedPoints), 40)
  t.true(comparePoints(measureBoundingBox(expandedPathGeom2), [[-2, 0, 0], [2, 10, 0]]))
})

test('offset: edge-expanding a bent line produces expected geometry', (t) => {
  const points = [[0, 0], [0, 10], [-5, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = offset({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  t.is(area(expandedPoints), 60)
  const boundingBox = measureBoundingBox(expandedPathGeom2)
  t.true(comparePoints(boundingBox, [[-5, 0, 0], [2, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('offset: edge-expanding a bent line, reversed points, produces expected geometry', (t) => {
  const points = [[-5, 10], [0, 10], [0, 0]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = offset({ delta: 2, corners: 'edge', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  t.is(area(expandedPoints), 60)
  const boundingBox = measureBoundingBox(expandedPathGeom2)
  t.true(comparePoints(boundingBox, [[-5, 0, 0], [2, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('offset: round-expanding a bent line produces expected geometry', (t) => {
  const delta = 2
  const points = [[0, 0], [0, 10], [-5, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = offset({ delta, corners: 'round', segments: 128 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  const expectedArea = 56 + TAU * delta * 1.25 // shape will have 1 and 1/4 circles
  nearlyEqual(t, area(expandedPoints), expectedArea, 0.01, 'Measured area should be pretty close')
  const boundingBox = measureBoundingBox(expandedPathGeom2)
  t.true(comparePoints(boundingBox, [[-7, -2, 0], [2, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})

test('offset: chamfer-expanding a bent line produces expected geometry', (t) => {
  const delta = 2
  const points = [[0, 0], [0, 10], [-5, 10]]
  const linePath2 = path2.fromPoints({ closed: false }, points)
  const expandedPathGeom2 = offset({ delta, corners: 'chamfer', segments: 8 }, linePath2)
  const expandedPoints = geom2.toPoints(expandedPathGeom2)

  t.notThrows(() => geom2.validate(expandedPathGeom2))
  t.is(area(expandedPoints), 58)
  const boundingBox = measureBoundingBox(expandedPathGeom2)
  t.true(comparePoints(boundingBox, [[-5, 0, 0], [2, 12, 0]]), 'Unexpected bounding box: ' + JSON.stringify(boundingBox))
})
