const test = require('ava')

const { geom2, geom3, path2 } = require('../geometries')

const { line, rectangle, cuboid } = require('../primitives')

const { measureEpsilon } = require('./index')

test('measureEpsilon (single objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle()
  const acube = cuboid()

  const apath2 = path2.create()
  const ageom2 = geom2.create()
  const ageom3 = geom3.create()

  const n = null
  const o = {}
  const x = 'hi'

  const lepsilon = measureEpsilon(aline)
  const repsilon = measureEpsilon(arect)
  const cepsilon = measureEpsilon(acube)

  const p2epsilon = measureEpsilon(apath2)
  const g2epsilon = measureEpsilon(ageom2)
  const g3epsilon = measureEpsilon(ageom3)

  const nepsilon = measureEpsilon(n)
  const oepsilon = measureEpsilon(o)
  const xepsilon = measureEpsilon(x)

  t.is(lepsilon, 0.00005)
  t.is(repsilon, 0.00002)
  t.is(cepsilon, 0.00002)

  t.is(p2epsilon, 0)
  t.is(g2epsilon, 0)
  t.is(g3epsilon, 0)

  t.is(nepsilon, 0)
  t.is(oepsilon, 0)
  t.is(xepsilon, 0)
})

test('measureEpsilon (multiple objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ size: [10, 20] })
  const acube = cuboid()
  const o = {}

  let allepsilon = measureEpsilon(aline, arect, acube, o)
  t.deepEqual(allepsilon, [0.00005, 0.00015000000000000001, 0.00002, 0.0])

  allepsilon = measureEpsilon(aline, arect, acube, o)
  t.deepEqual(allepsilon, [0.00005, 0.00015000000000000001, 0.00002, 0.0])
})
