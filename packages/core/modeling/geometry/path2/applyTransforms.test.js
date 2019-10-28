const test = require('ava')

const {concat, fromPoints} = require('./index')

const applyTransforms = require('./applyTransforms')

test('applyTransforms: Updates a populated path with transformed points', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    points: [
      new Float32Array([0, 0]),
      new Float32Array([1, 0]),
      new Float32Array([0, 1])
    ],
    isClosed: false,
    transforms: new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])
  }
  const geometry = fromPoints({}, points)
  const updated = applyTransforms(geometry)
  t.is(geometry, updated)
  t.deepEqual(updated, expected)

  const updated2 = applyTransforms(updated)
  t.is(updated, updated2)
  t.deepEqual(updated, expected)
})
