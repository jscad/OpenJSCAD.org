/*
// title       : Basic Booleans Demonstration
// author      : Simon Clark
// license     : MIT License
// description : Demonstrating the basics of boolean shape combinations
// file        : basicBooleans.js
// tags        : cube, sphere, union, subtract, difference, subtraction, intersect, intersection
*/

const jscad = require('@jscad/modeling')
const { cube, sphere } = jscad.primitives
const { translate } = jscad.transforms
const { colorize } = jscad.colors
const { union, subtract, intersect } = jscad.booleans

const main = () => {
  const aCube = colorize([1, 0, 0], translate([-4.5, 0, 0], cube()))
  const aSphere = colorize([0, 1, 0], translate([-5.2, -0.8, 0.8], sphere({ segments: 32 })))

  const aUnion = union(aCube, aSphere)
  const aSubtract = subtract(aCube, aSphere)
  const aIntersection = intersect(aCube, aSphere)
  return [
    aCube,
    aSphere,
    translate([3, 0, 0], aUnion),
    translate([6, 0, 0], aSubtract),
    translate([9, 0, 0], aIntersection)
  ]
}

module.exports = { main }
