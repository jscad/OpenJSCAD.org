const test = require('ava')

const countOf = require('../../test/helpers/countOf')

const deserializer = require('../src/index.js')

// deserializer

// ################################

test('deserialize : translate svg (rect) to script', (t) => {
  const sourceSvg = `<svg pxpmm="10" width="500" height="500">
  <rect x="80" y="60" width="250" height="250" color="red"/>
  <rect x="140" y="120" width="250" height="250" rx="40" color="rgb(0,255,0)"/>
  <rect x="140" y="120" width="250" height="250" ry="40" color="blue"/>
  <rect x="40" y="20" width="250" height="250" rx="40" ry="40"/>
</svg>`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('rectangle', obs), 1)
  t.is(countOf('roundedRectangle', obs), 3)
  t.is(countOf('colors.colorize', obs), 3) // color
  t.is(countOf('path2.fromPoints', obs), 4)

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('rectangle', obs), 1)
  t.is(countOf('roundedRectangle', obs), 3)
  t.is(countOf('colors.colorize', obs), 3) // color
  t.is(countOf('path2.fromPoints', obs), 0)
})

// ################################

test('deserialize : translate svg (circle) to script', (t) => {
  const sourceSvg = `<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('circle', obs), 1)
  t.is(countOf('colors.colorize', obs), 1) // stroke
  t.is(countOf('path2.fromPoints', obs), 1)

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('circle', obs), 1)
  t.is(countOf('colors.colorize', obs), 1) // fill
  t.is(countOf('path2.fromPoints', obs), 0)
})

// ################################

test('deserialize : translate svg (ellipse) to script', (t) => {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <ellipse cx="60" cy="60" rx="50" ry="25"/>
</svg>
`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('ellipse', obs), 1)
  t.is(countOf('colors.colorize', obs), 0)
  t.is(countOf('path2.fromPoints', obs), 1)

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('ellipse', obs), 1)
  t.is(countOf('colors.colorize', obs), 0)
  t.is(countOf('path2.fromPoints', obs), 0)
})

// ################################

test('deserialize : translate svg (line) to script', (t) => {
  let sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <line x1="20" y1="100" x2="100" y2="20" stroke-width="2" stroke="black"/>
</svg>`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('line', obs), 2) // line, and line position

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  // TODO

  // test getting stroke width from group
  sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <g stroke-width="2">
    <line x1="20" y1="100" x2="100" y2="20" stroke="black"/>
  </g>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('line', obs), 2) // line, and line position
})

// ################################

test('deserialize : translate svg (polygon) to script', (t) => {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <polygon points="60,20 100,40 100,80 60,100 20,80 20,40"/>
</svg>`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('polygon', obs), 1)
  t.is(countOf('path2.fromPoints', obs), 1)

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('polygon', obs), 1)
  t.is(countOf('path2.fromPoints', obs), 0)
})

// ################################

test('deserialize : translate svg (polyline) to script', (t) => {
  let sourceSvg = `<svg width="120" height="120">
  <polyline fill="none" stroke="black" stroke-width="2" points="20,100 40,60 70,80 100,20"/>
</svg>`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  // FIXME t.is(countOf('path2.fromPoints', obs), 1)

  // test getting stroke width from group
  sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <g stroke-width="2">
    <polyline fill="none" stroke="black" points="20,100 40,60 70,80 100,20"/>
  </g>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
})

// ################################

test('deserialize : translate svg (path: simple) to script', (t) => {
  let sourceSvg = `<svg height="210" width="400">
  <path stroke="black" stroke-width="2" d="M150 0 L75 200 L225 200 Z" />
</svg>`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendPoints', obs), 2)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('colors.colorize', obs), 1) // stroke
  t.is(countOf('geom2.fromPoints', obs), 0)

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendPoints', obs), 2)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('colors.colorize', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 1)

  // test getting stroke width from group
  sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <g stroke-width="2">
    <path d="M150 0 L75 200 L225 200 Z" />
  </g>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendPoints', obs), 2)

  sourceSvg = `<svg height="210" width="400">
  <path d="m 150 0 l 75 200 l -225 0 z" />
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendPoints', obs), 2)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 0)

  sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <path fill="#ff8000" d="m 240.00000 190.00000 h 30.00000 v 30.00000 h 30.00000 v 30.00000 h 30.00000 v 30.00000 h -90.00000 v -90.00000 z"/>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendPoints', obs), 8)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 1)
  t.is(countOf('colors.colorize', obs), 1) // fill

  sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <path d="M 240.00000 56.00000 H 270.00000 V 86.00000 H 300.00000 V 116.00000 H 330.00000 V 146.00000 H 240.00000 V 56.00000 Z"/>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendPoints', obs), 8)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 0)
})

// ################################

test('deserialize : translate svg (path: arc) to script', (t) => {
  let sourceSvg = `<svg height="500" width="500">
  <path d="M 230 230 A 45 45 0 1 1 275 275 L 275 230 Z"/>
</svg>`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendArc', obs), 1)
  t.is(countOf('path2.appendPoints', obs), 1)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 0)

  sourceSvg = `<svg height="500" width="500">
  <path d="M100,100 L150,100 a50,25 0 0,0 150,100 q50,-50 70,-170 Z"/>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendArc', obs), 1)
  t.is(countOf('path2.appendBezier', obs), 1)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 1)
})

