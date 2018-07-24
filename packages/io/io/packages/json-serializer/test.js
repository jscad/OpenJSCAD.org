const test = require('ava')
const {CSG, CAG} = require('@jscad/csg')
const serializer = require('./index.js')

test('serialize csg to json', function (t) {
  const emptyShape = new CSG()
  const observed1 = serializer.serialize(emptyShape)

  t.deepEqual(observed1, expected1)

  const aCube = CSG.cube()
  const observed2 = serializer.serialize(aCube)

  t.deepEqual(observed2, expected2)

  const aRoundedCube = CSG.cube({radius: 5})
  const observed3 = serializer.serialize([aCube, aRoundedCube])

  t.deepEqual(observed3, expected3)
})

test('serialize cag to json', function (t) {
  const emptyShape = new CAG()
  const observed10 = serializer.serialize(emptyShape)

  t.deepEqual(observed10, expected10)

  const aRectangle = CAG.rectangle()
  const observed12 = serializer.serialize(aRectangle)

  t.deepEqual(observed12, expected12)

  const aRoundedRectangle = CAG.rectangle({radius: 5})
  const observed13 = serializer.serialize([aRectangle, aRoundedRectangle])

  t.deepEqual(observed13, expected13)
})

const expected1 = []

const expected2 = [ '{ "type": "csg","polygons": [{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":-1},"tag":9},{"pos":{"_x":-1,"_y":-1,"_z":1},"tag":10},{"pos":{"_x":-1,"_y":1,"_z":1},"tag":11},{"pos":{"_x":-1,"_y":1,"_z":-1},"tag":8}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":-1,"_y":0,"_z":0},"w":1,"tag":1}},{"vertices":[{"pos":{"_x":1,"_y":-1,"_z":-1},"tag":13},{"pos":{"_x":1,"_y":1,"_z":-1},"tag":14},{"pos":{"_x":1,"_y":1,"_z":1},"tag":15},{"pos":{"_x":1,"_y":-1,"_z":1},"tag":12}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":1,"_y":0,"_z":0},"w":1,"tag":3}},{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":-1},"tag":9},{"pos":{"_x":1,"_y":-1,"_z":-1},"tag":13},{"pos":{"_x":1,"_y":-1,"_z":1},"tag":12},{"pos":{"_x":-1,"_y":-1,"_z":1},"tag":10}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":-1,"_z":0},"w":1,"tag":4}},{"vertices":[{"pos":{"_x":-1,"_y":1,"_z":-1},"tag":8},{"pos":{"_x":-1,"_y":1,"_z":1},"tag":11},{"pos":{"_x":1,"_y":1,"_z":1},"tag":15},{"pos":{"_x":1,"_y":1,"_z":-1},"tag":14}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":1,"_z":0},"w":1,"tag":5}},{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":-1},"tag":9},{"pos":{"_x":-1,"_y":1,"_z":-1},"tag":8},{"pos":{"_x":1,"_y":1,"_z":-1},"tag":14},{"pos":{"_x":1,"_y":-1,"_z":-1},"tag":13}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":0,"_z":-1},"w":1,"tag":6}},{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":1},"tag":10},{"pos":{"_x":1,"_y":-1,"_z":1},"tag":12},{"pos":{"_x":1,"_y":1,"_z":1},"tag":15},{"pos":{"_x":-1,"_y":1,"_z":1},"tag":11}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":0,"_z":1},"w":1,"tag":7}}],"isCanonicalized": true,"isRetesselated": true}' ]

