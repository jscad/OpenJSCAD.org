const mat4 = require('gl-mat4')

const geom2ToGeometries = (options, solid) => {
  let { color } = options

  if ('color' in solid) color = solid.color

  const positions = []
  solid.sides.forEach((side) => {
    positions.push([side[0][0], side[0][1], 0])
    positions.push([side[1][0], side[1][1], 0])
  })
  const normals = positions.map((x) => [0, 0, -1])
  const indices = positions.map((x, i) => i) // FIXME: temporary, not really needed, need to change drawMesh
  const transforms = solid.transforms ? solid.transforms : mat4.create()

  return [{ positions, normals, transforms, color, indices }]
}

module.exports = geom2ToGeometries
