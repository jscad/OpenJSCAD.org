const test = require('ava')

const { transform, create, fromPoints } = require('./index')

test('shape3: transform() should return a new shape3 with correct values', (t) => {
  const polygons = [
    [// a simple triangle
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
  ]

  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const org1 = create()
  const ret1 = transform(identityMatrix, org1)
  t.deepEqual(org1, ret1)
  t.not(org1, ret1)

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const org2 = fromPoints(polygons)
  const exp2 = fromPoints([[[2, 5, 7], [1, 6, 7], [1, 5, 8]]])
  const ret2 = transform(translationMatrix, org2)
  t.deepEqual(ret2, exp2)
  t.not(org2, ret2)

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r),  Math.cos(r), 0, 0,
              0,            0, 1, 0,
              0,            0, 0, 1
  ]

  const org3 = fromPoints(polygons)
  const exp3 = fromPoints([[[0,-1, 0], [1, 0, 0], [0, 0, 1]]])
  const ret3 = transform(rotateZMatrix, org3)
  // TODO need compare routine t.deepEqual(ret3, exp3)
  t.not(org3, ret3)

  const mirrorMatrix = [
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const org4 = fromPoints(polygons)
  const exp4 = fromPoints([[[0, 0, 1], [0, 1, 0], [-1, 0, 0]]])
  const ret4 = transform(mirrorMatrix, org4)
  t.deepEqual(ret4, exp4)
  t.not(org4, ret4)
})
