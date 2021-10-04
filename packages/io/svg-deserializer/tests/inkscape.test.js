const test = require('ava')

const countOf = require('../../test/helpers/countOf')

const deserializer = require('../src/index.js')

// deserializer

test('deserialize : translate svg produced by inkscape to script', (t) => {
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
       aria-label="全">
      <path
         id="path856"
         style=""
         d="m 153.07484,126.01322 c -14.784,24.768 -46.656,55.104 -79.487996,73.152 3.072,3.072 7.104,8.064 8.832,11.328 32.255996,-18.816 63.167996,-47.232 78.527996,-70.464 17.28,24.192 50.88,52.416 80.256,69.504 2.304,-4.032 5.76,-9.024 9.408,-12.672 -29.952,-14.784 -63.36,-42.816 -83.328,-70.848 z m 15.36,125.952 h 58.176 v -12.672 h -58.176 v -29.952 h 50.88 v -12.864 h -114.048 v 12.864 h 48.576 v 29.952 H 96.626844 v 12.672 h 57.215996 v 31.296 H 81.074844 v 13.056 H 243.31484 v -13.056 h -74.88 z" />
    </g>
  </g>
</svg>
`

  let obs = deserializer.deserialize({ filename: 'inkscape', output: 'script', target: 'path', addMetaData: false }, sourceSvg)
  t.is(typeof obs, 'string')
  t.is(countOf('path2.fromPoints', obs), 2)
  t.is(countOf('path2.close', obs), 2)
  t.is(countOf('color', obs), 5)

  obs = deserializer.deserialize({ filename: 'inkscape', output: 'script', target: 'geom2', addMetaData: false }, sourceSvg)
  t.is(countOf('path2.fromPoints', obs), 2)
  t.is(countOf('path2.close', obs), 2)
  t.is(countOf('color', obs), 5)
})
