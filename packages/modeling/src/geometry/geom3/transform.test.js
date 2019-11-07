const test = require('ava')

const mat4 = require('../../math/mat4')

const {transform, fromPoints, toPolygons} = require('./index')

test('transform: Adjusts the transforms of a populated geom3', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const rotation = 90 * 0.017453292519943295
  const rotate90 = mat4.fromZRotation(rotation)

  // continue with typical user scenario, several itterations of transforms and access

  // expect lazy transform, i.e. only the transforms change
  const expected = {
    polygons: [
      {
        plane: new Float32Array([0, -1, 0, 0]),
        vertices: [
          new Float32Array([0, 0, 0]),
          new Float32Array([1, 0, 0]),
          new Float32Array([1, 0, 1]),
         ]
      }
    ],
    isRetesselated: false,
    transforms: new Float32Array([6.123233995736766e-17, 1, 0, 0, -1, 6.123233995736766e-17, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  }
  const geometry = fromPoints(points)
  let another = transform(rotate90, geometry)
  t.not(geometry, another)
  t.deepEqual(another, expected)

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = new Float32Array([6.123234262925839e-17, 1, 0, 0, -1, 6.123234262925839e-17, 0, 0, 0, 0, 1, 0, -5, 5, 5, 1])
  another = transform(mat4.fromTranslation([5, 5, 5]), another)
  t.deepEqual(another, expected)

  // expect application of the transforms to the polygons
  expected.polygons = [
    {
      plane: new Float32Array([1, 0, 0, -5]),
      vertices: [
        new Float32Array([-5, 5, 5]),
        new Float32Array([-5, 6, 5]),
        new Float32Array([-5, 6, 6]),
       ]
    }
  ]
  expected.transforms = mat4.identity()
  let polygons = toPolygons(another)
  t.deepEqual(another, expected)

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 5, 5, 1 ])
  another = transform(mat4.fromTranslation([5, 5, 5]), another)
  t.deepEqual(another, expected)
})
