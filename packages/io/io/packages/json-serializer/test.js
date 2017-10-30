const test = require('ava')
const {CSG} = require('@jscad/csg')
const serializer = require('./index.js')

test('serialize csg to stl', function (t) {
  const input = new CSG.cube()
  const expected = [ '{ "type": "csg","polygons": [{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":-1},"tag":9},{"pos":{"_x":-1,"_y":-1,"_z":1},"tag":10},{"pos":{"_x":-1,"_y":1,"_z":1},"tag":11},{"pos":{"_x":-1,"_y":1,"_z":-1},"tag":8}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":-1,"_y":0,"_z":0},"w":1,"tag":1}},{"vertices":[{"pos":{"_x":1,"_y":-1,"_z":-1},"tag":13},{"pos":{"_x":1,"_y":1,"_z":-1},"tag":14},{"pos":{"_x":1,"_y":1,"_z":1},"tag":15},{"pos":{"_x":1,"_y":-1,"_z":1},"tag":12}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":1,"_y":0,"_z":0},"w":1,"tag":3}},{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":-1},"tag":9},{"pos":{"_x":1,"_y":-1,"_z":-1},"tag":13},{"pos":{"_x":1,"_y":-1,"_z":1},"tag":12},{"pos":{"_x":-1,"_y":-1,"_z":1},"tag":10}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":-1,"_z":0},"w":1,"tag":4}},{"vertices":[{"pos":{"_x":-1,"_y":1,"_z":-1},"tag":8},{"pos":{"_x":-1,"_y":1,"_z":1},"tag":11},{"pos":{"_x":1,"_y":1,"_z":1},"tag":15},{"pos":{"_x":1,"_y":1,"_z":-1},"tag":14}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":1,"_z":0},"w":1,"tag":5}},{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":-1},"tag":9},{"pos":{"_x":-1,"_y":1,"_z":-1},"tag":8},{"pos":{"_x":1,"_y":1,"_z":-1},"tag":14},{"pos":{"_x":1,"_y":-1,"_z":-1},"tag":13}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":0,"_z":-1},"w":1,"tag":6}},{"vertices":[{"pos":{"_x":-1,"_y":-1,"_z":1},"tag":10},{"pos":{"_x":1,"_y":-1,"_z":1},"tag":12},{"pos":{"_x":1,"_y":1,"_z":1},"tag":15},{"pos":{"_x":-1,"_y":1,"_z":1},"tag":11}],"shared":{"color":null,"tag":2},"plane":{"normal":{"_x":0,"_y":0,"_z":1},"w":1,"tag":7}}],"isCanonicalized": true,"isRetesselated": true}' ]
  const observed = serializer.serialize(input, {binary: true})

  t.deepEqual(observed, expected)
})
