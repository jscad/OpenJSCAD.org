const test = require('ava')
const { clone, create, fromPoints } = require('./index')

test('geom3: clone() should return a new geometry with same values', (t) => {
  const polygons = [
    [// a simple triangle
      [0, 0, 0],
      [0, 10, 0],
      [0, 10, 10]
    ]
  ]

  const org1 = create()
  const obs1 = clone(org1)
  t.deepEqual(org1, obs1)
  t.not(obs1, org1)

  const org2 = fromPoints(polygons)
  const obs2 = clone(org2)
  t.deepEqual(org2, obs2)
  t.not(obs2, org2)
})
