const test = require('ava')

const { geom2, geom3, path2 } = require('../geometries')

const { line, rectangle, cuboid } = require('../primitives')

const { measureCenter } = require('./index')

test('measureCenter (single objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ center: [5, 5] })
  const acube = cuboid({ center: [-5, -5, -5] })

  const apath2 = path2.create()
  const ageom2 = geom2.create()
  const ageom3 = geom3.create()

  const n = null
  const o = {}
  const x = 'hi'

  const lcenter = measureCenter(aline)
  const rcenter = measureCenter(arect)
  const ccenter = measureCenter(acube)

  const p2center = measureCenter(apath2)
  const g2center = measureCenter(ageom2)
  const g3center = measureCenter(ageom3)

  const ncenter = measureCenter(n)
  const ocenter = measureCenter(o)
  const xcenter = measureCenter(x)

  t.deepEqual(lcenter, [12.5, 12.5, 0])
  t.deepEqual(rcenter, [5, 5, 0])
  t.deepEqual(ccenter, [-5, -5, -5])

  t.deepEqual(p2center, [0, 0, 0])
  t.deepEqual(g2center, [0, 0, 0])
  t.deepEqual(g3center, [0, 0, 0])

  t.deepEqual(ncenter, [0, 0, 0])
  t.deepEqual(ocenter, [0, 0, 0])
  t.deepEqual(xcenter, [0, 0, 0])
})

test('measureCenter (multiple objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ size: [10, 20] })
  const acube = cuboid({ center: [-5, -5, -5] })
  const o = {}

  let allcenters = measureCenter(aline, arect, acube, o)
  t.deepEqual(allcenters, [[12.5, 12.5, 0], [0, 0, 0], [-5, -5, -5], [0, 0, 0]])

  allcenters = measureCenter(aline, arect, acube, o)
  t.deepEqual(allcenters, [[12.5, 12.5, 0], [0, 0, 0], [-5, -5, -5], [0, 0, 0]])
})
