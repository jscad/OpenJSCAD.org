const test = require('ava')

const { colors, geometries, primitives } = require('@jscad/modeling')

const serializer = require('../index.js')

test('serialize 2D path (simple) objects to svg', (t) => {
  // simple open path
  const object1 = primitives.line([[0, 0], [1, 1], [-3, 3]])
  let observed = serializer.serialize({}, object1)
  t.deepEqual(observed, [expected1])

  // simple closed path
  let object3 = geometries.path2.fromPoints({}, [
    [42.33333, 0],
    [21.166665, -56.44443999999999],
    [63.49999499999999, -56.44443999999999]
  ])
  object3 = geometries.path2.close(object3)

  observed = serializer.serialize({}, object3)
  t.deepEqual(observed, [expected3])
})

test('serialize 2D path (color) objects to svg', (t) => {
  // simple open path
  let object1 = primitives.line([[0, 0], [1, 1], [-3, 3]])
  object1 = colors.colorize([0.5, 0.5, 0.5, 0.5], object1)
  object1.id = 'l1'
  object1.class = 'gray-line'
  const observed = serializer.serialize({}, object1)
  t.deepEqual(observed, [expected4])
})

// NOTE
// NOTE: SVG coordinates are positive, starting from [0,0], so the points are OFFSET by the bounds
// NOTE

const expected1 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="4mm" height="3mm" viewBox="0 0 4 3" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path d="M3 3L4 2L0 0"/>
  </g>
</svg>
`

const expected3 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="42.3333mm" height="56.4444mm" viewBox="0 0 42.3333 56.4444" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path d="M21.1667 0L0 56.4444L42.3333 56.4444L21.1667 0"/>
  </g>
</svg>
`

const expected4 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="4mm" height="3mm" viewBox="0 0 4 3" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path d="M3 3L4 2L0 0" stroke="rgba(127.5,127.5,127.5,0.5)" id="l1" class="gray-line"/>
  </g>
</svg>
`