const expected3 = [ '{ "type": "csg","polygons": [{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":-1},"tag":9},{"pos":{"_x":-1,"_y":-1,"_z":1},"tag":10},{"pos":{"_x":-1,"_y":1,"_z":1},"tag":11},{"pos":{"_x":-1,"_y":1,"_z":-1},"tag":8}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":-1,"_y":0,"_z":0},"w":1,"tag":1}},{"vertices":[{"pos":{"_x":1,"_y":-1,"_z":-1},"tag":13},{"pos":{"_x":1,"_y":1,"_z":-1},"tag":14},{"pos":{"_x":1,"_y":1,"_z":1},"tag":15},{"pos":{"_x":1,"_y":-1,"_z":1},"tag":12}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":1,"_y":0,"_z":0},"w":1,"tag":3}},{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":-1},"tag":9},{"pos":{"_x":1,"_y":-1,"_z":-1},"tag":13},{"pos":{"_x":1,"_y":-1,"_z":1},"tag":12},{"pos":{"_x":-1,"_y":-1,"_z":1},"tag":10}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":-1,"_z":0},"w":1,"tag":4}},{"vertices":[{"pos":{"_x":-1,"_y":1,"_z":-1},"tag":8},{"pos":{"_x":-1,"_y":1,"_z":1},"tag":11},{"pos":{"_x":1,"_y":1,"_z":1},"tag":15},{"pos":{"_x":1,"_y":1,"_z":-1},"tag":14}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":1,"_z":0},"w":1,"tag":5}},{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":-1},"tag":9},{"pos":{"_x":-1,"_y":1,"_z":-1},"tag":8},{"pos":{"_x":1,"_y":1,"_z":-1},"tag":14},{"pos":{"_x":1,"_y":-1,"_z":-1},"tag":13}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":0,"_z":-1},"w":1,"tag":6}},{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":1},"tag":10},{"pos":{"_x":1,"_y":-1,"_z":1},"tag":12},{"pos":{"_x":1,"_y":1,"_z":1},"tag":15},{"pos":{"_x":-1,"_y":1,"_z":1},"tag":11}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":0,"_z":1},"w":1,"tag":7}}],"isCanonicalized": true,"isRetesselated": true}', '{ "type": "csg","polygons": [{"vertices":[{"pos":{"_x":-5,"_y":-5,"_z":-5},"tag":23},{"pos":{"_x":-5,"_y":-5,"_z":5},"tag":24},{"pos":{"_x":-5,"_y":5,"_z":5},"tag":25},{"pos":{"_x":-5,"_y":5,"_z":-5},"tag":22}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":-1,"_y":0,"_z":0},"w":5,"tag":16}},{"vertices":[{"pos":{"_x":5,"_y":-5,"_z":-5},"tag":27},{"pos":{"_x":5,"_y":5,"_z":-5},"tag":28},{"pos":{"_x":5,"_y":5,"_z":5},"tag":29},{"pos":{"_x":5,"_y":-5,"_z":5},"tag":26}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":1,"_y":0,"_z":0},"w":5,"tag":17}},{"vertices":[{"pos":{"_x":-5,"_y":-5,"_z":-5},"tag":23},{"pos":{"_x":5,"_y":-5,"_z":-5},"tag":27},{"pos":{"_x":5,"_y":-5,"_z":5},"tag":26},{"pos":{"_x":-5,"_y":-5,"_z":5},"tag":24}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":-1,"_z":0},"w":5,"tag":18}},{"vertices":[{"pos":{"_x":-5,"_y":5,"_z":-5},"tag":22},{"pos":{"_x":-5,"_y":5,"_z":5},"tag":25},{"pos":{"_x":5,"_y":5,"_z":5},"tag":29},{"pos":{"_x":5,"_y":5,"_z":-5},"tag":28}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":1,"_z":0},"w":5,"tag":19}},{"vertices":[{"pos":{"_x":-5,"_y":-5,"_z":-5},"tag":23},{"pos":{"_x":-5,"_y":5,"_z":-5},"tag":22},{"pos":{"_x":5,"_y":5,"_z":-5},"tag":28},{"pos":{"_x":5,"_y":-5,"_z":-5},"tag":27}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":0,"_z":-1},"w":5,"tag":20}},{"vertices":[{"pos":{"_x":-5,"_y":-5,"_z":5},"tag":24},{"pos":{"_x":5,"_y":-5,"_z":5},"tag":26},{"pos":{"_x":5,"_y":5,"_z":5},"tag":29},{"pos":{"_x":-5,"_y":5,"_z":5},"tag":25}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":0,"_z":1},"w":5,"tag":21}}],"isCanonicalized": true,"isRetesselated": true}' ]

const expected10 = []

const expected12 = ['{ "type": "cag","sides": [{"vertex0":{"pos":{"_x":-1,"_y":1}},"vertex1":{"pos":{"_x":-1,"_y":-1}}},{"vertex0":{"pos":{"_x":-1,"_y":-1}},"vertex1":{"pos":{"_x":1,"_y":-1}}},{"vertex0":{"pos":{"_x":1,"_y":-1}},"vertex1":{"pos":{"_x":1,"_y":1}}},{"vertex0":{"pos":{"_x":1,"_y":1}},"vertex1":{"pos":{"_x":-1,"_y":1}}}] }']

const expected13 = ['{ "type": "cag","sides": [{"vertex0":{"pos":{"_x":-1,"_y":1}},"vertex1":{"pos":{"_x":-1,"_y":-1}}},{"vertex0":{"pos":{"_x":-1,"_y":-1}},"vertex1":{"pos":{"_x":1,"_y":-1}}},{"vertex0":{"pos":{"_x":1,"_y":-1}},"vertex1":{"pos":{"_x":1,"_y":1}}},{"vertex0":{"pos":{"_x":1,"_y":1}},"vertex1":{"pos":{"_x":-1,"_y":1}}}] }', '{ "type": "cag","sides": [{"vertex0":{"pos":{"_x":-5,"_y":5}},"vertex1":{"pos":{"_x":-5,"_y":-5}}},{"vertex0":{"pos":{"_x":-5,"_y":-5}},"vertex1":{"pos":{"_x":5,"_y":-5}}},{"vertex0":{"pos":{"_x":5,"_y":-5}},"vertex1":{"pos":{"_x":5,"_y":5}}},{"vertex0":{"pos":{"_x":5,"_y":5}},"vertex1":{"pos":{"_x":-5,"_y":5}}}] }']
