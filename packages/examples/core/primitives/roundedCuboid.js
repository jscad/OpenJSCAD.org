/*
// title       : Rounded Cube
// author      : Rene K. Mueller
// license     : MIT License
// description : testing roundedCuboid() function
// file        : roundedCuboid.js
// tags        : cube, cuboid, shape, 3d
*/

const { cuboid, roundedCuboid } = require('@jscad/modeling').primitives

const getParameterDefinitions = () => {
  return [
    { name: 'width', type: 'float', default: 10, caption: 'Width:' },
    { name: 'height', type: 'float', default: 14, caption: 'Height:' },
    { name: 'depth', type: 'float', default: 7, caption: 'Depth:' },
    { name: 'rounded', type: 'choice', caption: 'Round the corners', values: [0, 1], captions: ['No', 'Yes'], default: 1 },
    { name: 'radius', type: 'float', default: 2, caption: 'Corner Radius:' }
  ]
}

/**
 * Create a rounded cuboid with the supplied parameters
 * @param {Number} params.width - The cuboid's width.
 * @param {Number} params.depth - The cuboid's depth.
 * @param {Number} params.height - The cuboid's height.
 * @param {Number} params.rounded - 1 if the cuboid should be rounded, 0 otherwise.
 * @param {Number} params.radius - The cuboid's corner radius.
 * @returns {geometry}
 */
const main = (params) => {
  if (params.rounded === 1) {
    return roundedCuboid({ size: [params.width, params.height, params.depth], roundRadius: params.radius, segments: 32 })
  } else {
    return cuboid({ size: [params.width, params.height, params.depth] })
  }
}

module.exports = { main, getParameterDefinitions }
