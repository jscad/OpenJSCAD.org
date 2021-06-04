const test = require('ava')

const countOf = require('../../test/helpers/countOf')

const { colors, geometries, primitives } = require('@jscad/modeling')

const serializer = require('../index.js')

test('serialize 3D geometry to amf', (t) => {
  const emptyShape = geometries.geom3.create()
  const observed1 = serializer.serialize({}, emptyShape)
  t.deepEqual(observed1, expected1)

  const testCube = primitives.cube()
  const observed2 = serializer.serialize({}, testCube)
  t.is(observed2.length, 1)
  const xml2 = observed2[0]
  t.is(countOf('amf', xml2), 2)
  t.is(countOf('metadata', xml2), 2)
  t.is(countOf('object', xml2), 2)
  t.is(countOf('mesh', xml2), 2)
  t.is(countOf('vertices', xml2), 2)
  t.is(countOf('vertex', xml2), 72)
  t.is(countOf('coordinates', xml2), 72)
  t.is(countOf('<x>', xml2), 36)
  t.is(countOf('<y>', xml2), 36)
  t.is(countOf('<z>', xml2), 36)
  t.is(countOf('volume', xml2), 2)
  t.is(countOf('triangle', xml2), 24)
  t.is(countOf('v1', xml2), 24)
  t.is(countOf('v2', xml2), 24)
  t.is(countOf('v2', xml2), 24)

  const coloredCube = colors.colorize([1.0, 0.0, 0.5, 0.8], testCube)
  coloredCube.polygons[0].color = [1, 0, 0, 1]
  const observed3 = serializer.serialize({ unit: 'inch' }, coloredCube)
  const xml3 = observed3[0]
  t.is(countOf('amf', xml3), 2)
  t.is(countOf('metadata', xml3), 2)
  t.is(countOf('object', xml3), 2)
  t.is(countOf('mesh', xml3), 2)
  t.is(countOf('vertices', xml3), 2)
  t.is(countOf('vertex', xml3), 72)
  t.is(countOf('coordinates', xml3), 72)
  t.is(countOf('<x>', xml3), 36)
  t.is(countOf('<y>', xml3), 36)
  t.is(countOf('<z>', xml3), 36)
  t.is(countOf('volume', xml3), 2)
  t.is(countOf('triangle', xml3), 24)
  t.is(countOf('v1', xml3), 24)
  t.is(countOf('v2', xml3), 24)
  t.is(countOf('v2', xml3), 24)

  t.is(countOf('inch', xml3), 1)
  t.is(countOf('color', xml3), 6)
  t.is(countOf('<r>', xml3), 3)
  t.is(countOf('<g>', xml3), 3)
  t.is(countOf('<b>', xml3), 3)
  t.is(countOf('<a>', xml3), 3)
})

const expected1 = [
  `<?xml version="1.0" encoding="UTF-8"?>
<amf unit="millimeter" version="1.1">
  <metadata type="author">Created by JSCAD</metadata>
</amf>
`
]
