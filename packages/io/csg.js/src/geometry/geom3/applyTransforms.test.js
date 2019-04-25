const test = require('ava')

const {fromPoints, toString} = require('./index')

const applyTransforms = require('./applyTransforms')

test('applyTransforms: Updates a geom3 with transformed polygons', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
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
    transforms: new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])
  }
  const geometry = fromPoints(points)
  const updated = applyTransforms(geometry)
  t.is(geometry, updated)
  t.deepEqual(updated, expected)

  const updated2 = applyTransforms(updated)
  t.is(updated, updated2)
  t.deepEqual(updated2, expected)
})
