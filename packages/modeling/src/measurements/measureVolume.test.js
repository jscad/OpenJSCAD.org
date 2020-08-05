const test = require('ava')

const { geom2, geom3, path2 } = require('../geometries')

const { line, rectangle, cuboid } = require('../primitives')

const { measureVolume } = require('./index')

test('measureVolume: single objects', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle()
  const acube = cuboid()

  const apath2 = path2.create()
  const ageom2 = geom2.create()
  const ageom3 = geom3.create()

  const n = null
  const o = {}
  const x = 'hi'

  const lvolume = measureVolume(aline)
  const rvolume = measureVolume(arect)
  const cvolume = measureVolume(acube)

  const p2volume = measureVolume(apath2)
  const g2volume = measureVolume(ageom2)
  const g3volume = measureVolume(ageom3)

  const nvolume = measureVolume(n)
  const ovolume = measureVolume(o)
  const xvolume = measureVolume(x)

  t.is(lvolume, 0)
  t.is(rvolume, 0)
  t.is(cvolume, 7.999999999999999)

  t.is(p2volume, 0)
  t.is(g2volume, 0)
  t.is(g3volume, 0)

  t.is(nvolume, 0)
  t.is(ovolume, 0)
  t.is(xvolume, 0)
})

test('measureVolume (multiple objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ size: [5, 10] })
  const acube = cuboid({ size: [10, 20, 40] })
  const o = {}

  let allvolume = measureVolume(aline, arect, acube, o)
  t.deepEqual(allvolume, [0, 0, 7999.999999999999, 0])

  allvolume = measureVolume(aline, arect, acube, o)
  t.deepEqual(allvolume, [0, 0, 7999.999999999999, 0])
})
