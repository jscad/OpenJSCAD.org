const test = require('ava')
const { create } = require('./index')

test('geom3: create() should return an empty geometry', (t) => {
  const obs = create()
  const exp = {
    polygons: [],
    isCanonicalized: true,
    isRetesselated: true
  }
  t.deepEqual(obs, exp)
})
