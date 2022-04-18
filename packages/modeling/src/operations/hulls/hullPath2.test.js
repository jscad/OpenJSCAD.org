const test = require('ava')

const { path2 } = require('../../geometries')

const hullPath2 = require('./hullPath2')

test('hullPath2', (t) => {
  const closed = true
  const geometry1 = path2.fromPoints({ closed }, [[0, 0], [-4, 4], [-4, -4]])
  const geometry2 = path2.fromPoints({ closed }, [[0, 0], [4, -4], [4, 4]])

  const obs = hullPath2(geometry1, geometry2)
  t.notThrows(() => path2.validate(obs))
  const pts = path2.toPoints(obs)
  t.is(pts.length, 4)
})
