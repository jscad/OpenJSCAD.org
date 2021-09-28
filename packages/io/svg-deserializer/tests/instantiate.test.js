const test = require('ava')

const deserializer = require('../src/index.js')

const { measurements } = require('@jscad/modeling')

// deserializer

test('deserialize : instantiate svg (rect) to objects', (t) => {
  const sourceSvg = `<svg pxpmm="10" width="500" height="500">
  <rect x="80" y="60" width="250" height="250" color="red"/>
  <rect x="140" y="120" width="250" height="250" rx="40" color="rgb(0,255,0)"/>
  <rect x="140" y="120" width="250" height="250" ry="40" color="blue"/>
  <rect x="40" y="20" width="250" height="250" transform="translate(60 50) scale(2 3)"/>
</svg>`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 4)
  let shape = observed[0]
  t.is(shape.sides.length, 4)
  t.is(measurements.measureArea(shape), 625)
  shape = observed[1]
  t.is(shape.sides.length, 36)
  t.is(measurements.measureArea(shape), 610.943122436129)
  shape = observed[3]
  t.is(shape.sides.length, 4)
  t.is(measurements.measureArea(shape), 3750)
  t.deepEqual(measurements.measureBoundingBox(shape), [[14, -86, 0], [64, -11, 0]])

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 4)
  shape = observed[0]
  t.is(shape.points.length, 4)
  t.true(shape.isClosed)
  shape = observed[1]
  t.is(shape.points.length, 36) // rounded rectangle
  t.true(shape.isClosed)
  shape = observed[3]
  t.is(shape.points.length, 4)
  t.true(shape.isClosed)
  t.deepEqual(measurements.measureBoundingBox(shape), [[14, -86, 0], [64, -11, 0]])
})

// ################################

test('deserialize : instantiate svg (circle) to objects', (t) => {
  const sourceSvg = `<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  let shape = observed[0]
  t.is(shape.sides.length, 32)
  t.deepEqual(shape.color, [1, 0, 0, 1])

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 32)
  t.true(shape.isClosed)
  t.deepEqual(shape.color, [0, 0, 0, 1])

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false, segments: 16 }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 16)
  t.true(shape.isClosed)
  t.deepEqual(shape.color, [0, 0, 0, 1])
})

// ################################

test('deserialize : instantiate svg (ellipse) to objects', (t) => {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="60" rx="50" ry="25"/>
</svg>
`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  let shape = observed[0]
  t.is(shape.sides.length, 32)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 32)
  t.true(shape.isClosed)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false, segments: 16 }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 16)
  t.true(shape.isClosed)
})

// ################################

test('deserialize : instantiate svg (polyline) to objects', (t) => {
  const sourceSvg = `<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
  <polyline fill="none" stroke="black" points="20,100 40,60 70,80 100,20"/>
</svg>`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  let shape = observed[0]
  // FIXME t.is(shape.sides.length, 16)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 4)
})

// ################################

test('deserialize : instantiate svg (polygon) to objects', (t) => {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <polygon points="60,20 100,40 100,80 60,100 20,80 20,40"/>
</svg>`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  let shape = observed[0]
  t.is(shape.sides.length, 6)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 6)
})

// ################################

test('deserialize : instantiate svg (line) to objects', (t) => {
  let sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="100" x2="100" y2="20" stroke-width="2" stroke="black"/>
</svg> `

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  let shape = observed[0]
  // TODO t.is(shape.sides.length, 6)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 2)

  // test getting stroke width from group
  sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <g stroke-width="2">
    <line x1="20" y1="100" x2="100" y2="20" stroke="black"/>
  </g>
</svg>`

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 2)
  t.deepEqual(shape.color, [0, 0, 0, 1])
})

// ################################

test('deserialize : instantiate svg (path: simple) to objects', (t) => {
  let sourceSvg = `<svg height="210" width="400">
  <path stroke="black" stroke-width="2" d="M150 0 L75 200 L225 200 Z" />
</svg>`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  let shape = observed[0]
  t.is(shape.sides.length, 3)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 3)

  // test getting stroke width from group
  sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <g stroke-width="2">
    <path d="M150 0 L75 200 L225 200 Z" />
  </g>
</svg>`

  observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.sides.length, 3)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 3)

  sourceSvg = `<svg height="210" width="400">
  <path d="m 150 0 l 75 200 l -225 0 z" />
</svg>`

  observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.sides.length, 3)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 3)

  sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120">
  <path d="M 240.00000 56.00000 H 270.00000 V 86.00000 H 300.00000 V 116.00000 H 330.00000 V 146.00000 H 240.00000 V 56.00000 Z"/>
