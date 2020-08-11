/*
// title       : Rounded Cube
// author      : Rene K. Mueller
// license     : MIT License
// description : testing roundedCuboid() function
// file        : roundedCuboid.js
// tags        : cube, cuboid, shape, 3d
*/

const { cuboid, roundedCuboid } = require('@jscad/modeling').primitives

function getParameterDefinitions () {
  return [
    { name: 'width', type: 'float', default: 10, caption: 'Width:' },
    { name: 'height', type: 'float', default: 14, caption: 'Height:' },
    { name: 'depth', type: 'float', default: 7, caption: 'Depth:' },
    { name: 'rounded', type: 'choice', caption: 'Round the corners', values: [0, 1], captions: ['No', 'Yes'], default: 1 }
  ]
}

function main (params) {
  if (params.rounded === 1) {
    return roundedCuboid({ size: [params.width, params.height, params.depth], roundRadius: 2, segments: 32 })
  } else {
    return cuboid({ size: [params.width, params.height, params.depth] })
  }
}

module.exports = { main, getParameterDefinitions }
