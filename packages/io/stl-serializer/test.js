const test = require('ava')
const {CSG} = require('@jscad/csg')
const serializer = require('./index.js')

test('serialize csg to stl (binary)', function (t) {
  const csg1 = new CSG.cube()
  const observed = serializer.serialize({binary: true}, csg1)
  
  // TODO: VERY shallow testing ... improve
  t.deepEqual(observed[0].byteLength, 80)
  t.deepEqual(observed[1].byteLength, 4)
  t.deepEqual(observed[2].byteLength, 600)
})

test('serialize csg to stl (ascii)', function (t) {
  const csg1 = new CSG.cube({radius: 5}).setColor([0,0,1,1])
  const observed1 = serializer.serialize({binary: false}, csg1)
  t.deepEqual(observed1, [expected1])

  const csg2 = csg1.translate([5,5,5]).setColor([1,0,0,1])
  const observed2 = serializer.serialize({binary: false}, [csg1, csg2])
  t.deepEqual(observed2, [expected2])
})

test('progress status callback', function (t) {
  const input = new CSG.cube()
  const progresses = [];
  const statusCallback = function (statusObj) {
    progresses.push(statusObj.progress);
  };
  const observed = serializer.serialize({statusCallback: statusCallback}, input)

  t.deepEqual(0, progresses[0]);
  t.deepEqual(100, progresses[progresses.length - 1]);
})

const expected1 = `solid JSCAD
facet normal -1 0 0
outer loop
vertex -5 -5 -5
vertex -5 -5 5
vertex -5 5 5
endloop
endfacet
facet normal -1 0 0
outer loop
vertex -5 -5 -5
vertex -5 5 5
vertex -5 5 -5
endloop
endfacet
facet normal 1 0 0
outer loop
vertex 5 -5 -5
vertex 5 5 -5
vertex 5 5 5
endloop
endfacet
facet normal 1 0 0
outer loop
vertex 5 -5 -5
vertex 5 5 5
vertex 5 -5 5
endloop
endfacet
facet normal 0 -1 0
outer loop
vertex -5 -5 -5
vertex 5 -5 -5
vertex 5 -5 5
endloop
endfacet
facet normal 0 -1 0
outer loop
vertex -5 -5 -5
vertex 5 -5 5
vertex -5 -5 5
endloop
endfacet
facet normal 0 1 0
outer loop
vertex -5 5 -5
vertex -5 5 5
vertex 5 5 5
endloop
endfacet
facet normal 0 1 0
outer loop
vertex -5 5 -5
vertex 5 5 5
vertex 5 5 -5
endloop
endfacet
facet normal 0 0 -1
outer loop
vertex -5 -5 -5
vertex -5 5 -5
vertex 5 5 -5
endloop
endfacet
facet normal 0 0 -1
outer loop
vertex -5 -5 -5
vertex 5 5 -5
vertex 5 -5 -5
endloop
endfacet
facet normal 0 0 1
outer loop
vertex -5 -5 5
vertex 5 -5 5
vertex 5 5 5
endloop
endfacet
facet normal 0 0 1
outer loop
vertex -5 -5 5
vertex 5 5 5
vertex -5 5 5
endloop
endfacet
endsolid JSCAD
`

const expected2 = `solid JSCAD
facet normal -1 0 0
outer loop
vertex -5 -5 -5
vertex -5 -5 5
vertex -5 5 5
endloop
endfacet
facet normal -1 0 0
outer loop
vertex -5 -5 -5
vertex -5 5 5
vertex -5 5 -5
endloop
endfacet
facet normal 1 0 0
outer loop
vertex 5 -5 -5
vertex 5 5 -5
vertex 5 5 5
endloop
endfacet
facet normal 1 0 0
outer loop
vertex 5 -5 -5
vertex 5 5 5
vertex 5 -5 5
endloop
endfacet
facet normal 0 -1 0
outer loop
vertex -5 -5 -5
vertex 5 -5 -5
vertex 5 -5 5
endloop
endfacet
facet normal 0 -1 0
outer loop
vertex -5 -5 -5
vertex 5 -5 5
vertex -5 -5 5
endloop
endfacet
facet normal 0 1 0
outer loop
vertex -5 5 -5
vertex -5 5 5
vertex 5 5 5
endloop
endfacet
facet normal 0 1 0
outer loop
vertex -5 5 -5
vertex 5 5 5
vertex 5 5 -5
endloop
endfacet
facet normal 0 0 -1
outer loop
vertex -5 -5 -5
vertex -5 5 -5
vertex 5 5 -5
endloop
endfacet
facet normal 0 0 -1
outer loop
vertex -5 -5 -5
vertex 5 5 -5
vertex 5 -5 -5
endloop
endfacet
facet normal 0 0 1
outer loop
vertex -5 -5 5
vertex 5 -5 5
vertex 5 5 5
endloop
endfacet
facet normal 0 0 1
outer loop
vertex -5 -5 5
vertex 5 5 5
vertex -5 5 5
endloop
endfacet
facet normal -1 0 0
outer loop
vertex 0 0 0
vertex 0 0 10
vertex 0 10 10
endloop
endfacet
facet normal -1 0 0
outer loop
vertex 0 0 0
vertex 0 10 10
vertex 0 10 0
endloop
endfacet
facet normal 1 0 0
outer loop
vertex 10 0 0
vertex 10 10 0
vertex 10 10 10
endloop
endfacet
facet normal 1 0 0
outer loop
vertex 10 0 0
vertex 10 10 10
vertex 10 0 10
endloop
endfacet
facet normal 0 -1 0
outer loop
vertex 0 0 0
vertex 10 0 0
vertex 10 0 10
endloop
endfacet
facet normal 0 -1 0
outer loop
vertex 0 0 0
vertex 10 0 10
vertex 0 0 10
endloop
endfacet
facet normal 0 1 0
outer loop
vertex 0 10 0
vertex 0 10 10
vertex 10 10 10
endloop
endfacet
facet normal 0 1 0
outer loop
vertex 0 10 0
vertex 10 10 10
vertex 10 10 0
endloop
endfacet
facet normal 0 0 -1
outer loop
vertex 0 0 0
vertex 0 10 0
vertex 10 10 0
endloop
endfacet
facet normal 0 0 -1
outer loop
vertex 0 0 0
vertex 10 10 0
vertex 10 0 0
endloop
endfacet
facet normal 0 0 1
outer loop
vertex 0 0 10
vertex 10 0 10
vertex 10 10 10
endloop
endfacet
facet normal 0 0 1
outer loop
vertex 0 0 10
vertex 10 10 10
vertex 0 10 10
endloop
endfacet
endsolid JSCAD
`