</svg>`

  observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.sides.length, 8)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 8)
})

// ################################

test('deserialize : instantiate svg (path: arc) to objects', (t) => {
  const sourceSvg = `<svg height="500" width="500">
  <path d="M 230 230 A 45 45 0 1 1 275 275 L 275 230 Z"/>
  <path d="M 230 230 A 45 45 0 1 1 275 275 L 275 230 Z" transform="translate(180 80) rotate(45)"/>
</svg>`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 2)
  let shape = observed[0]
  t.is(shape.sides.length, 27)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 2)
  shape = observed[0]
  t.is(shape.points.length, 27)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false, segments: 16 }, sourceSvg)
  t.is(observed.length, 2)
  shape = observed[0]
  t.is(shape.points.length, 15) // segments double on a 3/4 circle
  t.deepEqual(measurements.measureBoundingBox(shape), [[64.91110599999999, -77.611105, 0], [90.21850570104527, -52.30370029895471, 0]])
  shape = observed[1]
  t.is(shape.points.length, 15) // segments double on a 3/4 circle
  t.deepEqual(measurements.measureBoundingBox(shape), [[50.799996, -136.03302387090216, 0], [72.27222493929787, -110.6793647936299, 0]])
})

// ################################

test('deserialize : instantiate svg (path: with bezier) to objects', (t) => {
  let sourceSvg = `<svg height="210" width="400">
  <path d="M100,100 L150,100 a50,25 0 0,0 150,100 q50,-50 70,-170 Z" style="stroke: #006666; fill: none;"/>
</svg>`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  let shape = observed[0]
  t.is(shape.sides.length, 16)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 16)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false, segments: 16 }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 11)

  // absolute CUBIC bezier
  // relative CUBIC bezier
  sourceSvg = `<svg height="500" width="500">
  <path d="M 240 90 c 0 30 7 50 50 0 c 43 -50 50 -30 50 0 c 0 83 -68 -34 -90 -30 C 240 60 240 90 240 90 z"/>
</svg>`

  observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.sides.length, 62)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 62)

  // absolute QUADRATIC bezier
  sourceSvg = `<svg height="500" width="500">
  <path d="M 60 100 Q -40 150 60 200 Q 160 150 60 100 z"/>
</svg>`

  observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.sides.length, 40)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 40)

  // absolute CUBIC bezier shorthand
  // relative CUBIC bezier shorthand
  sourceSvg = `<svg height="500" width="500">
  <path d="M 210 130 C 145 130 110 80 110 80 S 75 25 10 25 m 0 105 c 65 0 100 -50 100 -50 s 35 -55 100 -55"/>
</svg>`

  observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 2)
  shape = observed[0]
  t.is(shape.points.length, 14) // open path

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 2)
  shape = observed[0]
  t.is(shape.points.length, 14)
  shape = observed[1]
  t.is(shape.points.length, 14)

  // absolute QUADRATIC bezier shorthand
  // relative QUADRATIC bezier shorthand
  sourceSvg = `<svg height="500" width="500">
  <path d="M 10 80 Q 52.5 10 95 80 T 180 80"/>
</svg>`

  observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 37) // open path

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 37)

  // test fill color
  sourceSvg = `<svg height="500" width="500">
  <path id="Sin_Mqttttz" fill="#FF0000" d="M240 296 q25-100 47 0 t47 0 t47 0 t47 0 t47 0 z"/>
</svg>`

  observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.sides.length, 126)
  t.deepEqual(shape.color, [1, 0, 0, 1])

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 126)
})

// ################################

test('deserialize : instantiate svg produced by inkscape to objects', (t) => {
  const sourceSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 210 297"
   height="297mm"
   width="210mm">
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="layer1">
    <g
       id="text838"
       style="font-style:normal;font-weight:normal;font-size:50.79999924px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26458332" />
    <g
       id="flowRoot840"
       style="font-style:normal;font-weight:normal;font-size:192px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none"
       transform="matrix(0.26458333,0,0,0.26458333,-19.469852,218.5994)"
       aria-label="全
">
      <path
         id="path856"
         style=""
         d="m 153.07484,126.01322 c -14.784,24.768 -46.656,55.104 -79.487996,73.152 3.072,3.072 7.104,8.064 8.832,11.328 32.255996,-18.816 63.167996,-47.232 78.527996,-70.464 17.28,24.192 50.88,52.416 80.256,69.504 2.304,-4.032 5.76,-9.024 9.408,-12.672 -29.952,-14.784 -63.36,-42.816 -83.328,-70.848 z m 15.36,125.952 h 58.176 v -12.672 h -58.176 v -29.952 h 50.88 v -12.864 h -114.048 v 12.864 h 48.576 v 29.952 H 96.626844 v 12.672 h 57.215996 v 31.296 H 81.074844 v 13.056 H 243.31484 v -13.056 h -74.88 z" />
    </g>
  </g>
</svg>
`

  let observed = deserializer.deserialize({ filename: 'inkscape', output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 2)
  let shape = observed[0]
  t.is(shape.sides.length, 19)
  shape = observed[1]
  t.is(shape.sides.length, 20)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 2)
  shape = observed[0]
  t.is(shape.points.length, 19)
  shape = observed[1]
  t.is(shape.points.length, 20)
})