// ################################

test('deserialize : translate svg (path: bezier) to script', (t) => {
  let sourceSvg = `<svg height="500" width="500">
  <path d="M100,100 L150,100 a50,25 0 0,0 150,100 q50,-50 70,-170 Z" style="stroke: #006666; fill: none;"/>
</svg>`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendPoints', obs), 1)
  t.is(countOf('path2.appendArc', obs), 1)
  t.is(countOf('path2.appendBezier', obs), 1)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 0)

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendPoints', obs), 1)
  t.is(countOf('path2.appendArc', obs), 1)
  t.is(countOf('path2.appendBezier', obs), 1)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 1)

  // absolute CUBIC bezier
  // relative CUBIC bezier
  sourceSvg = `<svg height="500" width="500">
  <path d="M 240 90 c 0 30 7 50 50 0 c 43 -50 50 -30 50 0 c 0 83 -68 -34 -90 -30 C 240 60 240 90 240 90 z"/>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendBezier', obs), 4)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 0)

  // absolute QUADRATIC bezier
  sourceSvg = `<svg height="500" width="500">
  <path d="M 60 100 Q -40 150 60 200 Q 160 150 60 100 z"/>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendBezier', obs), 2)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 0)

  // absolute CUBIC bezier shorthand
  // relative CUBIC bezier shorthand
  sourceSvg = `<svg height="500" width="500">
  <path d="M 210 130 C 145 130 110 80 110 80 S 75 25 10 25 m 0 105 c 65 0 100 -50 100 -50 s 35 -55 100 -55"/>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 2)
  t.is(countOf('path2.appendBezier', obs), 4)
  t.is(countOf('path2.close', obs), 0)
  t.is(countOf('geom2.fromPoints', obs), 0)

  // absolute QUADRATIC bezier shorthand
  // relative QUADRATIC bezier shorthand
  sourceSvg = `<svg height="500" width="500">
  <path d="M 10 80 Q 52.5 10 95 80 T 180 80"/>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendBezier', obs), 2)
  t.is(countOf('path2.close', obs), 0)
  t.is(countOf('geom2.fromPoints', obs), 0)

  sourceSvg = `<svg height="500" width="500">
  <path id="Sin_Mqttttz" fill="#FF0000" d="M240 296 q25-100 47 0 t47 0 t47 0 t47 0 t47 0 z"/>
</svg>`

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('path2.appendBezier', obs), 5)
  t.is(countOf('path2.close', obs), 1)
  t.is(countOf('geom2.fromPoints', obs), 1)
  t.is(countOf('colors.colorize', obs), 1) // fill
})

// ################################

test('deserialize : translate shape with a hole to script', (t) => {
  const sourceSvg = `
  <svg height="297" width="210">
  <path d="M 325.71484 233.94922 A 122.85714 108.57142 0 0 0 202.85742 342.51953 A 122.85714 108.57142 0 0 0 325.71484 451.0918 A 122.85714 108.57142 0 0 0 448.57227 342.51953 A 122.85714 108.57142 0 0 0 325.71484 233.94922 z M 328.57227 308.23438 A 54.285711 35.714286 0 0 1 382.85742 343.94727 A 54.285711 35.714286 0 0 1 328.57227 379.66211 A 54.285711 35.714286 0 0 1 274.28516 343.94727 A 54.285711 35.714286 0 0 1 328.57227 308.23438 z " style="stroke: #006666; fill: none;"/>
  </svg>
`

  let obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 2)
  t.is(countOf('path2.appendArc', obs), 8)
  t.is(countOf('path2.close', obs), 2)
  t.is(countOf('geom2.fromPoints', obs), 0)
  t.is(countOf('colors.colorize', obs), 1) // stroke

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 2)
  t.is(countOf('path2.appendArc', obs), 8)
  t.is(countOf('path2.close', obs), 2)
  t.is(countOf('geom2.fromPoints', obs), 2)
  t.is(countOf('colors.colorize', obs), 1) // stroke
})

