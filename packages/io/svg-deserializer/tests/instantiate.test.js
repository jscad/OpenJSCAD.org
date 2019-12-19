const test = require('ava')

const deserializer = require('../index.js')

// deserializer

test('deserialize : instantiate svg (rect) to objects', function (t) {
  const sourceSvg = `
<svg xmlns="http://www.w3.org/2000/svg"
 width="467" height="462">
  <rect x="80" y="60" width="250" height="250" rx="20"/>
  <rect x="140" y="120" width="250" height="250" rx="40"/>
</svg>`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  t.is(observed.length, 2)
  let shape = observed[0]
  // t.is(shape.sides.length, 16)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 2)
  shape = observed[0]
  t.is(shape.points.length, 20) // rounded rectangle
})

// ################################

test('deserialize : instantiate svg (circle) to objects', function (t) {
  const sourceSvg = `<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 16)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 16)
})

// ################################

test('deserialize : instantiate svg (ellipse) to objects', function (t) {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

  <ellipse cx="60" cy="60" rx="50" ry="25"/>
</svg>
`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 16)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 16)
})

// ################################

test('deserialize : instantiate svg (polyline) to objects', function (t) {
  const sourceSvg = `
  <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <polyline fill="none" stroke="black"
        points="20,100 40,60 70,80 100,20"/>
  </svg>`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 16)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 4)
})

// ################################

test('deserialize : instantiate svg (polygon) to objects', function (t) {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

  <polygon points="60,20 100,40 100,80 60,100 20,80 20,40"/>
</svg>`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 6)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 6)
})

test('deserialize : instantiate svg (line) to objects', function (t) {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg">

    <line x1="20" y1="100" x2="100" y2="20"
        stroke-width="2" stroke="black"/>
  </svg>
`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 6)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 2)
})

// ################################

test('deserialize : instantiate svg (path: simple) to objects', function (t) {
  const sourceSvg = `<svg height="210" width="400">
  <path d="M150 0 L75 200 L225 200 Z" />
</svg>
`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  // t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 6)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 3)
})

// ################################

test('deserialize : instantiate svg (path: with bezier) to objects', function (t) {
  const sourceSvg = `
  <svg height="210" width="400">
  <path d="M100,100
           L150,100
           a50,25 0 0,0 150,100
           q50,-50 70,-170
           Z"
        style="stroke: #006666; fill: none;"/>
  </svg>
`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  // t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 6)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 1)
  shape = observed[0]
  t.is(shape.points.length, 11)
})

// ################################

test('deserialize : instantiate svg produced by inkscape to objects', function (t) {
  const sourceSvg = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  // t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 6)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 2)
  shape = observed[0]
  t.is(shape.points.length, 19)
})

// ################################

test('deserialize : instantiate shape with a hole to objects', function (t) {
  const sourceSvg = `
  <svg height="297" width="210">
  <path d="M 325.71484 233.94922 A 122.85714 108.57142 0 0 0 202.85742 342.51953 A 122.85714 108.57142 0 0 0 325.71484 451.0918 A 122.85714 108.57142 0 0 0 448.57227 342.51953 A 122.85714 108.57142 0 0 0 325.71484 233.94922 z M 328.57227 308.23438 A 54.285711 35.714286 0 0 1 382.85742 343.94727 A 54.285711 35.714286 0 0 1 328.57227 379.66211 A 54.285711 35.714286 0 0 1 274.28516 343.94727 A 54.285711 35.714286 0 0 1 328.57227 308.23438 z " style="stroke: #006666; fill: none;"/>
  </svg>
`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  // t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 6)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 2)
  shape = observed[0]
  t.is(shape.points.length, 23)
})

// ################################

test('deserialize : instantiate shape with a nested hole to objects', function (t) {
  const sourceSvg = `
  <svg height="297" width="210">
  <path d="M 348.57031 330.26758 A 122.85714 108.57142 0 0 0 225.71289 438.83789 A 122.85714 108.57142 0 0 0 348.57031 547.41016 A 122.85714 108.57142 0 0 0 471.42773 438.83789 A 122.85714 108.57142 0 0 0 348.57031 330.26758 z M 351.42773 404.55273 A 54.285709 35.714285 0 0 1 405.71289 440.26562 A 54.285709 35.714285 0 0 1 351.42773 475.98047 A 54.285709 35.714285 0 0 1 297.14062 440.26562 A 54.285709 35.714285 0 0 1 351.42773 404.55273 z M 348.57031 482.08984 C 359.59526 482.08984 369.65221 484.91497 377.28516 489.83398 C 384.9181 494.753 390.36523 502.16809 390.36523 510.82812 C 390.36523 519.48816 384.9181 526.90325 377.28516 531.82227 C 369.65221 536.74128 359.59526 539.56641 348.57031 539.56641 C 337.54536 539.56641 327.48646 536.74128 319.85352 531.82227 C 312.22057 526.90325 306.77344 519.48816 306.77344 510.82812 C 306.77344 502.16809 312.22057 494.753 319.85352 489.83398 C 327.48646 484.91497 337.54536 482.08984 348.57031 482.08984 z M 348.57031 492.21875 C 339.30907 492.21875 331.00105 494.6974 325.33984 498.3457 C 319.67864 501.99404 316.90234 506.41485 316.90234 510.82812 C 316.90234 515.2414 319.67864 519.66224 325.33984 523.31055 C 331.00105 526.95889 339.30907 529.4375 348.57031 529.4375 C 357.83155 529.4375 366.13958 526.95889 371.80078 523.31055 C 377.46198 519.66224 380.23828 515.2414 380.23828 510.82812 C 380.23828 506.41485 377.46198 501.99404 371.80078 498.3457 C 366.13958 494.6974 357.83155 492.21875 348.57031 492.21875 z "/>
  </svg>
`

  let observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', addMetaData: false })
  // t.is(observed.length, 1)
  let shape = observed[0]
  // t.is(shape.sides.length, 6)

  observed = deserializer.deserialize(sourceSvg, undefined, { output: 'geometry', target: 'path', addMetaData: false })
  t.is(observed.length, 4)
  shape = observed[0]
  t.is(shape.points.length, 23)
})
