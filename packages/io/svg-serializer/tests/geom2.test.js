import test from 'ava'

import { center, colorize, geom2, rectangle } from '@jscad/modeling'

import { serialize } from '../src/index.js'

test('serialize 2D geometries (simple) to svg', (t) => {
  const cag1 = geom2.create()

  const observed1 = serialize({}, cag1)
  t.deepEqual([expected1], observed1)

  const cag2 = rectangle({ size: [10, 20] })

  const observed2 = serialize({}, cag2)
  t.deepEqual([expected2], observed2)

  const cag3 = center({ relativeTo: [-30, -30, 0] }, rectangle({ size: [10, 20] }))
  const cag4 = center({ relativeTo: [30, 30, 0] }, rectangle({ size: [10, 20] }))

  const observed3 = serialize({}, cag3, cag4)
  t.deepEqual([expected3], observed3)
})

test('serialize 2D geometries (color) to svg', (t) => {
  let cag2 = rectangle({ size: [10, 20] })
  cag2 = colorize([0.5, 0.5, 0.5, 0.5], cag2)
  cag2.id = 'r2'
  cag2.class = 'gray-rect'

  const observed2 = serialize({}, cag2)
  t.deepEqual([expected4], observed2)
})

test('serialize 2D geometries (complex) to svg', (t) => {
  let shape = geom2.create([
    [
      [-75, -75],
      [75, -75],
      [75, 75],
      [40, 75],
      [40, 0],
      [-40, 0],
      [-40, 75],
      [-75, 75]
    ],
    [
      [15, -40],
      [8, -40],
      [8, -25],
      [-8, -25],
      [-8, -40],
      [-15, -40],
      [-15, -10],
      [15, -10]
    ],
    [[-2, -19], [2, -19], [2, -15], [-2, -15]]
  ])
  shape = colorize([0.5, 0.5, 0.5, 0.5], shape)

  const observed = serialize({}, shape)
  t.deepEqual([expected5], observed)
})

const expected1 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="0mm" height="0mm" viewBox="0 0 0 0" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path fill="black" d=""/>
  </g>
</svg>
`

const expected2 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="10mm" height="20mm" viewBox="0 0 10 20" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path fill="black" d="M0 20L10 20L10 0L0 0L0 20"/>
  </g>
</svg>
`

const expected3 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="70mm" height="80mm" viewBox="0 0 70 80" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path fill="black" d="M0 80L10 80L10 60L0 60L0 80"/>
  </g>
  <g>
    <path fill="black" d="M60 20L70 20L70 0L60 0L60 20"/>
  </g>
</svg>
`

const expected4 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="10mm" height="20mm" viewBox="0 0 10 20" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path fill="rgb(127.5,127.5,127.5,127.5)" d="M0 20L10 20L10 0L0 0L0 20" id="r2" class="gray-rect"/>
  </g>
</svg>
`

const expected5 = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg width="150mm" height="150mm" viewBox="0 0 150 150" fill="none" fill-rule="evenodd" stroke-width="0.1px" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path fill="rgb(127.5,127.5,127.5,127.5)" d="M0 150L150 150L150 0L115 0L115 75L35 75L35 0L0 0L0 150M90 115L83 115L83 100L67 100L67 115L60 115L60 85L90 85L90 115M73 94L77 94L77 90L73 90L73 94"/>
  </g>
</svg>
`
