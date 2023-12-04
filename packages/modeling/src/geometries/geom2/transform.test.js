import test from 'ava'

import { mat4 } from '../../maths/index.js'

import { measureArea } from '../../measurements/index.js'

import { mirrorX, mirrorY, mirrorZ } from '../../operations/transforms/index.js'

import { square } from '../../primitives/index.js'

import { create, transform, toOutlines, toSides } from './index.js'

import { comparePoints, compareVectors } from '../../../test/helpers/index.js'

test('transform: adjusts the transforms of geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const rotation = 90 * 0.017453292519943295
  const rotate90 = mat4.fromZRotation(mat4.create(), rotation)

  // continue with typical user scenario, several iterations of transforms and access

  // expect lazy transform, i.e. only the transforms change
  const expected = {
    outlines: [[[0, 0], [1, 0], [0, 1]]],
    transforms: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = create([points])
  let another = transform(rotate90, geometry)
  t.not(geometry, another)
  t.true(comparePoints(another.outlines[0], expected.outlines[0]))
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePoints(another.outlines[0], expected.outlines[0]))
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect application of the transforms to the sides
  const expectedSides = [[[5, 10], [5, 11]], [[5, 11], [4, 10]], [[4, 10], [5, 10]]]
  const sides = toSides(another)
  t.true(comparePoints(sides[0], expectedSides[0]))
  t.true(comparePoints(sides[1], expectedSides[1]))
  t.true(comparePoints(sides[2], expectedSides[2]))

  // expect application of the transforms to the outlines
  const expectedOutline = [[5, 10], [5, 11], [4, 10]]
  const outlines = toOutlines(another)
  t.is(outlines.length, 1)
  t.true(comparePoints(outlines[0], expectedOutline))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another.outlines = [[[0, 0], [1, 0], [0, 1]]]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePoints(another.outlines[0], expected.outlines[0]))
  t.true(compareVectors(another.transforms, expected.transforms))
})

test('transform: geom2 mirrorX', (t) => {
  const geometry = square()
  const transformed = mirrorX(geometry)
  t.is(measureArea(geometry), 4)
  // area will be negative unless we reversed the points
  t.is(measureArea(transformed), 4)
  const pts = toOutlines(transformed)[0]
  const exp = [[1, 1], [-1, 1], [-1, -1], [1, -1]]
  t.true(comparePoints(pts, exp))
  t.deepEqual(toSides(transformed), [
    [[1, 1], [-1, 1]],
    [[-1, 1], [-1, -1]],
    [[-1, -1], [1, -1]],
    [[1, -1], [1, 1]]
  ])
})

test('transform: geom2 mirrorY', (t) => {
  const geometry = square()
  const transformed = mirrorY(geometry)
  t.is(measureArea(geometry), 4)
  // area will be negative unless we reversed the points
  t.is(measureArea(transformed), 4)
  const pts = toOutlines(transformed)[0]
  const exp = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
  t.true(comparePoints(pts, exp))
  t.deepEqual(toSides(transformed), [
    [[-1, -1], [1, -1]],
    [[1, -1], [1, 1]],
    [[1, 1], [-1, 1]],
    [[-1, 1], [-1, -1]]
  ])
})

test('transform: geom2 mirrorZ', (t) => {
  const geometry = square()
  const transformed = mirrorZ(geometry)
  t.is(measureArea(geometry), 4)
  // area will be negative unless we DIDN'T reverse the points
  t.is(measureArea(transformed), 4)
  const pts = toOutlines(transformed)[0]
  const exp = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
  t.true(comparePoints(pts, exp))
  t.deepEqual(toSides(transformed), [
    [[-1, -1], [1, -1]],
    [[1, -1], [1, 1]],
    [[1, 1], [-1, 1]],
    [[-1, 1], [-1, -1]]
  ])
})
