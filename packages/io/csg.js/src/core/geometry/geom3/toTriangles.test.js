const test = require('ava')
const { toTriangles, create, fromPoints } = require('./index')

const poly3 = require('../poly3')

test('shape3: toTriangles() should return a proper list of triangluated polygons', (t) => {
  const triangles = [
    [
      [0, 0, 0],
      [0, 10, 0],
      [0, 10, 10]
    ],
    [
      [0, 0, 0],
      [10, 0, 0],
      [10, 0, 10]
    ]
  ]
  const quads = [
    [
      [0,  0, 0],
      [0, 10, 0],
      [0, 10, 10],
      [0,  0, 10]
    ],
    [
      [0, 0, 0],
      [10, 0, 0],
      [10, 0, 10],
      [0,  0, 10]
    ]
  ]

  const org1 = create()
  const obs1 = toTriangles(org1)
  t.deepEqual(obs1, [])
  t.not(obs1, org1)

  const org2 = fromPoints(triangles)
  const obs2 = toTriangles(org2)
  t.deepEqual(obs2, [poly3.fromPoints(triangles[0]), poly3.fromPoints(triangles[1])])
  t.not(obs2, org2)

  const org3 = fromPoints(quads)
  const obs3 = toTriangles(org3)
  t.deepEqual(obs3, [ poly3.fromPoints([[0,0,0],[0,10,10],[0, 0,10]]),
                      poly3.fromPoints([[0,0,0],[0,10, 0],[0,10,10]]),
                      poly3.fromPoints([[0,0,0],[10,0,10],[0,0,10]]),
                      poly3.fromPoints([[0,0,0],[10,0, 0],[10,0,10]]) ] )
  t.not(obs3, org3)
})