// ################################

test('deserialize : instantiate shape with a hole to objects', (t) => {
  const sourceSvg = `
  <svg height="297" width="210">
  <path d="M 325.71484 233.94922 A 122.85714 108.57142 0 0 0 202.85742 342.51953 A 122.85714 108.57142 0 0 0 325.71484 451.0918 A 122.85714 108.57142 0 0 0 448.57227 342.51953 A 122.85714 108.57142 0 0 0 325.71484 233.94922 z M 328.57227 308.23438 A 54.285711 35.714286 0 0 1 382.85742 343.94727 A 54.285711 35.714286 0 0 1 328.57227 379.66211 A 54.285711 35.714286 0 0 1 274.28516 343.94727 A 54.285711 35.714286 0 0 1 328.57227 308.23438 z " style="stroke: #006666; fill: none;"/>
  </svg>
`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 2)
  let shape = observed[0]
  t.is(shape.sides.length, 38)
  shape = observed[1]
  t.is(shape.sides.length, 38)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 2)
  shape = observed[0]
  t.is(shape.points.length, 38)
  shape = observed[1]
  t.is(shape.points.length, 38)
})

// ################################

test('deserialize : instantiate shape with a nested hole to objects', (t) => {
  const sourceSvg = `
  <svg height="297" width="210">
  <path d="M 348.57031 330.26758 A 122.85714 108.57142 0 0 0 225.71289 438.83789 A 122.85714 108.57142 0 0 0 348.57031 547.41016 A 122.85714 108.57142 0 0 0 471.42773 438.83789 A 122.85714 108.57142 0 0 0 348.57031 330.26758 z M 351.42773 404.55273 A 54.285709 35.714285 0 0 1 405.71289 440.26562 A 54.285709 35.714285 0 0 1 351.42773 475.98047 A 54.285709 35.714285 0 0 1 297.14062 440.26562 A 54.285709 35.714285 0 0 1 351.42773 404.55273 z M 348.57031 482.08984 C 359.59526 482.08984 369.65221 484.91497 377.28516 489.83398 C 384.9181 494.753 390.36523 502.16809 390.36523 510.82812 C 390.36523 519.48816 384.9181 526.90325 377.28516 531.82227 C 369.65221 536.74128 359.59526 539.56641 348.57031 539.56641 C 337.54536 539.56641 327.48646 536.74128 319.85352 531.82227 C 312.22057 526.90325 306.77344 519.48816 306.77344 510.82812 C 306.77344 502.16809 312.22057 494.753 319.85352 489.83398 C 327.48646 484.91497 337.54536 482.08984 348.57031 482.08984 z M 348.57031 492.21875 C 339.30907 492.21875 331.00105 494.6974 325.33984 498.3457 C 319.67864 501.99404 316.90234 506.41485 316.90234 510.82812 C 316.90234 515.2414 319.67864 519.66224 325.33984 523.31055 C 331.00105 526.95889 339.30907 529.4375 348.57031 529.4375 C 357.83155 529.4375 366.13958 526.95889 371.80078 523.31055 C 377.46198 519.66224 380.23828 515.2414 380.23828 510.82812 C 380.23828 506.41485 377.46198 501.99404 371.80078 498.3457 C 366.13958 494.6974 357.83155 492.21875 348.57031 492.21875 z "/>
  </svg>
`

  let observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 4)
  let shape = observed[0]
  t.is(shape.sides.length, 38)

  observed = deserializer.deserialize({ output: 'geometry', target: 'path', addMetaData: false }, sourceSvg)
  t.is(observed.length, 4)
  shape = observed[0]
  t.is(shape.points.length, 38)
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

  const observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  const shape = observed[0]
  t.is(shape.sides.length, 32)
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

  const observed = deserializer.deserialize({ output: 'geometry', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(observed.length, 1)
  const shape = observed[0]
  t.is(shape.sides.length, 32)
})
