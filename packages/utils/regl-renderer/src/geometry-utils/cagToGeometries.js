const cagToGeometries = (cags, options) => {
  const defaults = {
    color: [1, 0.4, 0, 1]// default color
  }
  const { color } = Object.assign({}, defaults, options)
  // flag for transparency
  let isTransparent = false

  const points = cagToPointsArray(cags).map((x) => [x[0], x[1], 0])
  const normals = points.map((x) => [0, 0, -1])
  const colors = points.map((x) => color)
  const indices = points.map((x, i) => i) // FIXME: temporary, not really needed, need to change drawMesh

  if (color[3] !== 1) {
    isTransparent = true // FIXME should be analyzed for each vertex
  }

  return [
    {
    // indices,
      positions: points,
      normals: normals,
      colors: colors,
      indices,
      isTransparent
    }]
}

// FIXME same as in scad-api helpers...
const cagToPointsArray = (input) => {
  let points
  if ('sides' in input) { // this is a cag
    points = []
    input.sides.forEach((side) => {
      points.push([side.vertex0.pos.x, side.vertex0.pos.y])
      points.push([side.vertex1.pos.x, side.vertex1.pos.y])
    })
    // cag.sides.map(side => [side.vertex0.pos.x, side.vertex0.pos.y])
    //, side.vertex1.pos.x, side.vertex1.pos.y])
    // due to the logic of CAG.fromPoints()
    // move the first point to the last
    /* if (points.length > 0) {
      points.push(points.shift())
    } */
  } else if ('points' in input) {
    points = input.points.map((p) => ([p.x, p.y]))
  }

  return points
}

module.exports = cagToGeometries
