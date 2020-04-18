const test = require('ava')

const { geom2, geom3, path2 } = require('../../geometry')

const { line, rectangle, cuboid } = require('../../primitives')

const { measureVolume } = require('./index')

test('measureVolume: single objects', (t) => {
  let aline = line([[10, 10], [15, 15]])
  let arect = rectangle()
  let acube = cuboid()

  let apath2 = path2.create()
  let ageom2 = geom2.create()
  let ageom3 = geom3.create()

  let n = null
  let o = {}
  let x = 'hi'

  let lvolume = measureVolume(aline)
  let rvolume = measureVolume(arect)
  let cvolume = measureVolume(acube)

  let p2volume = measureVolume(apath2)
  let g2volume = measureVolume(ageom2)
  let g3volume = measureVolume(ageom3)

  let nvolume = measureVolume(n)
  let ovolume = measureVolume(o)
  let xvolume = measureVolume(x)

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

test('measureVolume (multiple objects)', t => {
  let aline = line([[10, 10], [15, 15]])
  let arect = rectangle({ size: [5, 10] })
  let acube = cuboid({ size: [10, 20, 40] })
  let o = {}

  let allvolume = measureVolume(aline, arect, acube, o)
  t.deepEqual(allvolume, [0, 0, 7999.999999999999, 0])
})
