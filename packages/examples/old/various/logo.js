// title      : OpenJSCAD.org Logo BIG
// author     : Jeff Gay
// license    : MIT License
// revision   : 0.001
// tags       : Logo,Intersection,Sphere,Cube,Big
// file       : logo_big.jscad

const { cube, sphere } = require('@jscad/modeling').primitives
const { union, subtract, intersect } = require('@jscad/modeling').booleans
const { rotate, translate } = require('@jscad/modeling').transforms
const { colorize } = require('@jscad/modeling').colors


function main () {
  var small = [
    colorize([1,.6,0.6], translate([0,0,3],rotate([0.3,0.8,0],subtract(
      cube({size: 3}),
      sphere({radius: 2})
    )))),
    colorize([1,1,0], translate([0,0,3],rotate([0.3,0.8,0],intersect(
      sphere({radius: 1.3}),
      cube({size: 2.1})
    ))))
  ]
  return small

  var large = union(
    subtract(
      cube({size: 300, center: true}),
      sphere({r: 200, center: true})
    ),
    intersection(
      sphere({r: 130, center: true}),
      cube({size: 210, center: true})
    )
  ).translate([0, 0, 150]);

  return small.union(large);
}

module.exports = {main}