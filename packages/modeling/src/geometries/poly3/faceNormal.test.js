const test = require('ava')

const faceNormal = require('./faceNormal')

test('poly3: faceNormal() should return a new vec3 with correct values', (t) => {
  // simple triangle
  t.deepEqual(
    faceNormal([
      [ 0, 0, 0 ],
      [ 2, 0, 0 ],
      [ 0, 1, 0 ],
    ], 0),
    [0, 0, 1]
  )

  // colinear vertices
  t.deepEqual(
    faceNormal([
      [ 0, 0, 0 ],
      [ 1, 0, 0 ],
      [ 2, 0, 0 ],
      [ 0, 1, 0 ],
    ], 0),
    [0, 0, 1]
  )

  // duplicate vertices
  t.deepEqual(
    faceNormal([
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 2, 0, 0 ],
      [ 0, 1, 0 ],
    ], 0),
    [0, 0, 1]
  )
})
