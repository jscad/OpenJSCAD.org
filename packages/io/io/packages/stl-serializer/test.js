const test = require('ava')
const {CSG} = require('@jscad/csg')
const serializer = require('./index.js')

test('serialize csg to stl (binary)', function (t) {
  const input = new CSG.cube()
  const expected = []
  const observed = serializer.serialize(input, {binary: true})

  // TODO: VERY shallow testing ... improve
  t.deepEqual(observed[0].byteLength, 80)
  t.deepEqual(observed[1].byteLength, 4)
  t.deepEqual(observed[2].byteLength, 600)
})

test('serialize csg to stl (ascii)', function (t) {
  const input = new CSG.cube()
  const expected = [ 'solid csg.js\nfacet normal -1 0 0\nouter loop\nvertex -1 -1 -1\nvertex -1 -1 1\nvertex -1 1 1\nendloop\nendfacet\nfacet normal -1 0 0\nouter loop\nvertex -1 -1 -1\nvertex -1 1 1\nvertex -1 1 -1\nendloop\nendfacet\nfacet normal 1 0 0\nouter loop\nvertex 1 -1 -1\nvertex 1 1 -1\nvertex 1 1 1\nendloop\nendfacet\nfacet normal 1 0 0\nouter loop\nvertex 1 -1 -1\nvertex 1 1 1\nvertex 1 -1 1\nendloop\nendfacet\nfacet normal 0 -1 0\nouter loop\nvertex -1 -1 -1\nvertex 1 -1 -1\nvertex 1 -1 1\nendloop\nendfacet\nfacet normal 0 -1 0\nouter loop\nvertex -1 -1 -1\nvertex 1 -1 1\nvertex -1 -1 1\nendloop\nendfacet\nfacet normal 0 1 0\nouter loop\nvertex -1 1 -1\nvertex -1 1 1\nvertex 1 1 1\nendloop\nendfacet\nfacet normal 0 1 0\nouter loop\nvertex -1 1 -1\nvertex 1 1 1\nvertex 1 1 -1\nendloop\nendfacet\nfacet normal 0 0 -1\nouter loop\nvertex -1 -1 -1\nvertex -1 1 -1\nvertex 1 1 -1\nendloop\nendfacet\nfacet normal 0 0 -1\nouter loop\nvertex -1 -1 -1\nvertex 1 1 -1\nvertex 1 -1 -1\nendloop\nendfacet\nfacet normal 0 0 1\nouter loop\nvertex -1 -1 1\nvertex 1 -1 1\nvertex 1 1 1\nendloop\nendfacet\nfacet normal 0 0 1\nouter loop\nvertex -1 -1 1\nvertex 1 1 1\nvertex -1 1 1\nendloop\nendfacet\nendsolid csg.js\n' ]
  const observed = serializer.serialize(input, {binary: false})
  t.deepEqual(observed, expected)
})
