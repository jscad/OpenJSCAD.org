import test from 'ava'

import { primitives } from '@jscad/modeling'

import { serialize } from '../src/index.js'

test('serialize 2D path (simple) objects to svg', (t) => {
  const mimeType = 'image/svg+xml'
  // simple open path
  const object1 = primitives.line([[0, 0], [1, 1], [-3, 3]])
  const observed = serialize({}, mimeType, object1)
  t.deepEqual(observed, expected1)
})

const expected1 = {
  data: [`<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="4mm" height="3mm" viewBox="0 0 4 3" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path d="M3 3L4 2L0 0"/>
  </g>
</svg>
`],
  mimeType: 'image/svg+xml'
}

test('serialize JS code to JS code', (t) => {
  const mimeType = 'application/javascript'
  const code = 'const a - 1;'
  const observed = serialize({}, mimeType, code)
  const expected = {
    data: [code],
    mimeType: 'application/javascript'
  }
  t.deepEqual(observed, expected)
})
