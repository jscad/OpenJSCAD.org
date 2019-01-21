const test = require('ava')
const { invert, create, fromPoints } = require('./index')

test('geom3: invert() should return correct geometries', (t) => {
  const polygons = [
    [// a simple triangle
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
  ]
  const reverse = [
    [// a simple triangle
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0]
    ]
  ]

  const org1 = create()
  const exp1 = { 
    polygons: [],
    isCanonicalized: false,
    isRetesselated: false
  }
  const obs1 = invert(org1)
  t.deepEqual(obs1, exp1)

  const org2 = fromPoints(polygons)
  const exp2 = fromPoints(reverse)
  const obs2 = invert(org2)
  t.deepEqual(obs2, exp2)
})