test('deserialize : translate shape with a nested hole to script', (t) => {
  const sourceSvg = `<svg height="297" width="210">
  <path d="M 348.57031 330.26758 A 122.85714 108.57142 0 0 0 225.71289 438.83789 A 122.85714 108.57142 0 0 0 348.57031 547.41016 A 122.85714 108.57142 0 0 0 471.42773 438.83789 A 122.85714 108.57142 0 0 0 348.57031 330.26758 z M 351.42773 404.55273 A 54.285709 35.714285 0 0 1 405.71289 440.26562 A 54.285709 35.714285 0 0 1 351.42773 475.98047 A 54.285709 35.714285 0 0 1 297.14062 440.26562 A 54.285709 35.714285 0 0 1 351.42773 404.55273 z M 348.57031 482.08984 C 359.59526 482.08984 369.65221 484.91497 377.28516 489.83398 C 384.9181 494.753 390.36523 502.16809 390.36523 510.82812 C 390.36523 519.48816 384.9181 526.90325 377.28516 531.82227 C 369.65221 536.74128 359.59526 539.56641 348.57031 539.56641 C 337.54536 539.56641 327.48646 536.74128 319.85352 531.82227 C 312.22057 526.90325 306.77344 519.48816 306.77344 510.82812 C 306.77344 502.16809 312.22057 494.753 319.85352 489.83398 C 327.48646 484.91497 337.54536 482.08984 348.57031 482.08984 z M 348.57031 492.21875 C 339.30907 492.21875 331.00105 494.6974 325.33984 498.3457 C 319.67864 501.99404 316.90234 506.41485 316.90234 510.82812 C 316.90234 515.2414 319.67864 519.66224 325.33984 523.31055 C 331.00105 526.95889 339.30907 529.4375 348.57031 529.4375 C 357.83155 529.4375 366.13958 526.95889 371.80078 523.31055 C 377.46198 519.66224 380.23828 515.2414 380.23828 510.82812 C 380.23828 506.41485 377.46198 501.99404 371.80078 498.3457 C 366.13958 494.6974 357.83155 492.21875 348.57031 492.21875 z "/>
  </svg>
`

  let obs = deserializer.deserialize({ output: 'script', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 4)
  t.is(countOf('path2.appendArc', obs), 8)
  t.is(countOf('path2.appendBezier', obs), 16)
  t.is(countOf('path2.close', obs), 4)
  t.is(countOf('geom2.fromPoints', obs), 0)

  obs = deserializer.deserialize({ output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 4)
  t.is(countOf('path2.appendArc', obs), 8)
  t.is(countOf('path2.appendBezier', obs), 16)
  t.is(countOf('path2.close', obs), 4)
  t.is(countOf('geom2.fromPoints', obs), 4)
})

// ################################

test('deserialize : translate svg with simple defs to script', (t) => {
  const sourceSvg = `<svg  height='730' width='1300'>
  <defs>
    <ellipse id='kopf0' cx='0' cy='0' rx='100.00000000000001' ry='150.0' fill='#ff8000' stroke='#ff8800' />
  </defs>
  <g id='heurekasvg' transform='scale(0.29333) translate(-170,36) '>
    <g id='heurekasvgbody' transform=''>
      <use x='20' y='20' xlink:href='#kopf0'/>
    </g>
  </g>
</svg>`

  const obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('ellipse', obs), 1)
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('colors.colorize', obs), 1) // stroke
  t.is(countOf('scale', obs), 1)
  t.is(countOf('translate', obs), 2)
})

// ################################

test('deserialize : translate svg with defs using defs to script', (t) => {
  const sourceSvg = `<svg  height='730' width='1300'>
  <defs>
    <ellipse id='kopf0' cx='0' cy='0' rx='100.00000000000001' ry='150.0' fill='#ff8000' stroke='#ff8800' />
    <g id='heureka0'>
      <g transform='translate(1335.6224155638808,423.01254844961903) rotate(29.5)'>
        <use xlink:href='#kopf0' />
      </g>
    </g>
  </defs>
  <g id='heurekasvg' transform='scale(0.29333) translate(-170,36) '>
    <g id='heurekasvgbody' transform=''>
      <use x='20' y='20' xlink:href='#heureka0'/>
    </g>
  </g>
</svg>`

  const obs = deserializer.deserialize({ output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('ellipse', obs), 1)
  t.is(countOf('path2.fromPoints', obs), 1)
  t.is(countOf('colors.colorize', obs), 1) // stroke
  t.is(countOf('rotateZ', obs), 1)
  t.is(countOf('scale', obs), 1)
  t.is(countOf('translate', obs), 3)
})
