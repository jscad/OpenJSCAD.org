const mat4 = require('gl-mat4')

/*
 * Convert the given solid into one or more geometries for rendering.
 * @param {Object} options - options for conversion
 * @param {Array} options.color - RGBA of solid
 * @param {path2} solid - the solid to convert
 * @return {Array} list of new geometries
 */
const path2ToGeometries = (options, solid) => {
  let { color } = options

  if ('color' in solid) color = solid.color

  const points = solid.points

  const positions = []
  let prevpoint
  points.forEach((point) => {
    if (prevpoint) {
      positions.push([prevpoint[0], prevpoint[1], 0])
      positions.push([point[0], point[1], 0])
    }
    prevpoint = point
  })
  // add the last segment if necessary
  if (solid.isClosed && prevpoint) {
    const point = points[0]
    positions.push([prevpoint[0], prevpoint[1], 0])
    positions.push([point[0], point[1], 0])
  }

  const normals = positions.map((x) => [0, 0, -1])
  const indices = positions.map((x, i) => i) // FIXME: temporary, not really needed, need to change drawMesh
  const transforms = solid.transforms ? solid.transforms : mat4.create()

  return [{ positions, normals, transforms, color, indices }]
}

module.exports = path2ToGeometries
