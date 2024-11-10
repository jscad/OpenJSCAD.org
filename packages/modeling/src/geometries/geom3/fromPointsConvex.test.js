const test = require('ava')

const { fromPointsConvex, validate } = require('./index')

test('fromPointsConvex (uniquePoints)', (t) => {
  const out = []
  for (let x = -9; x <= 9; ++x) {
    for (let y = -9; y <= 9; ++y) {
      for (let z = -9; z <= 9; ++z) {
        if (x * x + y * y + z * z <= 96) out.push([x, y, z])
      }
    }
  }

  const obs = fromPointsConvex(out)
  validate(obs)

  t.is(obs.polygons.length, 170)
  t.true(obs.polygons.every((f) => ([3, 4, 8, 9].indexOf(f.vertices.length) !== -1)))

  const c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  obs.polygons.forEach((f) => c[f.vertices.length]++)
  t.is(c[3], 120)
  t.is(c[4], 24)
  t.is(c[8], 18)
  t.is(c[9], 8)

  let edges2 = 336 * 2
  obs.polygons.forEach((f) => edges2 -= f.vertices.length)
  t.is(edges2, 0)
})
