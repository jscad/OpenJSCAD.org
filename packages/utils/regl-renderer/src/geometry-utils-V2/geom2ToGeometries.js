const mat4 = require('gl-mat4')

const maxIndex = Math.floor(65535 / 2) // two vertices per segment

/*
 * Convert the given solid into one or more geometries for rendering.
 * @param {Object} options - options for conversion
 * @param {Array} options.color - RGBA of solid
 * @param {geom2} solid - the solid to convert
 * @return {Array} list of new geometries
 */
const geom2ToGeometries = (options, solid) => {
  let { color } = options

  const sides = solid.sides
  if (sides.length === 0) return []

  if ('color' in solid) color = solid.color
  const isTransparent = (color[3] < 1.0)

  const numgeometries = Math.floor(sides.length / (maxIndex)) + 1

  const geometries = []
  for (let g = 0; g < numgeometries; g++) {
    const offset = g * maxIndex
    const endset = Math.min(offset + maxIndex, sides.length)
    const positions = []
    for (let i = offset; i < endset; i++) {
      const side = sides[i]
      positions.push([side[0][0], side[0][1], 0])
      positions.push([side[1][0], side[1][1], 0])
    }
    // assemble the geometry
    const normals = positions.map((x) => [0, 0, -1])
    const indices = positions.map((x, i) => i)
    const transforms = solid.transforms ? mat4.clone(solid.transforms) : mat4.create()

    // FIXME positions should be Float32Array buffers to eliminate another conversion
    // FIXME normals should be Float32Array buffers to eliminate another conversion
    // FIXME indices should be Uint16Array buffers to eliminate another conversion
    geometries.push({ type: '2d', positions, normals, indices, transforms, color, isTransparent })
  }
  return geometries
}

module.exports = geom2ToGeometries
