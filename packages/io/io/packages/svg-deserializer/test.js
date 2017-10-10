const test = require('ava')// require('tape')
const deserializer = require('./index.js')

test('translate svg (rect) to jscad code', function (t) {
  const sourceSvg = `
<svg xmlns="http://www.w3.org/2000/svg"
 width="467" height="462">
  <rect x="80" y="60" width="250" height="250" rx="20"/>
  <rect x="140" y="120" width="250" height="250" rx="40"/>
</svg>`

  // const sourceSvg = fs.readFileSync('PATH/TO/file.svg')

  const expected = `function main(params) {
  var cag0 = new CAG();
  var cag00 = CAG.roundedRectangle({center: [57.8556,-52.2111], radius: [35.277775,35.277775], roundradius: 5.644443999999999});
  cag0 = cag0.union(cag00);
  var cag01 = CAG.roundedRectangle({center: [74.7889,-69.1444], radius: [35.277775,35.277775], roundradius: 11.288887999999998});
  cag0 = cag0.union(cag01);
  return cag0;
}
`
  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('translate svg (circle) to jscad code', function (t) {
  const sourceSvg = `<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
`
  const expected = `function main(params) {
  var cag0 = new CAG();
  var cag00 = CAG.circle({center: [14.111109999999998,-14.111109999999998], radius: 11.288887999999998});
  cag0 = cag0.union(cag00);
  return cag0;
}
`
  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('translate svg (ellipse) to jscad code', function (t) {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

  <ellipse cx="60" cy="60" rx="50" ry="25"/>
</svg>
`
  const expected = `function main(params) {
  var cag0 = new CAG();
  var cag00 = CAG.ellipse({center: [16.933331999999996,-16.933331999999996], radius: [14.111109999999996,7.055554999999998]});
  cag0 = cag0.union(cag00);
  return cag0;
}
`
  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('translate svg (polyline) to jscad code', function (t) {
  const sourceSvg = `
  <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <polyline fill="none" stroke="black"
        points="20,100 40,60 70,80 100,20"/>
  </svg>`

  const expected = `function main(params) {
  var cag0 = new CAG();
  var cag00 = new CSG.Path2D([
    [5.644443999999999,-28.222219999999997],
    [11.288887999999998,-16.933331999999996],
    [19.755553999999997,-22.577775999999997],
    [28.222219999999997,-5.644443999999999],
  ],false);
  cag00 = cag00.expandToCAG(0.1411111,CSG.defaultResolution2D);
  cag0 = cag0.union(cag00);
  return cag0;
}
`
  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('translate svg (polygon) to jscad code', function (t) {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

  <polygon points="60,20 100,40 100,80 60,100 20,80 20,40"/>
</svg>`

  const expected = `function main(params) {
  var cag0 = new CAG();
  var cag00 = new CSG.Path2D([
    [16.933331999999996,-5.644443999999999],
    [28.222219999999993,-11.288887999999998],
    [28.222219999999993,-22.577775999999997],
    [16.933331999999996,-28.222219999999993],
    [5.644443999999999,-22.577775999999997],
    [5.644443999999999,-11.288887999999998],
  ],true);
  cag00 = cag00.innerToCAG();
  cag0 = cag0.union(cag00);
  return cag0;
}
`
  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('translate svg (line) to jscad', function (t) {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg">

    <line x1="20" y1="100" x2="100" y2="20"
        stroke-width="2" stroke="black"/>
  </svg>
`

  const expected = `function main(params) {
  var cag0 = new CAG();
  var cag00 = new CSG.Path2D([[5.644443999999999,-28.222219999999993],[28.222219999999993,-5.644443999999999]],false);
  cag00 = cag00.expandToCAG(0.2822221999999999,CSG.defaultResolution2D);
  cag0 = cag0.union(cag00);
  return cag0;
}
`
  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('deserialize svg (path: simple) to cag/csg objects', function (t) {
  const sourceSvg = `<svg height="210" width="400">
  <path d="M150 0 L75 200 L225 200 Z" />
</svg>
`

  const expected = `function main(params) {
  var cag0 = new CAG();
  var cag00 = new CAG();
  var cag001 = new CSG.Path2D([[42.33333,0]],false);
  cag001 = cag001.appendPoint([21.166665,-56.44443999999999]);
  cag001 = cag001.appendPoint([63.49999499999999,-56.44443999999999]);
  cag001 = cag001.close();
  cag001 = cag001.innerToCAG();
  cag00 = cag00.union(cag001);
  cag0 = cag0.union(cag00);
  return cag0;
}
`
  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('deserialize svg (path: with bezier) to cag/csg objects', function (t) {
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
  const expected = `function main(params) {
  var cag0 = new CAG();
  var cag00 = new CAG();
  var cag001 = new CSG.Path2D([[28.222219999999997,-28.222219999999997]],false);
  cag001 = cag001.appendPoint([42.33333,-28.222219999999997]);
  cag001 = cag001.appendArc([84.66666,-56.44443999999999],{xradius: 14.111109999999998,yradius: -7.055554999999999,xaxisrotation: 0,clockwise: false,large: false});
  cag001 = cag001.appendBezier([[98.77776999999999,-42.33333],[98.77776999999999,-42.33333],[104.42221399999998,-8.466665999999998]]);
  cag001 = cag001.close();
  cag001 = cag001.innerToCAG();
  cag00 = cag00.union(cag001);
  cag0 = cag0.union(cag00);
  return cag0;
}
`
  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

// deserializer

test('deserialize svg (rect) to cag/csg objects', function (t) {
  const sourceSvg = `
<svg xmlns="http://www.w3.org/2000/svg"
 width="467" height="462">
  <rect x="80" y="60" width="250" height="250" rx="20"/>
  <rect x="140" y="120" width="250" height="250" rx="40"/>
</svg>`

  // const sourceSvg = fs.readFileSync('PATH/TO/file.svg')
  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.sides.length, 56)
})

test('deserialize svg (circle) to cag/csg objects', function (t) {
  const sourceSvg = `<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
`

  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.sides.length, 32)
})

test('deserialize svg (ellipse) to cag/csg objects', function (t) {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

  <ellipse cx="60" cy="60" rx="50" ry="25"/>
</svg>
`

  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.sides.length, 34)
})

test('deserialize svg (polyline) to cag/csg objects', function (t) {
  const sourceSvg = `
  <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    <polyline fill="none" stroke="black"
        points="20,100 40,60 70,80 100,20"/>
  </svg>`

  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.sides.length, 62)
})

test('deserialize svg (polygon) to cag/csg objects', function (t) {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg">

  <polygon points="60,20 100,40 100,80 60,100 20,80 20,40"/>
</svg>`

  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.sides.length, 6)
})

test('deserialize svg (line) to cag/csg objects', function (t) {
  const sourceSvg = `<svg width="120" height="120" viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg">

    <line x1="20" y1="100" x2="100" y2="20"
        stroke-width="2" stroke="black"/>
  </svg>
`

  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.sides.length, 34)
})

test('deserialize svg (path: simple) to cag/csg objects', function (t) {
  const sourceSvg = `<svg height="210" width="400">
  <path d="M150 0 L75 200 L225 200 Z" />
</svg>
`

  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.sides.length, 3)
})

test('deserialize svg (path: with bezier) to cag/csg objects', function (t) {
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

  const observed = deserializer.deserialize(sourceSvg, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.sides.length, 16)
})
