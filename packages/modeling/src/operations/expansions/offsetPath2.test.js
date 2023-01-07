import test from 'ava'

import { path2 } from '../../geometries/index.js'
import { measureBoundingBox } from '../../measurements/index.js'

import { offset } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

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
