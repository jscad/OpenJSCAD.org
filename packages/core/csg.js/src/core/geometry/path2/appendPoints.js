
  /**
   * Append an point to the end of the path.
   * @param {Vector2D} point - point to append
   * @returns {Path2D} new Path2D object (not closed)
   */
  appendPoint: function (point) {
    if (this.closed) {
      throw new Error('Path must not be closed')
    }
    point = new Vector2D(point) // cast to Vector2D
    let newpoints = this.points.concat([point])
    return new Path2D(newpoints)
  },

  /**
   * Append a list of points to the end of the path.
   * @param {Vector2D[]} points - points to append
   * @returns {Path2D} new Path2D object (not closed)
   */
  appendPoints: function (points) {
    if (this.closed) {
      throw new Error('Path must not be closed')
    }
    let newpoints = this.points
    points.forEach(function (point) {
      newpoints.push(new Vector2D(point)) // cast to Vector2D
    })
    return new Path2D(newpoints)
  },

  close: function () {
    return new Path2D(this.points, true)
  }