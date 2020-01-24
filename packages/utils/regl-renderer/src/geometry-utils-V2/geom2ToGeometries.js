const geom2ToGeometries = (solid, options) => {
  const defaults = {
    color: [1, 0.4, 0, 1] // default color
  }
  let {color} = Object.assign({}, defaults, options)

  if ('color' in solid) color = solid.color

  let points = []
  solid.sides.forEach((side) => {
    points.push([side[0][0], side[0][1], 0])
    points.push([side[1][0], side[1][1], 0])
  })
  let normals = points.map(x => [0, 0, -1])
  let colors = points.map(x => color)
  let indices = points.map((x, i) => i) // FIXME: temporary, not really needed, need to change drawMesh

  return [
    {
      positions: points,
      normals: normals,
      color,
      colors: colors,
      indices
    }
  ]
}

module.exports = geom2ToGeometries
