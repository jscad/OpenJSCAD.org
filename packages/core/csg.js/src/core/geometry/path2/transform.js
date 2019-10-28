const transform = (matrix, path) => {
  let newpoints = path.points.map(function (point) {
    return point.multiply4x4(matrix4x4)
  })
  return new Path2D(newpoints, this.closed)
}

module.exports = transform
