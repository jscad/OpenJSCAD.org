/**
 * Coordinate system and Rotation demonstration
 * @category Other
 * @skillLevel 1
 * @description Demonstrating rotation about the three axes.
 * @tags rotate
 * @authors Jeff Gay
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')

const { cuboid } = jscad.primitives
const { subtract } = jscad.booleans
const { colorize } = jscad.colors
const { translate, rotate } = jscad.transforms
const { degToRad } = jscad.utils

const getParameterDefinitions = () => {
  // UG... only integer steps can be performed reliably
  const max = 360
  const min = -max
  return [
    { name: 'rotations', type: 'group', caption: 'Rotations (Degrees)' },
    { name: 'rotateX', type: 'float', caption: 'About X axis', title: 'Rotation from Y to Z', initial: 0, min, max },
    { name: 'rotateY', type: 'float', caption: 'About Y axis', title: 'Rotation from Z to X', initial: 0, min, max },
    { name: 'rotateZ', type: 'float', caption: 'About Z axis', title: 'Rotation from X to Y', initial: 0, min, max }
  ]
}

/**
 * Demonstration of three-dimensional coordinate system, and rotations about X, Y and Z axis.
 * @param {Number} params.rotateX - Rotation (degrees) about the X axis
 * @param {Number} params.rotateY - Rotation (degrees) about the Y axis
 * @param {Number} params.rotateZ - Rotation (degrees) about the Z axis
 * @returns {geometries}
 */
const main = (params) => {
  const dimension = 20
  const coordinateSystem = colorize([0, 0, 0, 0.5], cuboidFrame({ size: [20, 20, 20] }))

  const axisX = colorize([1, 0, 0], axisDirection(dimension, 'X'))
  const axisY = colorize([0, 1, 0], axisDirection(dimension, 'Y'))
  const axisZ = colorize([0, 0, 1], axisDirection(dimension, 'Z'))

  // apply the rotations
  const rotations = [degToRad(params.rotateX), degToRad(params.rotateY), degToRad(params.rotateZ)]
  const rotated = rotate(rotations, coordinateSystem)

  return [coordinateSystem, rotated, axisX, axisY, axisZ]
}

// create a series of shapes, increasing in size
const axisDirection = (size, axis) => {
  const lengths = []
  for (let length = size / 2; length > 1; length = length / 1.5) {
    lengths.push(length)
  }
  lengths.reverse()

  let offset = 0
  let width = 1
  let pieces = lengths.map((l) => {
    const size = [l, width, 0.1]
    const center = [offset + l / 2, 0, 0]

    offset = offset + l + 1
    width = width * 1.25

    return cuboid({ size, center })
  })

  // orientate the shapes to the desired axis
  if (axis === 'X') {
    pieces = translate([0, 0, -1], pieces)
  }
  if (axis === 'Y') {
    pieces = rotate([Math.PI / 2, 0, 0], pieces)
    pieces = rotate([0, 0, Math.PI / 2], pieces)
    pieces = translate([-1, 0, 0], pieces)
  }
  if (axis === 'Z') {
    pieces = rotate([Math.PI / 2, 0, 0], pieces)
    pieces = rotate([0, -Math.PI / 2, 0], pieces)
    pieces = translate([0, -1, 0], pieces)
  }
  return pieces
}

const cuboidFrame = (options) => {
  const size = options.size
  const d = 0.5
  const center = [size[0] / 2, size[1] / 2, size[2] / 2]
  return subtract(
    cuboid({ size, center }),
    cuboid({ size: [size[0], size[1] - d, size[2] - d], center }),
    cuboid({ size: [size[0] - d, size[1], size[2] - d], center }),
    cuboid({ size: [size[0] - d, size[1] - d, size[2]], center })
  )
}

module.exports = { main, getParameterDefinitions }
