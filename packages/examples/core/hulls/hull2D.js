/*
// title       : Hull & HullChain 2D example
// author      : Simon Clark
// license     : MIT License
// description : Demonstrating the basics of Hulls in two dimensions
// file        : hull.js
// tags        : hull, hullchain
*/

const jscad = require('@jscad/modeling')
const { circle, rectangle } = jscad.primitives
const { translate } = jscad.transforms
const { hull, hullChain } = jscad.hulls

const getParameterDefinitions = () => {
  return [
    { name: 'doHull', type: 'radio', caption: 'Show:', values: ['shapes', 'hull', 'chain'], captions: ['Original Shapes', 'Hull', 'Hull Chain'], initial: 'shapes' }
  ]
}

const main = (params) => {
  const shapes = [
    translate([15, 0, 0], circle({ radius: 2, segments: 16 })),
    translate([8, 6, 0], circle({ radius: 3.5, segments: 16 })),
    translate([0, -4, 0], circle({ radius: 5, segments: 16 })),
    translate([-15, 5, 0], rectangle({ size: [5, 17] }))
  ]
  if (params.doHull === 'hull') {
    return hull(shapes)
  } else if (params.doHull === 'chain') {
    return hullChain(shapes)
  } else {
    return shapes
  }
}

module.exports = { main, getParameterDefinitions }
