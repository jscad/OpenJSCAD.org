const mat4 = require('gl-mat4')

// The only data types accepted by WebGL (and OpenGL ES 2.0) for indices are unsigned bytes and unsigned shorts.
// Since an unsigned short has a range of 0-65535, this means that gl.DrawElements can only reference 65k vertices per draw call.
const maxIndex = Math.floor(65535 / 2) - 2 // two vertices per segment, less closing segment

/*
 * Convert the given solid into one or more geometries for rendering.
 * @param {Object} options - options for conversion
 * @param {Array} options.color - RGBA of solid
 * @param {path2} solid - the solid to convert
 * @return {Array} list of new geometries
 */
const path2ToGeometries = (options, solid) => {
  let { color } = options

  const points = solid.points
  if (points.length === 0) return []

  if ('color' in solid) color = solid.color
  const isTransparent = (color[3] < 1.0)

  const numgeometries = Math.floor(points.length / (maxIndex)) + 1

  const geometries = []
  for (let g = 0; g < numgeometries; g++) {
    const offset = g * maxIndex
    const endset = Math.min(offset + maxIndex, points.length)
    const positions = []
    let prevvertice
    for (let i = offset; i < endset; i++) {
      const point = points[i]
      if (prevvertice) {
        positions.push([prevvertice[0], prevvertice[1], 0])
        positions.push([point[0], point[1], 0])
      }
      prevvertice = point
    }
    // add the last segment if necessary
    if ((g + 1) === numgeometries && solid.isClosed && prevvertice) {
      const point = points[0]
      positions.push([prevvertice[0], prevvertice[1], 0])
      positions.push([point[0], point[1], 0])
    }
    // assemble the geometry
    const normals = positions.map((x) => [0, 0, -1])
    const indices = positions.map((x, i) => i) // FIXME: temporary, not really needed, need to change drawLines
    const transforms = solid.transforms ? mat4.clone(solid.transforms) : mat4.create()

    // FIXME positions should be Float32Array buffers to eliminate another conversion
    // FIXME normals should be Float32Array buffers to eliminate another conversion
    // FIXME indices should be Uint16Array buffers to eliminate another conversion
    geometries.push({ type: '2d', positions, normals, indices, transforms, color, isTransparent })
  }
  return geometries
}

module.exports = path2ToGeometries
