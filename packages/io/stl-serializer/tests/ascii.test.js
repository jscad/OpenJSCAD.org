const test = require('ava')

const { primitives, transforms } = require('@jscad/modeling')

const serializer = require('../index.js')

test('serialize objects to stl (ascii)', (t) => {
  const object1 = primitives.cube({ size: 10 }) // .setColor([0, 0, 1, 1])
  const observed1 = serializer.serialize({ binary: false }, object1)
  t.deepEqual(observed1, [expected1])

  const object2 = transforms.translate([5, 5, 5], object1) // .setColor([1, 0, 0, 1])
  const observed2 = serializer.serialize({ binary: false }, object1, object2)
  t.deepEqual(observed2, [expected2])
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
