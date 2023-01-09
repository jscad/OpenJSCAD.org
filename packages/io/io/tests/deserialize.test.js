import test from 'ava'

import countOf from '../../test/helpers/countOf.js'

import { deserialize, getMimeType } from '../src/index.js'

test('deserialize svg (simple) to objects', (t) => {
  const mimeType = 'image/svg+xml'
  const objects = deserialize({ output: 'geometry' }, mimeType, source1)
  const expected1 = [{
    isClosed: false,
    points: [[3, -3], [4, -2], [0, 0]],
    transforms: [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  }]
  t.deepEqual(expected1, objects)
})

test('deserialize svg (simple) to script', (t) => {
  const mimeType = getMimeType('svg')
  const script = deserialize({ output: 'script', addMetaData: false }, mimeType, source1)
  t.is(countOf('main(params)', script), 1)
  t.is(countOf('geometries.path2', script), 3)
})

const source1 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="4mm" height="3mm" viewBox="0 0 4 3" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path d="M3 3L4 2L0 0"/>
  </g>
</svg>
`

test('deserialize JS code to JS code', (t) => {
  const mimeType = 'application/javascript'
  const code = 'const a - 1;'
  const script = deserialize({ output: 'script', addMetaData: false }, mimeType, code)
  t.deepEqual(script, code)
})
