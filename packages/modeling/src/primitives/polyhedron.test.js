import test from 'ava'

import { geom3 } from '../geometries/index.js'

import { measureArea, measureVolume } from '../measurements/index.js'

import { polyhedron } from './index.js'

import { comparePolygonsAsPoints } from '../../test/helpers/index.js'

test('polyhedron (points and faces)', (t) => {
  // points and faces form a cube
  let points = [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1], [1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]]
  let faces = [[0, 1, 2, 3], [5, 6, 7, 4], [0, 5, 4, 1], [3, 2, 7, 6], [0, 3, 6, 5], [1, 4, 7, 2]]
  const colors = [[0, 0, 0, 1], [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1], [0.5, 0.5, 0.5, 1], [1, 1, 1, 1]]
  let obs = polyhedron({ points, faces, colors })
  let pts = geom3.toVertices(obs)
  let exp = [
    [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
    [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
    [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
    [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
    [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
    [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 24)
  t.is(measureVolume(obs), 7.999999999999999)
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test orientation
  points = [[10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10]]
  faces = [[0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3]]
  obs = polyhedron({ points: points, faces: faces, orientation: 'inward' })
  pts = geom3.toVertices(obs)
  exp = [
    [[0, 0, 10], [10, -10, 0], [10, 10, 0]],
    [[0, 0, 10], [-10, -10, 0], [10, -10, 0]],
    [[0, 0, 10], [-10, 10, 0], [-10, -10, 0]],
    [[0, 0, 10], [10, 10, 0], [-10, 10, 0]],
    [[-10, 10, 0], [10, 10, 0], [10, -10, 0]],
    [[-10, 10, 0], [10, -10, 0], [-10, -10, 0]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 965.6854249492379)
  t.is(measureVolume(obs), 1333.3333333333333)
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))
})
