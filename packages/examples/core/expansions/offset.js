/* title      : Offset
// author     : Moissette Mark
// license    : MIT License
// description: offset() function
*/

const { cube, cylinder } = require('@jscad/modeling').primitives
const { translate, scale } = require('@jscad/modeling').transforms
const { union, difference } = require('@jscad/modeling').booleans
const { expand } = require('@jscad/modeling').expansions

const main = () => {
  return expand({ delta: 0.2, corners: 'round', segments: 8 }, difference(cube(2), translate([0.3, -0.3, 0.3], cube(2)))), 
}

module.exports = { main }
