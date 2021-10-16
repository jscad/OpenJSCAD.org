const test = require('ava')

const { geom2, geom3, path2 } = require('../geometries')

const { line, rectangle, ellipsoid } = require('../primitives')

const { measureBoundingSphere } = require('./index')

test('measureBoundingSphere (single objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle()
  const aellipsoid = ellipsoid({ radius: [5, 10, 15], center: [5, 5, 5] })

  const apath2 = path2.create()
  const ageom2 = geom2.create()
  const ageom3 = geom3.create()

  const n = null
  const o = {}
  const x = 'hi'

  const lbounds = measureBoundingSphere(aline)
  const rbounds = measureBoundingSphere(arect)
  const cbounds = measureBoundingSphere(aellipsoid)

  const p2bounds = measureBoundingSphere(apath2)
  const g2bounds = measureBoundingSphere(ageom2)
  const g3bounds = measureBoundingSphere(ageom3)

  const nbounds = measureBoundingSphere(n)
  const obounds = measureBoundingSphere(o)
  const xbounds = measureBoundingSphere(x)

  t.deepEqual(lbounds, [[12.5, 12.5, 0], 3.5355339059327378])
  t.deepEqual(rbounds, [[0, 0, 0], 1.4142135623730951])
  t.deepEqual(cbounds, [[5.000000000000018, 4.999999999999983, 5.000000000000001], 15])

  t.deepEqual(p2bounds, [[0, 0, 0], 0])
  t.deepEqual(g2bounds, [[0, 0, 0], 0])
  t.deepEqual(g3bounds, [[0, 0, 0], 0])

  t.deepEqual(nbounds, [[0, 0, 0], 0])
  t.deepEqual(obounds, [[0, 0, 0], 0])
  t.deepEqual(xbounds, [[0, 0, 0], 0])
})

test('measureBoundingSphere (multiple objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle()
  const aellipsoid = ellipsoid({ radius: [5, 10, 15], center: [5, 5, 5] })
  const o = {}

  let allbounds = measureBoundingSphere(aline, arect, aellipsoid, o)
  t.deepEqual(allbounds, [[[12.5, 12.5, 0], 3.5355339059327378], [[0, 0, 0], 1.4142135623730951], [[5.000000000000018, 4.999999999999983, 5.000000000000001], 15], [[0, 0, 0], 0]])

  // test caching
  allbounds = measureBoundingSphere(aline, arect, aellipsoid, o)
  t.deepEqual(allbounds, [[[12.5, 12.5, 0], 3.5355339059327378], [[0, 0, 0], 1.4142135623730951], [[5.000000000000018, 4.999999999999983, 5.000000000000001], 15], [[0, 0, 0], 0]])
})
