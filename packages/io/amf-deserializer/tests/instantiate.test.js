import fs from 'fs'
import path from 'path'

import test from 'ava'

import { geom3 } from '@jscad/modeling'

import { deserialize } from '../src/index.js'

const samplesPath = '../../../node_modules/@jscad/sample-files'

const toArray = (polygons) => polygons.map((p) => p.vertices.map((v) => ([v[0], v[1], v[2]])))

test('deserialize simple amf to geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'amf/Amf_Cube.amf')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.is(observed.length, 1)
  const polygons = geom3.toPolygons(observed[0])
  t.deepEqual(polygons.length, 12)

  const observedVertices = toArray(polygons)
  // NOTE: 0.99999 instead of 1 ... hurray for sax / js precision
  const expectedVertices = [
    [[1, 1, -1], [1, -1, -1], [-1, -1, -1]],
    [[1, 1, -1], [-1, -1, -1], [-1, 1, -1]],
    [[1, 0.999999, 1], [-1, 1, 1], [-1, -1, 1]],
    [[1, 0.999999, 1], [-1, -1, 1], [0.999999, -1, 1]],
    [[1, 1, -1], [1, 0.999999, 1], [0.999999, -1, 1]],
    [[1, 1, -1], [0.999999, -1, 1], [1, -1, -1]],
    [[1, -1, -1], [0.999999, -1, 1], [-1, -1, 1]],
    [[1, -1, -1], [-1, -1, 1], [-1, -1, -1]],
    [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1]],
    [[-1, -1, -1], [-1, 1, 1], [-1, 1, -1]],
    [[1, 0.999999, 1], [1, 1, -1], [-1, 1, -1]],
    [[1, 0.999999, 1], [-1, 1, -1], [-1, 1, 1]]
  ]

  t.deepEqual(observedVertices, expectedVertices)
})
