const test = require('ava')

const { reverse, fromPoints, transform } = require('./index')

const mat4 = require('../../maths/mat4')

const { comparePoints, compareVectors } = require('../../../test/helpers/')

test('reverse: keeps color and other fields of the geometry', (t) => {
  const geometry = fromPoints([[0, 0], [1, 0], [0, 1]])
  geometry.color = [1, 0, 0, 1]
  geometry.userData = { name: 'part' }
  const another = reverse(geometry)
  t.deepEqual(another.color, [1, 0, 0, 1])
  t.is(another.userData, geometry.userData)
  t.not(another.sides, geometry.sides)
  t.true(compareVectors(another.transforms, mat4.create()))
})

test('reverse: mirroring a geom2 keeps its fields', (t) => {
  const geometry = fromPoints([[0, 0], [1, 0], [0, 1]])
  geometry.color = [0, 0, 1, 1]
  geometry.userData = { name: 'part' }
  const mirrored = transform(mat4.fromScaling(mat4.create(), [-1, 1, 1]), geometry)
  t.deepEqual(mirrored.color, [0, 0, 1, 1])
  t.is(mirrored.userData, geometry.userData)
})

test('reverse: Reverses a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    sides: [[[0, 1], [1, 0]], [[1, 0], [0, 0]], [[0, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const another = reverse(geometry)
  t.not(geometry, another)
  t.true(comparePoints(another.sides[0], expected.sides[0]))
  t.true(comparePoints(another.sides[1], expected.sides[1]))
  t.true(comparePoints(another.sides[2], expected.sides[2]))
  t.true(compareVectors(another.transforms, expected.transforms))
})
