const fs = require('fs')
const path = require('path')
const test = require('ava')
const deserializer = require('./index.js')

const filesPath = path.resolve('../../node_modules/@jscad/sample-files') // require.resolve('@jscad/sample-files')
const polygonsFromCsg = csg => csg.polygons.map(x => x.vertices.map(vert => ([vert.pos.x, vert.pos.y, vert.pos.z])))

test('translate simple amf file to jscad code', function (t) {
  const inputPath = path.resolve(filesPath, 'amf/Amf_Cube.amf')
  const inputFile = fs.readFileSync(inputPath)

  const expected = `// Objects  : 1
// Materials: 0

// helper functions
let VV = function(x,y,z) { return new CSG.Vertex(new CSG.Vector3D(x,y,z)); };
let PP = function(a) { return new CSG.Polygon(a); };

function main() {
  let csgs = [];
  csgs.push(createObject1());
  return union(csgs);
}

// Object 1
//  faces   : 12
//  vertices: 8
function createObject1() {
  let polys = [];
  polys.push(
    PP([
      VV(1,1,-1),
      VV(1,-1,-1),
      VV(-1,-1,-1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(1,1,-1),
      VV(-1,-1,-1),
      VV(-1,1,-1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(1,0.999999,1),
      VV(-1,1,1),
      VV(-1,-1,1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(1,0.999999,1),
      VV(-1,-1,1),
      VV(0.999999,-1,1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(1,1,-1),
      VV(1,0.999999,1),
      VV(0.999999,-1,1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(1,1,-1),
      VV(0.999999,-1,1),
      VV(1,-1,-1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(1,-1,-1),
      VV(0.999999,-1,1),
      VV(-1,-1,1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(1,-1,-1),
      VV(-1,-1,1),
      VV(-1,-1,-1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(-1,-1,-1),
      VV(-1,-1,1),
      VV(-1,1,1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(-1,-1,-1),
      VV(-1,1,1),
      VV(-1,1,-1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(1,0.999999,1),
      VV(1,1,-1),
      VV(-1,1,-1)]).setColor([0.8,0.8,0.8,1]));
  polys.push(
    PP([
      VV(1,0.999999,1),
      VV(-1,1,-1),
      VV(-1,1,1)]).setColor([0.8,0.8,0.8,1]));
  return CSG.fromPolygons(polys);
}
`

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('deserialize simple amf to cag/csg objects', function (t) {
  const inputPath = path.resolve(filesPath, 'amf/Amf_Cube.amf')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.polygons.length, 6)

  const observedVertices = polygonsFromCsg(observed)
  // NOTE: 0.99999 instead of 1 ... hurray for sax / js precision
  const expectedVertices = [ [ [ 1, 1, -1 ], [ 1, -1, -1 ], [ -1, -1, -1 ], [ -1, 1, -1 ] ],
    [ [ 0.999999, -1, 1 ],
    [ 1, 0.999999, 1 ],
    [ -1, 0.999999, 1 ],
    [ -1, -1, 1 ] ],
    [ [ 1, 0.999999, 1 ],
    [ 0.999999, -1, 1 ],
    [ 1, -1, -1 ],
    [ 1, 1, -1 ] ],
    [ [ 1, -1, -1 ],
    [ 0.999999, -1, 1 ],
    [ -1, -1, 1 ],
    [ -1, -1, -1 ] ],
    [ [ -1, 0.999999, 1 ],
    [ -1, 1, -1 ],
    [ -1, -1, -1 ],
    [ -1, -1, 1 ] ],
    [ [ 1, 0.999999, 1 ],
    [ 1, 1, -1 ],
    [ -1, 1, -1 ],
    [ -1, 0.999999, 1 ] ] ]

  t.deepEqual(observedVertices, expectedVertices)
})
