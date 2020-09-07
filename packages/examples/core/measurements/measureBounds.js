/*
// title       : Measure Bounding Box
// authors     : Simon Clark
// license     : MIT License
// description : Examples of measureBoundingBox function
// file        : measureBounds.js
// tags        : measurements, bounds, boundingbox
*/

const { cuboid } = require('@jscad/modeling').primitives
const { translate, rotate } = require('@jscad/modeling').transforms
const { measureBoundingBox } = require('@jscad/modeling').measurements
const { colorize } = require('@jscad/modeling').colors
const { subtract } = require('@jscad/modeling').booleans

const getParameterDefinitions = () => {
  return [
    { name: 'rotatex', type: 'slider', initial: 0, min: -3.14, max: 3.14, step: 0.01, caption: 'X Rotation:' },
    { name: 'rotatey', type: 'slider', initial: 0, min: -3.14, max: 3.14, step: 0.01, caption: 'Y Rotation:' },
    { name: 'rotatez', type: 'slider', initial: 0, min: -3.14, max: 3.14, step: 0.01, caption: 'Z Rotation:' }
  ]
}

const buildBoundingBox = (bounds) => {
  // Bounding box format is an array of arrays of values, eg:
  //     [LowerBoundsValues, UpperBoundsValues]
  //     [[left, front, bottom], [right, back, top]]
  //     [[-3, 2, 0], [3, 6, 10]]

  const top = bounds[1][2]
  const bottom = bounds[0][2]
  const left = bounds[0][0]
  const right = bounds[1][0]
  const front = bounds[0][1]
  const back = bounds[1][1]

  const width = right - left
  const height = top - bottom
  const depth = back - front

  let boundingBox = subtract(
    cuboid({ size: [width + 1, depth + 1, height + 1] }),
    cuboid({ size: [width + 1, depth, height] }),
    cuboid({ size: [width, depth + 1, height] }),
    cuboid({ size: [width, depth, height + 1] })
  )

  boundingBox = translate([(left + right) / 2, (front + back) / 2, (top + bottom) / 2], boundingBox)
  boundingBox = colorize([0.5, 0, 0], boundingBox)
  return boundingBox
}

const main = (params) => {
  let shape = cuboid({ size: [8, 45, 4] })
  shape = rotate([params.rotatex, params.rotatey, params.rotatez], shape)
  const boundingBox = buildBoundingBox(measureBoundingBox(shape))
  return [shape, boundingBox]
}

module.exports = { main, getParameterDefinitions }
