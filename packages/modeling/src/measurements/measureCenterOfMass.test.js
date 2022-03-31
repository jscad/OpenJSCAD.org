const test = require('ava')

const { geom2, geom3, path2 } = require('../geometries')

const { ellipsoid, line, rectangle, cuboid } = require('../primitives')

const { measureCenterOfMass } = require('./index')

test('measureCenterOfMass (single objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ center: [5, 5] })
  const acube = cuboid({ size: [3, 3, 3], center: [-15, -5, -10] })

  const apath2 = path2.create()
  const ageom2 = geom2.create()
  const ageom3 = geom3.create()

  const n = null
  const o = {}
  const x = 'hi'

  const lcenter = measureCenterOfMass(aline)
  const rcenter = measureCenterOfMass(arect)
  const ccenter = measureCenterOfMass(acube)

  const p2center = measureCenterOfMass(apath2)
  const g2center = measureCenterOfMass(ageom2)
  const g3center = measureCenterOfMass(ageom3)

  const ncenter = measureCenterOfMass(n)
  const ocenter = measureCenterOfMass(o)
  const xcenter = measureCenterOfMass(x)

  t.deepEqual(lcenter, [0, 0, 0])
  t.deepEqual(rcenter, [5, 5, 0])
  t.deepEqual(ccenter, [-15, -5, -10])

  t.deepEqual(p2center, [0, 0, 0])
  t.deepEqual(g2center, [0, 0, 0])
  t.deepEqual(g3center, [0, 0, 0])

  t.deepEqual(ncenter, [0, 0, 0])
  t.deepEqual(ocenter, [0, 0, 0])
  t.deepEqual(xcenter, [0, 0, 0])
})

test('measureCenterOfMass (multiple objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ size: [10, 20], center: [10, -10] })
  const asphere = ellipsoid({ radius: [5, 10, 15], center: [5, -5, 50] })
  const o = {}

  let allcenters = measureCenterOfMass(aline, arect, asphere, o)
  t.deepEqual(allcenters, [[0, 0, 0], [10, -10, 0], [4.999999999999991, -5.000000000000006, 49.999999999999915], [0, 0, 0]])

  allcenters = measureCenterOfMass(aline, arect, asphere, o)
  t.deepEqual(allcenters, [[0, 0, 0], [10, -10, 0], [4.999999999999991, -5.000000000000006, 49.999999999999915], [0, 0, 0]])
})
