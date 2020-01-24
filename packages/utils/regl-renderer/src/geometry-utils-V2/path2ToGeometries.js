const path2ToGeometries = (solid, options) => {
  const defaults = {
    color: [1, 0.4, 0, 1] // default color
  }
  let {color} = Object.assign({}, defaults, options)

  if ('color' in solid) color = solid.color

  let points = solid.points

  let positions = []
  let prevpoint = undefined
  points.forEach((point) => {
    if (prevpoint) {
      positions.push([prevpoint[0], prevpoint[1], 0])
      positions.push([point[0], point[1], 0])
    }
    prevpoint = point
  })
  // add the last segment if necessary
  if (solid.isClosed && prevpoint) {
    let point = points[0]
    positions.push([prevpoint[0], prevpoint[1], 0])
    positions.push([point[0], point[1], 0])
  }

  let normals = positions.map(x => [0, 0, -1])
  let colors = positions.map(x => color)
  let indices = positions.map((x, i) => i) // FIXME: temporary, not really needed, need to change drawMesh

  return [
    {
      positions: positions,
      normals: normals,
      color,
      colors: colors,
      indices: indices
    }
  ]
}

module.exports = path2ToGeometries
