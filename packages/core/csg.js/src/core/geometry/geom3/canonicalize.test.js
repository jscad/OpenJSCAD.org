const test = require('ava')
const { canonicalize, create, fromPoints } = require('./index')

test('geom3: canonicalize() should return same geometry or new geometry', (t) => {
  const polygons = [
    [// a simple triangle
      [0, 0, 0],
      [0, 10, 0],
      [0, 10, 10]
    ]
  ]

  // should return the same geometry if already canonicalize
  const org1 = create()
  const obs1 = canonicalize(org1)
  t.deepEqual(org1, obs1)
  t.is(obs1, org1)

  // should return a new geometry if not canonicalize
  const org2 = fromPoints(polygons)
  const exp2 = fromPoints(polygons)
  exp2.isCanonicalized = true
  const obs2 = canonicalize(org2)
  t.deepEqual(exp2, obs2)
  t.not(obs2, org2)
})
